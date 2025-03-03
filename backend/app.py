# backend/app.py
from flask import Flask, request, render_template
from backend.chatbot import DiabeticChatbot
import os

# Get the root directory of the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__,
            template_folder=os.path.join(BASE_DIR, 'templates'),
            static_folder=os.path.join(BASE_DIR, 'static'))
chatbot = DiabeticChatbot(data_path='retina_bot_data.json')  # Initialize chatbot

# Initialize chat history as a list
chat_history = []

@app.route('/', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        user_input = request.form['user_input']
        response = chatbot.get_response(user_input)
        print(f"User input: {user_input}, Bot response: {response}")  # Debug
        if response:  # Only append if there's a response
            chat_history.append({"user": user_input, "bot": response})
        else:
            chat_history.append({"user": user_input, "bot": "Sorry, I couldn’t find an answer."})
        return render_template('index.html', chat_history=chat_history)
    return render_template('index.html', chat_history=chat_history)

if __name__ == '__main__':
    app.run(debug=True)