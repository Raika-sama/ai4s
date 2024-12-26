# engines/shared/config.py
import os

class Config:
    """Configurazione base"""
    DEBUG = False
    TESTING = False
    LOG_FILE = 'stili_cognitivi.log'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    
    # Configurazioni JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET')
    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET environment variable not set")
    
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
    HOST = '0.0.0.0'
    PORT = int(os.environ.get('PORT', 5001))

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)