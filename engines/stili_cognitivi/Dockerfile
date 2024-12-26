# In engines/stili_cognitivi/Dockerfile
FROM python:3.9

WORKDIR /app

# Copia prima i file shared (incluso auth)
COPY engines/shared /app/shared

# Copia i file del test
COPY engines/stili_cognitivi /app/stili_cognitivi

# Aggiungi questa riga per il PYTHONPATH
ENV PYTHONPATH=/app

# Installa le dipendenze
COPY engines/stili_cognitivi/requirements.txt .
RUN pip install -r requirements.txt

# Variabili d'ambiente per JWT
ENV JWT_SECRET=""
ENV JWT_ALGORITHM="HS256"

# Esponi la porta
EXPOSE 5001

# Avvia il server
CMD ["python", "-m", "stili_cognitivi.main"]