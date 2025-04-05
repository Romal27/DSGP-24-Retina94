from transformers import BertTokenizer, BertModel
import torch
import numpy as np
import json
import os

class DiabeticChatbot:
    def __init__(self, data_path='./retina_bot_data.json'):
        # Load BERT model and tokenizer
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')

        # Load Q&A data
        full_path = os.path.join(os.path.dirname(__file__), data_path)
        with open(full_path, 'r') as f:
            self.qa_pairs = json.load(f)

        # Precompute embeddings for all questions
        self.question_embeddings = np.array(
            [self._get_embedding(qa['question']) for qa in self.qa_pairs]
        )

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

        if similarities[best_match_idx] < 0.5:
            return "Sorry, I don’t have a clear answer for that. Try asking about diabetic retinopathy or diabetes!"

        return self.qa_pairs[best_match_idx]['answer']
