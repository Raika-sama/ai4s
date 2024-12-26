# config.py
import os

class Config:
    """Configurazione base"""
    DEBUG = False
    TESTING = False
    LOG_FILE = 'stili_cognitivi.log'
    # Limite massimo per le richieste POST (16MB)
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    
    # Configurazioni JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET') or "il-tuo-secret-key-di-sviluppo"
    JWT_ACCESS_TOKEN_EXPIRES = 24 * 3600  # 24 ore in secondi


    # Configurazione risposte valide
    VALID_RISPOSTE = ['Per niente', 'Poco', 'Abbastanza', 'Molto', 'Completamente']
    
    # Valore centrale per il calcolo del profilo
    CENTRO_SCALA = 10.25
    
    # Numero di domande per categoria
    DOMANDE_PER_CATEGORIA = 6

class DevelopmentConfig(Config):
    """Configurazione per ambiente di sviluppo"""
    DEBUG = True
    HOST = 'localhost'
    PORT = 5001

class TestingConfig(Config):
    """Configurazione per testing"""
    TESTING = True
    DEBUG = True

class ProductionConfig(Config):
    """Configurazione per produzione"""
    # In produzione potremmo voler usare variabili d'ambiente
    HOST = '0.0.0.0'
    PORT = 5001

# Dizionario per selezionare la configurazione
config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)