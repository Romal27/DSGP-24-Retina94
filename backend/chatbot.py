# backend/chatbot.py
from transformers import BertTokenizer, BertModel
import torch
import numpy as np
import json

class DiabeticChatbot:
    def __init__(self, data_path='retina_bot_data.json'):
        # Load BERT
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        # Load Q&A data and debug
        with open(data_path, 'r') as f:
            self.qa_pairs = json.load(f)
        print(f"Loaded qa_pairs: {self.qa_pairs[:2]}")  # Print first 2 entries to check format
        print(f"Type of qa_pairs: {type(self.qa_pairs)}")  # Check if it's a list
        # Precompute embeddings for all questions
        self.question_embeddings = np.array([self._get_embedding(qa['question']) for qa in self.qa_pairs])

    def _get_embedding(self, text):
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=128)
        with torch.no_grad():
            outputs = self.model(**inputs)
        return outputs.last_hidden_state.mean(dim=1).squeeze().numpy()

    def get_response(self, user_query):
        query_embedding = self._get_embedding(user_query)
        similarities = np.dot(self.question_embeddings, query_embedding) / (
            np.linalg.norm(self.question_embeddings, axis=1) * np.linalg.norm(query_embedding)
        )
        best_match_idx = np.argmax(similarities)
        if similarities[best_match_idx] < 0.5:  # Threshold for relevance
            print(f"No good match for '{user_query}', similarity: {similarities[best_match_idx]}")  # Debug
            return "Sorry, I don’t have a clear answer for that. Try asking about diabetic retinopathy or diabetes!"
        print(f"Matched '{user_query}' to: {self.qa_pairs[best_match_idx]['question']}")  # Debug
        return self.qa_pairs[best_match_idx]['answer']

# Test it (optional)
if __name__ == "__main__":
    bot = DiabeticChatbot()
    print(bot.get_response("What is diabetic retinopathy?"))