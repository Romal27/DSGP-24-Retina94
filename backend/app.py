from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)  

# Define model paths
FUNDUS_MODEL_PATH = 'fundus_classifier_new.h5'
DR_MODEL_PATH = 'diabetic_retinopathy_final_model.h5'

# Load models
def load_model(model_path):
    """Load a TensorFlow model from the given path."""
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    return tf.keras.models.load_model(model_path)

# Load models (wrapped in try-except to provide better error messages)
try:
    fundus_model = load_model(FUNDUS_MODEL_PATH)
    dr_model = load_model(DR_MODEL_PATH)
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {str(e)}")
    # In production, you might want to handle this differently
    fundus_model = None
    dr_model = None

class_labels = ["Fundus", "No Fundus"]  # 0 = Fundus, 1 = No Fundus
dr_stages = ["No_DR", "Mild_DR", "Moderate_DR", "Severe_DR", "Proliferative_DR"]

def preprocess_image(image, target_size=(224, 224)):
    """Preprocess the uploaded image for model prediction."""
    image = image.resize(target_size) 
    image = np.array(image) / 255.0  
    image = np.expand_dims(image, axis=0)  
    return image

@app.route("/predict", methods=["POST"])
def predict():
    """Determine if an image is a fundus image or not."""
    try:
        if fundus_model is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        file = request.files["file"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")  
        processed_image = preprocess_image(image)

        prediction = fundus_model.predict(processed_image)[0][0]  

        # Ensure correct classification: 0 = Fundus, 1 = No Fundus
        result = class_labels[int(prediction >= 0.5)]  # If prediction >= 0.5 → No Fundus, else → Fundus

        return jsonify({
            "fundus_image": result,
            "confidence": float(prediction)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_image():
    """Analyze fundus image for diabetic retinopathy staging."""
    try:
        if fundus_model is None or dr_model is None:
            return jsonify({"error": "Models not loaded"}), 500
            
        image = request.files['image']
        img = Image.open(image).convert("RGB")
        
        # First check if it's a fundus image
        fundus_processed = preprocess_image(img)
        fundus_prediction = fundus_model.predict(fundus_processed)[0][0]
        
        if fundus_prediction >= 0.5:  # Not a fundus image
            return jsonify({'error': 'Not a fundus image'}), 400
            
        # If it is a fundus image, predict DR stage
        dr_processed = preprocess_image(img, target_size=(299, 299))  # Adjust size if needed for your model
        dr_prediction = dr_model.predict(dr_processed)
        stage_index = np.argmax(dr_prediction[0])
        stage = dr_stages[stage_index]
        
        confidence = float(dr_prediction[0][stage_index])
        
        return jsonify({
            'stage': stage,
            'confidence': confidence,
            'message': f"Detected {stage.replace('_', ' ')} with {confidence:.2%} confidence"
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
