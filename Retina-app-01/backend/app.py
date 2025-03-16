from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "D:\final_fundus_model.h5"
model = load_model(MODEL_PATH)

# Define function to process and predict images
def preprocess_and_predict(img_path):
    img = image.load_img(img_path, target_size=(224, 224))  # Adjust size based on your model
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]  # Get class index

    return predicted_class

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = "uploaded_image.jpg"
    file.save(file_path)  # Save uploaded image

    # Run prediction
    predicted_class = preprocess_and_predict(file_path)

    return jsonify({"prediction": int(predicted_class)})  # Return predicted class

if __name__ == "__main__":
    app.run(debug=True, port=5000)
