FROM python:3.9-slim

WORKDIR /app

COPY engines/shared /app/shared
COPY engines/stili_cognitivi /app/stili_cognitivi
COPY engines/stili_cognitivi/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONPATH=/app \
    JWT_ALGORITHM=HS256 \
    JWT_SECRET=""

EXPOSE 5001

CMD ["python", "-m", "stili_cognitivi.main"]