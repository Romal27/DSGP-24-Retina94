from flask import Flask, request, jsonify
from flask_cors import CORS
from a_star import a_star
import json

app = Flask(__name__)
CORS(app)

# Load hospital data
with open('hospitals.json', 'r') as file:
    hospitals = json.load(file)

@app.route("/find-hospital", methods=["POST"])
def find_hospital():
    data = request.json
    user_lat = data.get("lat")
    user_lon = data.get("lon")

    if user_lat is None or user_lon is None:
        return jsonify({"error": "Missing location data"}), 400

    user_location = (user_lat, user_lon)
    nearest_hospital = a_star(user_location, hospitals)

    return jsonify(nearest_hospital)

if __name__ == "__main__":
    app.run(debug=True)
