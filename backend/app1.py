from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

DR_MODEL_PATH = 'diabetic_retinopathy_final_model.h5'
dr_stages = ["No_DR", "Mild_DR", "Moderate_DR", "Severe_DR", "Proliferative_DR"]

def load_model(model_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    return tf.keras.models.load_model(model_path)

try:
    dr_model = load_model(DR_MODEL_PATH)
    print("✅ DR model loaded successfully")
except Exception as e:
    print(f"❌ Error loading DR model: {str(e)}")
    dr_model = None

def preprocess_image(image, target_size=(299, 299)):
    image = image.resize(target_size)
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict_dr_stage', methods=['POST'])
def predict_dr_stage():
    try:
        if dr_model is None:
            return jsonify({"error": "DR model not loaded"}), 500

        file = request.files["file"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")

        processed_image = preprocess_image(image)
        dr_prediction = dr_model.predict(processed_image)
        stage_index = np.argmax(dr_prediction[0])
        stage = dr_stages[stage_index]
        confidence = float(dr_prediction[0][stage_index])

        return jsonify({
            "stage": stage,
            "confidence": confidence,
            "message": f"Detected {stage.replace('_', ' ')} with {confidence:.2%} confidence"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
