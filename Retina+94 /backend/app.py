from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

FUNDUS_MODEL_PATH = 'final_fundus_nonfundus_classifier.h5'
DR_MODEL_PATH = 'DR_StageClassification_FinalModel.h5'


def load_model(model_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    return tf.keras.models.load_model(model_path)


try:
    fundus_model = load_model(FUNDUS_MODEL_PATH)
    dr_model = load_model(DR_MODEL_PATH)
    logging.info("Models loaded successfully")
except Exception as e:
    logging.error(f"Error loading models: {str(e)}")
    fundus_model = None
    dr_model = None

class_labels = ["Fundus", "No Fundus"]  
dr_stages = ["No_DR", "Mild_DR", "Moderate_DR", "Severe_DR", "Proliferative_DR"]

def preprocess_image(image, target_size=(224, 224)):
    """Preprocess the uploaded image for fundus model prediction."""
    image = image.resize(target_size)
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def load_resnet50(input_shape=(224, 224, 3), trainability=False):
    """Load ResNet50 pretrained on ImageNet as a feature extractor."""
    base_model = tf.keras.applications.ResNet50(weights='imagenet', include_top=False, input_shape=input_shape)
    preprocessor = tf.keras.applications.resnet50.preprocess_input
    for layer in base_model.layers:
        layer.trainable = trainability
    return base_model, preprocessor

try:
    base_model_resnet, preprocess_input = load_resnet50()
    logging.info("ResNet50 base model loaded successfully")
except Exception as e:
    logging.error(f"Error loading ResNet50 base model: {str(e)}")
    base_model_resnet, preprocess_input = None, None

def preprocess_dr_image(image):
   
    image = image.resize((224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(image)
    img_array = np.expand_dims(img_array, axis=0)
    
    img_array = preprocess_input(img_array)
    features = base_model_resnet.predict(img_array, verbose=0)
    
    features_flat = features.flatten()
    features_flat = np.expand_dims(features_flat, axis=0)
    
    logging.info(f"DR feature vector shape: {features_flat.shape}")
    return features_flat

@app.route("/predict", methods=["POST"])
def predict():
    """
    Endpoint to determine if an image is a fundus image.
    Uses the fundus_model with its preprocessing.
    """
    try:
        if fundus_model is None:
            return jsonify({"error": "Fundus model not loaded"}), 500

        file = request.files["file"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
        processed_image = preprocess_image(image)

        prediction = fundus_model.predict(processed_image)[0][0]
        
        if prediction >= 0.5:
            result = "Invalid image. Please try again."
        else:
            result = "Fundus"

        return jsonify({
            "fundus_image": result,
        })

    except Exception as e:
        logging.error(f"Error in /predict: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/predict_dr_stage", methods=["POST"])
def predict_dr_stage():
    
    try:
        if fundus_model is None or dr_model is None or base_model_resnet is None:
            return jsonify({"error": "One or more models not loaded"}), 500

        file = request.files["file"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
    
        fundus_processed = preprocess_image(image)
        fundus_prediction = fundus_model.predict(fundus_processed)[0][0]
        logging.info(f"Fundus prediction: {fundus_prediction}")

        if fundus_prediction >= 0.5:  
            return jsonify({'error': 'Invalid image. Please try again.'}), 400

        dr_features = preprocess_dr_image(image)
        dr_prediction = dr_model.predict(dr_features)
        logging.info(f"DR model raw prediction: {dr_prediction}")

        stage_index = np.argmax(dr_prediction[0])
        stage = dr_stages[stage_index]
        confidence = float(dr_prediction[0][stage_index])

        return jsonify({
            "stage": stage,
            "confidence": confidence,
            "message": f"Detected {stage.replace('_', ' ')} with {confidence:.2%} confidence"
        })

    except Exception as e:
        logging.error(f"Error in /predict_dr_stage: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
