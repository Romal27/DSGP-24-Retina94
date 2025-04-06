# Retina+94 - Diabetic Retinopathy Identification and Awareness App

## Project Overview
*Retina+94* is a web-based application designed to help with the early detection and management of diabetic retinopathy using machine learning. The app validates fundus images, classifies the severity of diabetic retinopathy, provides real-time patient support through an AI-powered chatbot, and directs users to the nearest medical facility with eye care specialists.

---

## Key Features

### 1. *Image Validation*
•⁠  ⁠*Purpose*: Ensures the uploaded image is a valid fundus image (retina scan).
•⁠  ⁠*Technology*:  
  - *CNN Models* (e.g., ResNet50, EfficientNetB0) for validation.
  - Image preprocessing techniques (resize, rotate, blur) to ensure image quality.

### 2. *Diabetic Retinopathy Stage Classification*
•⁠  ⁠*Purpose*: Classifies the severity of diabetic retinopathy into one of five stages:  
  - Normal/Healthy, Mild, Moderate, Severe, Proliferative.
•⁠  ⁠*Technology*:  
  - *CNN* and *SVM* models.
  - Deep learning models like *DenseNet121, **VGG16* for classification.

### 3. *AI-Powered Chatbot*
•⁠  ⁠*Purpose*: Provides real-time support to users by answering medical questions and offering disease-related information.
•⁠  ⁠*Technology*:  
  - *Rasa* for chatbot development.
  - *spaCy, **Transformers* for NLP to enhance the chatbot's understanding.

### 4. *Location-Based Services*
•⁠  ⁠*Purpose*: Guides users to the nearest hospital and recommends doctors specializing in eye care.
•⁠  ⁠*Technology*:  
  - *Google Maps API* for location tracking.
  - *Optimization Algorithms* (Dijkstra’s, A*) to suggest the shortest route to medical facilities.

---

## Technologies Used
•⁠  ⁠*Frontend*: React.js
•⁠  ⁠*Backend*: Python (Flask)
•⁠  ⁠*Machine Learning*: TensorFlow, Keras, OpenCV
•⁠  ⁠*Chatbot*: Rasa, spaCy, Transformers
•⁠  ⁠*Location Services*: Google Maps API
•⁠  ⁠*Optimization Algorithms: Dijkstra’s, A

---

## Installation Instructions
1.⁠ ⁠Clone the repository:
   ```bash
   git clone https://github.com/Romal27/DSGP-24-Retina94.git
