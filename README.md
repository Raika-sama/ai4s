Markdown

# Test App - README

## Descrizione

Questo progetto si propone di sviluppare un'applicazione web per la somministrazione di test psicologici, con funzionalità di analisi dei dati e generazione di report.

## Tecnologie

* **Frontend:** React, JavaScript, HTML, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Deploy:** PythonAnywhere (per ora)

## Struttura del progetto

MindScanner/
├── client/              # Cartella per il frontend (React)
│   ├── public/          # File statici (index.html, favicon, etc.)
│   ├── src/             # Codice sorgente React
│   │   ├── components/    # Componenti React riutilizzabili
│   │   ├── pages/       # Pagine dell'applicazione (login, dashboard, test, risultati)
│   │   ├── App.js        # Componente principale
│   │   ├── index.js      # Punto di ingresso dell'applicazione
│   │   └── ...          # Altri file e cartelle
│   └── package.json      # Definizione del progetto e dipendenze
├── server/              # Cartella per il backend (Node.js)
│   ├── routes/          # Definizione delle API REST
│   ├── models/          # Modelli per i dati (utenti, test, risultati)
│   ├── controllers/     # Logica di business per le API
│   ├── app.js           # File principale del server
│   └── package.json      # Definizione del progetto e dipendenze
└── ...                 # Altri file e cartelle (es: configurazione, documentazione)
MindScanner/
├── client/              # Cartella per il frontend (React)
│   └── ...
├── server/              # Cartella per il backend (Node.js)
│   └── ...
├── engines/             # Cartella per gli engine dei test (Python)
│   ├── stili_cognitivi/ # Engine per il test degli stili cognitivi
│   │   ├── main.py      # Script principale dell'engine
│   │   ├── utils.py     # Funzioni di utilità
│   │   └── ...          # Altri file e moduli
│   ├── test_2/         # Engine per il secondo tipo di test
│   │   └── ...
│   └── ...
└── ...

## Installazione

1. **Clonare il repository:** `git clone <url del repository>`
2. **Installare le dipendenze del frontend:** `cd client && npm install`
3. **Installare le dipendenze del backend:** `cd server && npm install`

## Avvio dell'applicazione

1. **Avviare il server di sviluppo:** `npm start` nella cartella `server`
2. **Avviare l'applicazione React:** `npm start` nella cartella `client`

## Contribuire al progetto

1. Creare un branch per la nuova funzionalità o bug fix: `git checkout -b nome-branch`
2. Effettuare le modifiche e committare: `git commit -m "Descrizione delle modifiche"`
3. Pushare il branch: `git push origin nome-branch`
4. Creare una pull request su GitHub.

## Note

* Assicurarsi di avere Node.js e npm installati sulla propria macchina.
* Per il deploy su PythonAnywhere, seguire le istruzioni sulla piattaforma.

## Contatti

* Riccardo Nicoli
* Riccardonicolilb@gmail.com

## Licenza

[Specificare la licenza del progetto]
