from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import math
import requests

app = Flask(__name__)
CORS(app)

conn = psycopg2.connect(
    host="localhost",
    database="DSGP",  
    user="postgres",
    password="Thiviru8713"
)


# Google Geolocation API Key
GOOGLE_API_KEY = "AIzaSyA7lfK7JapLewpBD7q9aOhypalhy7YL2xk"

# Haversine formula to calculate distance
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in kilometers
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = math.sin(dLat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dLon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# Get user location from Google Geolocation API
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

if __name__ == "__main__":
    app.run(debug=True)
