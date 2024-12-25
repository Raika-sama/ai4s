# engines/stili_cognitivi/main.py

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
  """
  Calcola il profilo dell'utente per il test degli stili cognitivi.

  Riceve in input un JSON con le risposte dell'utente.
  Restituisce un JSON con il profilo, il punteggio totale e i consigli.
  """
  try:
    data = request.get_json()
    risposte = data.get('risposte', [])

    # Definisci le categorie del profilo e i valori per ogni asse
    categorie = [
        { 'nome': 'Creatività', 'asse': ['Intuitivo', 'Sistematico'], 'positivo': True },
        { 'nome': 'Elaborazione', 'asse': ['Analitico', 'Globale'], 'positivo': True },
        { 'nome': 'Decisione', 'asse': ['Impulsivo', 'Riflessivo'], 'positivo': False },
        { 'nome': 'Apprendimento', 'asse': ['Visualizzatore', 'Verbalizzatore'], 'positivo': True },
        { 'nome': 'Autonomia', 'asse': ['Poco autonomo', 'Molto autonomo'], 'positivo': True }
    ]

    # Scala di valori per le risposte
    scala_positiva = { 'Per niente': 1, 'Poco': 1.5, 'Abbastanza': 2, 'Molto': 2.5, 'Completamente': 3 }
    scala_negativa = { 'Per niente': 3, 'Poco': 2.5, 'Abbastanza': 2, 'Molto': 1.5, 'Completamente': 1 }

    # Calcola il punteggio per ogni categoria
    punteggi = []
    for categoria in categorie:
      punteggio = 0
      for i in range(6):  # 6 domande per categoria
        indice_domanda = (categorie.index(categoria) * 6) + i
        risposta = next((r['risposta'] for r in risposte if r['domanda'] == indice_domanda), None)
        variabile = '+' if categoria['positivo'] else '-'  # Determina la variabile in base alla categoria
        scala = scala_positiva if variabile == '+' else scala_negativa
        punteggio += scala.get(risposta, 0)  # Aggiungi il punteggio della risposta (o 0 se non valida)
      punteggi.append({
          'nome': categoria['nome'],
          'punteggio': punteggio,
          'distanza_dal_centro': abs(punteggio - 10.25)
      })

    # Determina il valore del profilo per ogni categoria
    profilo = []
    for item in punteggi:
      valore = item['asse'][1] if item['punteggio'] > 10.25 else item['asse'][0]
      profilo.append({
          'nome': item['nome'],
          'valore': valore,
          'punteggio': item['punteggio'],
          'distanza_dal_centro': item['distanza_dal_centro'],
          'consigli': get_consigli(item['nome'], valore)  # Aggiungi i consigli
      })

    # Calcola il punteggio totale
    punteggio_totale = sum(item['punteggio'] for item in punteggi)

    return jsonify({
        'profilo': profilo,
        'punteggio': punteggio_totale
    })

  except Exception as e:
    return jsonify({'error': str(e)}), 500


def get_consigli(categoria, valore):
  """Restituisce i consigli personalizzati in base alla categoria e al valore del profilo."""
  consigli = {
      'Creatività': {
          'Intuitivo': [
              'Trova soluzioni rapide e creative senza seguire necessariamente regole definite.',
              'Usare brainstorming per generare idee.',
              'Sfrutta la tua immaginazione e la tua capacità di pensare fuori dagli schemi.',
              'Cerca di trovare soluzioni creative ai problemi ed esplorare approcci alternativi per risolvere problemi complessi..',
              'Lavorare in ambienti flessibili che favoriscano la creatività.',

          ],
          'Sistematico': [
              'Cerca di sviluppare la tua creatività attraverso attività come il brainstorming o il disegno.',
              'Prova a guardare i problemi da diverse prospettive.',
              'Preferisci approcci strutturati e metodici.',
              'Utilizzare strumenti di gestione del tempo per ottimizzare il lavoro.'
          ]
      },
      'Elaborazione': {
         'Analitico': [
             'Tendi a concentrarti sui dettagli e procedere passo dopo passo.',
             'Dividere i problemi in parti più piccole e lavora con schemi sequenziali.',
             'Documentare ogni passaggio per avere una visione chiara del progresso.'
         ],
         'Globale': [
             'Predilige una visione di insieme e si focalizza sul contesto generale.'
             'Creare mappe concettuali.',
             'Riflettere sul contesto prima di agire.',
             'Integrare idee da diverse fonti per costruire una comprensione globale.'
         ]
      },
      'Apprendimento': {
          'Visualizzatore': [
              'Impara meglio tramite immagini, grafici e rappresentazioni visive.',
              'Usare mappe mentali e infografiche.',
              'Integrare immagini nei materiali di studio.',
              'Utilizzare software di visualizzazione per organizzare idee.',

          ],
          'Verbalizzatore': [
              'Apprendi meglio tramite lettura e linguaggio scritto.',
              'Leggere testi con spiegazioni dettagliate.',
              'Prendere appunti dettagliati durante lo studio.',
              'Partecipare a discussioni o gruppi di studio.'
          ]
      },
      'Decisione': {
          'Impulsivo': [
              'Tendi a rispondere rapidamente e ad agire senza riflettere troppo.',
              'Prendere tempo prima di agire.',
              'Imparare tecniche di mindfulness ed acquisire consapevolezza di sé.',
              'Chiedere feedback prima di prendere decisioni importanti.',

          ],
          'Riflessivo': [
              'Preferisci riflettere attentamente prima di prendere decisioni.',
              'Analizzare pro e contro delle decisioni e valutare tutte le opzioni prima di agire.',
              'Lavorare in ambienti che consentano tempi lunghi di riflessione.',
              'Imparare ad agire in maniera più spontanea quando serve.'
          ]
      },
      'Autonomia': {
          'Poco autonomo': [
              'Hai bisogno di indicazioni esterne per portare a termine i compiti.',
              'Chiedere feedback frequenti.',
              'Lavorare con supervisori o tutor o in gruppo.',
              'Creare un piano dettagliato con supporto esterno.',

          ],
          'Molto autonomo': [
              'Ti gestisci bene da solo e preferisci autonomia nelle attività.',
              'Pianificare le attività in modo indipendente.',
              '"Fissare obiettivi personali chiari e valutare periodicamente i progressi.',
              'Non sottovalutare la importanza del lavoro di gruppo.'
          ]
      },
    }
  return consigli.get(categoria, {}).get(valore, [])


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5001)  # Avvia il microservizio sulla porta 5001

      
      
# Crea un'API Flask con un endpoint /calculate che riceve le risposte dell'utente.
# Calcola il punteggio, il profilo, la distanza dal centro e i consigli personalizzati.
# Restituisce i risultati in formato JSON.

# Note
# Assicurati di installare Flask: pip install Flask
# Ho aggiunto un esempio di funzione get_consigli che restituisce consigli generici. Dovrai implementarla con i consigli specifici per il tuo test.
# Il microservizio è configurato per essere eseguito sulla porta 5001.
# Ho utilizzato un dizionario consigli per organizzare i consigli per categoria e valore.