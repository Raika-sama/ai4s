# AI4S - README

## Descrizione

Questo progetto si propone di sviluppare un'applicazione web per la somministrazione di test psicologici, con funzionalità di analisi dei dati e generazione di report. L'applicazione sarà conforme al GDPR e permetterà la somministrazione di test multipli, la generazione di PDF personalizzati per studente e la visualizzazione di dati aggregati per classe.

## Cronologia

**25/12/2024:** 
    * Creazione del repository su GitHub.
    * Definizione della struttura del progetto (frontend React, backend Node.js, engine Python).
    * Scelta di MongoDB Atlas come database.
    * Installazione di Node.js e creazione dell'app React.
    * Risoluzione di un conflitto di dipendenze durante l'installazione di React.
    * Aggiunta della stringa di connessione a MongoDB Atlas nel file `server/app.js`.
    * Discussione sull'hosting e scelta di utilizzare un servizio con supporto per MongoDB e deploy da GitHub.
    * Definizione del formato dati JSON per i test.
    * Discussione sulla gestione degli utenti e conformità al GDPR.
    * Definizione del ruolo dell'insegnante e funzionalità di caricamento studenti da Excel.
    * Creazione dei componenti React per la pagina di login (`Login.js`) e registrazione (`Registration.js`).
    * Creazione della pagina `LoginPage.js` che include i componenti di login e registrazione.


## Prossimi passi

* Sviluppo del backend (Node.js ed Express.js) per la gestione degli utenti e l'autenticazione.
* Implementazione della funzionalità di caricamento studenti da Excel.
* Integrazione degli engine dei test (Python).
* Sviluppo della funzionalità di somministrazione test multipli.
* Sviluppo della funzionalità di generazione PDF personalizzati.
* Sviluppo della funzionalità di visualizzazione dati aggregati per classe.
* Test e deploy dell'applicazione.
* Ricorda che il codice per inviare i dati al backend (// TODO: ...) è ancora da implementare.

## Tecnologie

* **Frontend:** React, JavaScript, HTML, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Engine dei test:** Python
* **Controllo versione:** Git e GitHub
* **Hosting:** Da definire (Heroku o DigitalOcean)

## Struttura del progetto
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
│   └── src/             # Questa cartella contiene tutto il codice sorgente della tua applicazione React.
│       └── components/  # In questa cartella, è buona norma organizzare tutti i componenti riutilizzabili dell'interfaccia utente. Il componente Login è un buon esempio di componente riutilizzabile, in quanto potrebbe essere utilizzato in diverse parti dell'applicazione (es. nella pagina di login, in un modale, etc.).
│           └── Login.js
│           └── Registration.js
│       └── pages/       # Pagine dell'applicazione
│           └── LoginPage.js
├── server/              # Cartella per il backend (Node.js)
│   └── ...
├── engines/             # Cartella per gli engine dei test (Python)
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

* Il progetto è in fase iniziale di sviluppo.
* La documentazione verrà aggiornata man mano che il progetto procede.

## Contatti

* [Il tuo nome]
* [Email]

## Licenza

MIT License
