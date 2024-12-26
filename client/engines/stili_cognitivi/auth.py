# auth.py

import jwt
from functools import wraps
from flask import request, jsonify
from config import Config

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Controlla se il token è nell'header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]  # Bearer <token>
            except IndexError:
                return jsonify({'message': 'Token mancante'}), 401

        if not token:
            return jsonify({'message': 'Token mancante'}), 401

        try:
            # Decodifica il token
            data = jwt.decode(
                token, 
                Config.JWT_SECRET_KEY, 
                algorithms=["HS256"]
            )
            current_user = {
                'user_id': data['userId'],
                'email': data['email'],
                'ruolo': data['ruolo']
            }
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token scaduto'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token non valido'}), 401

        # Passa l'utente alla funzione decorata
        return f(current_user, *args, **kwargs)

    return decorated