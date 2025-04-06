from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  
model = tf.keras.models.load_model("fundus_classifier_optimized.h5")

class_labels = ["Fundus", "No Fundus"]  # 0 = Fundus, 1 = Non Fundus

def preprocess_image(image):
    """Preprocess the uploaded image for model prediction."""
    image = image.resize((224, 224)) 
    image = np.array(image) / 255.0  
    image = np.expand_dims(image, axis=0)  
    return image

@app.route("/predict", methods=["POST"])
def predict():
    try:
        file = request.files["file"]
        image = Image.open(io.BytesIO(file.read())).convert("RGB")  
        processed_image = preprocess_image(image)

        prediction = model.predict(processed_image)[0][0]  

        #  0 = Fundus, 1 = Non Fundus
        result = class_labels[int(prediction < 0.5)]  

        return jsonify({
            "fundus_image": result,
            "confidence": float(prediction)
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
