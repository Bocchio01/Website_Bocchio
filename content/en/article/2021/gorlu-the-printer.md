---
title: Gorlu the printer
description: The project 'Gorlu the printer', which is a nice little CNC plotter built using Arduino and coded in Python. How the project began, the algorithm  that controls its movement and analyses the images, the stepper-motors that move the pen, and some usefull document to DIY.
paragraph:
  [
    'A nice little CNC plotter for printing images or text.<br>',
    'Made with Arduino, some components from an old PC and a pair of wooden blocks, this little plotter <b>was able to surprse even me with its drawing accuracy.</b>',
    'Easy to make, during the article you will find all the source code (Python and C++) and many usefull document to do it by yourself.',
  ]
img:
  src: /v1635033169/Articoli/Gorlu%20la%20stampante/Gorlu.jpg
  alt: Gorlu the printer
tag: [Coding]

createdAt: 2021-06-09T12:47:00Z
updatedAt: 2021-11-05T21:54:00Z
---

# Gorlu the printer

<CMedia :s="img.src" :a="img.src"></CMedia>

## L'idea iniziale

Una sera di Ottobre, vedendo la scatola di Arduino riposta sulla mensola, mi è venuta voglia di creare qualcosa di più complesso del solito "led on/off" o del semplice sensore...

Pochi giorni prima mi era capitato sott'occhio un video su YouTube di questa piccola stampante automatizzata e ho quindi preso ispirazione da lì.

Cercando poi online ho visto che era un progetto molto comunque e praticamente tutto il codice necessario era già presente e pronto da scaricare dalle repository GitHub. Ma no, a me le cose facili non piacciono e non mi soddisfano.

## Gli obbiettivi

Deciso quindi a creare qualcosa di più di un semplice [plotter CNC](https://it.wikipedia.org/wiki/Macchina_a_controllo_numerico), ho pensato alle funzioni che avrei voluto integrare:

- **Stampa di immagini digitali (di qualsiasi formato)** semplificandole ovviamente prima e quindi analizzandole alla ricerca di quelle definibili come le _linee principali_ dell'immagine;
- La possibilità di stampare in tempo reale una qualsiasi linea disegnata a mano libera sul PC. **Utilizzare quindi il plotter come un vero e proprio braccio robotico sincronizzato con la propria mano**;
- E infine, anche se aggiunta "a lavori in corso", la funzionalità di **stampa di un vero e proprio testo** con la possibilità di scegliere font, dimensioni, allineamento ecc..

Definiti quindi gli obiettivi principali, sono partito dalla scrittura del codice.

## L’impostazione del codice

Visto che fino a quel momento se non per qualche linguaggio web conoscevo solamente il C, ho deciso di imparare la sintassi di Python potendo così sfruttare poi la moltitudine di librerie che sapevo essere disponibili online.

**Il codice si basa quindi su Python per quanto riguarda la parte di analisi ed elaborazione nonché l'interfaccia grafica, e sul C++ per quanto riguarda il programma che governa Arduino.**

<CMedia s="/v1637023033/Articoli/Gorlu%20la%20stampante/Logo_py_c.png" c="Loghi di Python e C++"></CMedia>

Tra le librerie più importanti che ho scelto di utilizzare ci sono sicuramente:

- [OpenCV + PIL](https://opencv.org/) per l'elaborazione e l'estrapolazione dei dati dalle immagini;
- [NumPy](https://numpy.org/) per la manipolazione di array e matrici (utile essendo i file di tipo immagine salvati in memoria RAM sotto formato di matrice);
- [pySerial](https://pythonhosted.org/pyserial/) per la comunicazione tramite porta USB con Arduino;
- [Tkinter](https://tkdocs.com/) per la creazione dell'interfaccia grafica (GUI);
- [AF_Motor.h](https://learn.adafruit.com/adafruit-motor-shield/library-install) per il controllo dei segnali elettrici verso i motorini della stampante.

## L'algoritmo

**L'algoritmo principale**, ovvero quello che si occupa della stampa di immagini digitali, **è sostanzialmente un algoritmo di ricerca e ordinamento**.

Data un'immagine in input la semplifica (sfruttando la [funzione Canny()](https://it.wikipedia.org/wiki/Algoritmo_di_Canny) presente in OpenCV) estrandone le linee principali e salvando poi i pixel individuati in una matrice bidimensionale.

<CMedia s="/v1637024651/Articoli/Gorlu%20la%20stampante/Canny.png" c="Un esempio di utilizzo dell'algoritmo Canny"></CMedia>

Ne viene allora eseguita la scansione con la logica di andare a stampare non singoli punti (rischiando così di avere problemi con l'inchiostro della penna), ma linee continue. **Preso un elemento A, l'algoritmo ne analizza i pixel in posizioni limitrofe in cerca di un elemento B da stampare. In caso di successo ne invia le coordinate ad Arduino, altrimenti allarga il campo di ricerca sempre centranto in A fino a che non viene identificato un elemento B.** Il programma poi cicla prendendo come punto di partenza le coordinate dell'elemento B appena individuato, e continua in maniera analoga fino a che tutta la matrice non è stata scansionata.

<CMedia s="/v1632851575/Articoli/Gorlu%20la%20stampante/Algoritmo_di_ricerca_1.png" c="Simulazione grafica dell'algoritmo di ricerca"></CMedia>

<CMedia s="/v1632851575/Articoli/Gorlu%20la%20stampante/Algoritmo_di_ricerca_2.png" c="Uno screen dell'algoritmo di ricerca"></CMedia>

Vista la sua semplicità e la sua bassa complessità computazionale, l'algoritmo risulta essere rapido e poco dispendioso di risorse. Inoltre, lavorando sempre e solo all'interno della RAM, non vi è mai la necessità di salvare dati sul disco fisso e questo permette di lasciare il PC libero da superflui file di salvataggio.

Entrambe le funzionalità di stampa di immagini digitali che di testo, sono gestite dal'algoritmo sopra descritto. Quando infatti si sceglie di stampare del testo, il programma trasforma il foglio scritto in immagine (tramite una sorta di cattura dello schermo) e lo passa come argomento di input all'algoritmo che lo elaborerà come una qualsiasi altra immagine.

Per quanto riguarda invece la funzionalità legata alla stampa simultanea mano/Arduino, essa viene gestita molto semplicemente inviando le coordinate del mouse quando il tocco è attivo. Nulla di piu semplice direi.

## La struttura

Ovviamente nulla funzionerebbe senza una buona struttura a sostegno. **La stampante si può dire essere composta da 2 parti principali:**

- Due carrelli con i relativi motorini;
- Il sistema di controllo dell'altezza della penna.

In particolare, **i due carrelli servono a muovere il foglio lungo le due direzioni X e Y** (per essere precisi, lungo una direzione viene mosso il foglio in sé, mentre nell'altra direzione viene traslata la penna). Sono ricavati da due lettori di DVD di un vecchio computer e i motorini che li muovono (già integrati originariamente nella struttura) lavorano ruotando di n° micro-step per volta.

Questa tipologia di motore viene infatti definita stepper-motor e non ragionano per angoli di rotazione, ma secondo un numero di step rotazionali da compiere (solitamente un giro completo è suddiviso in ~500 step). **Conoscendo la rotazione associata a ciascuno step e quindi il conseguente spostamento del carrello, è facile convertire il delta tra due coordinate di pixel in un determinato numero di step da fare per raggiungere lo spostamento della penna necessario.**

<CMedia s="https://res.cloudinary.com/bocchio/video/upload/v1632851317/Articoli/Gorlu%20la%20stampante/Movimento_carrelli.mp4" c="Scorrimento dei due carrelli" type="video"></CMedia>

Il meccanismo legato invece al movimento della penna **lungo l'asse Z** è invece leggermente più fine e delicato: è composto infatti da **un servo-motore legato con un filo inestensibile alla mina della penna.** Quando la penna deve essere alzata, il servo compie una rotazione di qualche grado, mandando in tensione il filo e tirando così verso l'alto la mina. Per ritornare con la mina sul foglio, il servo rilascia la tensione lungo il filo, e un elastico spinge verso il basso la mina.

<CMedia s="https://res.cloudinary.com/bocchio/video/upload/v1632851576/Articoli/Gorlu%20la%20stampante/Movimento_penna.mp4" c="Il meccanismo per alzare e abbasare la penna" type="video"></CMedia>

In questo modo visto che l'elastico genera sempre la stessa forza sulla mina, la stampa avrà una distribuzione di inchiostro omogenea (ottimo no?).

## Gorlu la stampante!

Dopo quindi qualche giorno davanti al PC e un paio di notti con gli attrezzi in mano, **la stampantina GORLU era ufficialmente nata :)**

Il nome non ha mai avuto un significato preciso e mi è venuto in mente durante la sua costruzione. Però mi è fin da subito piaciuto e poi del resto, why not?

Ecco qualche video del progetto finito.. Enjoy!

<CMedia s="https://www.youtube.com/embed/qBS6WiSzQmI" c="Stampa di Pikachu" type="iframe"></CMedia>

## Realizzarlo da sé

Nel caso si volesse provare a realizzare per conto proprio, a fondo pagina nella sezione degli allegati è possibile trovare alcuni file utili allo scopo. Inoltre, per quanto riguarda il codice, é possibile trovarlo a [questa repository GitHub](https://github.com/Bocchio01/Arduino_CNC_plotter).

Una volta scaricato occorrerà, se ancora non presente sul PC, installare [Python](https://www.python.org/downloads/) e le librerie aggiuntive.

```shell
//Windows
cd C:/Users/ *Nome_utente* /AppData/Local/Programs/Python/Python39/Scripts\
pip install opencv-python pillow numpy pyserial tk
```

Installata la libreria [AF_Motor.h](https://learn.adafruit.com/adafruit-motor-shield/library-install) e caricato lo sketck di Arduino sulla scheda, si è pronti ad avviare il file _main.py_ e a giocare con il proprio nuovo plotter CNC!
