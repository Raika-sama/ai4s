# main.py
import os

from flask import Flask, request, jsonify
import json
from datetime import datetime

# Importiamo tutti i nostri componenti
from config import Config, config_by_name
from logger import setup_logger, log_request, log_response, log_error
from auth import token_required
from validators import validate_test_input, validate_user_permissions
from calculator import ProfileCalculator
from models import TestInput, TestOutput, ProfiloCompleto

# Inizializzazione Flask e componenti
app = Flask(__name__)
logger = setup_logger()
calculator = ProfileCalculator()

# Configurazione dell'ambiente
env = os.getenv('FLASK_ENV', 'dev')
app.config.from_object(config_by_name[env])

@app.route('/health', methods=['GET'])
def health_check():
    """
    Endpoint per verificare che il servizio sia attivo
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/calculate', methods=['POST'])
@token_required
@validate_test_input
@validate_user_permissions(['studente', 'insegnante'])
def calculate(current_user):
    """
    Endpoint principale per il calcolo del profilo
    """
    try:
        # Log della richiesta
        log_request(logger, request.validated_data, current_user)

        # Creiamo l'oggetto TestInput dai dati validati
        test_input = TestInput(
            user_id=current_user['user_id'],
            test_id=request.validated_data['test_id'],
            risposte=request.validated_data['risposte']
        )

        # Calcoliamo il profilo
        result = calculator.calculate_profile(test_input.risposte)

        # Creiamo il profilo completo
        profile = ProfiloCompleto(
            user_id=test_input.user_id,
            test_id=test_input.test_id,
            data=datetime.now(),
            profilo=result['profilo'],
            punteggio_totale=result['punteggio_totale'],
            media_punteggio=result['media_punteggio']
        )

        # Preparariamo la risposta
        response = TestOutput(
            success=True,
            message="Profilo calcolato con successo",
            data=profile
        )

        # Log della risposta
        log_response(logger, response)

        return jsonify(response.__dict__)

    except Exception as e:
        error_msg = f"Errore durante il calcolo del profilo: {str(e)}"
        log_error(logger, error_msg, exc_info=True)
        
        return jsonify(TestOutput(
            success=False,
            message="Errore durante l'elaborazione",
            errors={'detail': str(e)}
        ).__dict__), 500