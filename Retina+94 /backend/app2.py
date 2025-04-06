from flask import Flask, request, jsonify
from flask_cors import CORS
from Chatbot import DiabeticChatbot  # Fixed import path

# ✅ Corrected name usage
app = Flask(__name__)
CORS(app)

# Initialize chatbot
chatbot = DiabeticChatbot(data_path='retina_bot_data.json')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_input = data.get('user_input', '')
    response = chatbot.get_response(user_input)
    return jsonify({'bot': response})

# ✅ Corrected main guard
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Added port 5001 to avoid conflicts with app.py
