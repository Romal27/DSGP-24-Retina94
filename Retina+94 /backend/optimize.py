from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import math
import requests


from werkzeug.security import generate_password_hash


import re

from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    host="localhost",
    database="DSGP_Retina",  
    user="postgres",
    password="dsgpdb"
)

GOOGLE_API_KEY = "AIzaSyA7lfK7JapLewpBD7q9aOhypalhy7YL2xk"

def haversine(lat1, lon1, lat2, lon2):
    R = 6371  
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = math.sin(dLat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def get_geolocation():
    try:
        url = f"https://www.googleapis.com/geolocation/v1/geolocate?key={GOOGLE_API_KEY}"
        response = requests.post(url, json={})
        location = response.json().get("location", {})
        return location.get("lat"), location.get("lng")
    except Exception as e:
        print("Geolocation error:", e)
        return None, None

@app.route("/nearest-hospitals", methods=["GET"])
def get_nearest_hospitals():
    user_lat, user_lon = get_geolocation()

    if not user_lat or not user_lon:
        return jsonify({"error": "Unable to fetch user location"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT hospital_id, hospital_name, latitude, longitude FROM Hospitals")
            hospitals = cur.fetchall()

        scored = []
        for h in hospitals:
            dist = haversine(user_lat, user_lon, float(h[2]), float(h[3]))
            scored.append({
                "hospital_id": h[0],
                "name": h[1],
                "latitude": float(h[2]),
                "longitude": float(h[3]),
                "distance_km": round(dist, 2)
            })

        nearest = sorted(scored, key=lambda x: x["distance_km"])[:3]
        return jsonify({"nearest_hospitals": nearest})
    except Exception as e:
        print("Error fetching hospitals:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/hospital-doctors/<hospital_id>", methods=["GET"])
def get_hospital_doctors(hospital_id):
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT doctor_name, specialization FROM Doctors WHERE hospital_id = %s", (hospital_id,))
            doctors = cur.fetchall()

        result = [{"name": doc[0], "specialization": doc[1]} for doc in doctors]
        return jsonify({"doctors": result})
    except Exception as e:
        print("Error fetching doctors:", e)
        return jsonify({"error": str(e)}), 500


@app.route("/api/users/register", methods=["POST"])
def register_user():
    data = request.get_json()
    username = data.get("userName")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({"message": "Missing required fields"}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"message": "Invalid email format"}), 400

    password_hash = generate_password_hash(password)

    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO Users (username, email, password_hash, agreed_terms)
                VALUES (%s, %s, %s, %s)
            """, (username, email, password_hash, True))
            conn.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except psycopg2.IntegrityError:
        conn.rollback()
        return jsonify({"message": "Username or email already exists"}), 409
    except Exception as e:
        conn.rollback()
        return jsonify({"message": str(e)}), 500


@app.route("/api/users/login", methods=["POST"])
def login_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing credentials"}), 400

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT password_hash FROM Users WHERE username = %s", (username,))
            user = cur.fetchone()
            if not user or not check_password_hash(user[0], password):
                return jsonify({"message": "Invalid username or password"}), 401

        return jsonify({"message": "Login successful"}), 200
    except Exception as e:
        print("Login error:", e)
        return jsonify({"message": "Internal server error"}), 500
@app.route("/api/users/profile/<username>", methods=["GET"])
def get_user_profile(username):
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT username, email
                FROM Users
                WHERE username = %s
            """, (username,))
            user = cur.fetchone()

        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify({
            "username": user[0],
            "email": user[1]
        }), 200
    except Exception as e:
        conn.rollback()
        print("Error fetching user profile:", e)
        return jsonify({"message": "Internal server error"}), 500


@app.route("/api/users/profile/<username>", methods=["PUT"])
def update_user_profile(username):
    data = request.get_json()
    new_username = data.get("username")

    if not new_username:
        return jsonify({"message": "Username cannot be empty"}), 400

    try:
        with conn.cursor() as cur:
            cur.execute("""
                UPDATE Users 
                SET username = %s
                WHERE username = %s
            """, (new_username, username))
            conn.commit()
        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        print("Profile update error:", e)
        conn.rollback()
        return jsonify({"message": "Update failed"}), 500


if __name__ == "__main__":
   app.run(debug=True, port=5001)

