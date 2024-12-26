# logger.py

import logging
from logging.handlers import RotatingFileHandler
import os
from datetime import datetime

def setup_logger():
    """
    Configura e restituisce un logger per il microservizio.
    Include:
    - Logging su file con rotazione
    - Logging su console
    - Formattazione timestamp
    - Livelli di logging differenziati
    """
    # Crea la cartella logs se non esiste
    log_dir = 'logs'
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Nome file log con data
    log_filename = os.path.join(
        log_dir, 
        f'stili_cognitivi_{datetime.now().strftime("%Y%m%d")}.log'
    )

    # Configura il logger principale
    logger = logging.getLogger('stili_cognitivi')
    logger.setLevel(logging.INFO)

    # Formattazione dei log
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

    # Handler per il file con rotazione
    file_handler = RotatingFileHandler(
        log_filename,
        maxBytes=1024 * 1024,  # 1MB
        backupCount=5
    )
    file_handler.setFormatter(formatter)
    file_handler.setLevel(logging.INFO)

    # Handler per la console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    console_handler.setLevel(logging.DEBUG)

    # Aggiungi gli handler al logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    # Log iniziale per verificare che tutto funzioni
    logger.info('Logger inizializzato con successo')

    return logger

# Funzioni helper per log specifici
def log_request(logger, request_data):
    """Log dei dati della richiesta"""
    logger.info(f"Nuova richiesta ricevuta: {request_data}")

def log_response(logger, response_data):
    """Log della risposta"""
    logger.info(f"Risposta inviata: {response_data}")

def log_error(logger, error_msg, exc_info=None):
    """Log degli errori"""
    logger.error(f"Errore: {error_msg}", exc_info=exc_info)

def log_validation_error(logger, error_details):
    """Log degli errori di validazione"""
    logger.warning(f"Errore di validazione: {error_details}")