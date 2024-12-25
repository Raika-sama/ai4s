# AI4S - README

## Descrizione

Questo progetto si propone di sviluppare un'applicazione web per la somministrazione di test psicologici, con funzionalità di analisi dei dati e generazione di report.

## Cronologia

* **25/12/2024:** 
    * Creazione del repository su GitHub.
    * Definizione della struttura del progetto (frontend React, backend Node.js, engine Python).
    * Scelta di MongoDB come database.
    * Installazione di Node.js e creazione dell'app React.
    * Risoluzione di un conflitto di dipendenze durante l'installazione di React.
    * Aggiunta della stringa di connessione a MongoDB Atlas nel file `server/app.js`.
    * Discussione sull'hosting e scelta di utilizzare un servizio con supporto per MongoDB e deploy da GitHub.

## Prossimi passi

* Definizione dettagliata delle funzionalità dell'applicazione.
* Progettazione dell'interfaccia utente.
* Sviluppo del backend (Node.js ed Express.js).
* Integrazione degli engine dei test (Python).
* Test e deploy dell'applicazione.

## Tecnologie

* **Frontend:** React, JavaScript, HTML, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Engine dei test:** Python
* **Controllo versione:** Git e GitHub
* **Hosting:** Da definire (Heroku o DigitalOcean)

## Struttura del progetto

ai4s/
├── client/              # Cartella per il frontend (React)
│   └── ...
├── server/              # Cartella per il backend (Node.js)
│   └── ...
├── engines/             # Cartella per gli engine dei test (Python)
│   └── ...
└── ..

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

* Il progetto è in fase iniziale di sviluppo.
* La documentazione verrà aggiornata man mano che il progetto procede.

## Contatti

* [Il tuo nome]
* [Email]

## Licenza

MIT License
