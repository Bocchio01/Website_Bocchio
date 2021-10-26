---
title: Gorlu la stampante
description: Un piccolo plotter CNC costruito con Arduino e programmato in Python. Come è nato il progetto, l'algoritmo che ne regola il movimento e analizza le immagini, e come fare per realizzarlo da sé
paragraph: [
            "Un piccolo e simpatico plotter per stampare immagini o testo.",
            "Grazie all'utilizzo di Arduino, Python e qualche componente di un vecchio PC, potrai costruirlo anche tu!"
        ]
img: 
    src: /v1632662892/Articoli/Gorlu%20la%20stampante/Gorlu.png
    alt: Gorlu la stampante
tag: [
    Programmazione
]
---

# Gorlu la stampante

<cMedia type="img" s="/v1632662892/Articoli/Gorlu%20la%20stampante/Gorlu.png" a="Gorlu la stampante"></cMedia>

## L'idea iniziale

Una sera di Ottobre, vedendo la scatola di Arduino sulla mensola, mi è venuta voglia di creare qualcosa di più complesso del solito "led on/off". Ho quindi pensato di costruire una piccola **stampante “CNC” (Computerized Numerical Control)** che fosse in grado di stampare:
* Foto digitali, rilevandone le linee principali; 
* Oggetti grafici disegnati precedentemente a mano libera; 
* Testo o singole parole, scegliendone lo stile di stampa.

## L’impostazione del progetto

Per semplicità, ho deciso di basare l'intero progetto su **Python per quanto riguarda l'elaborazione delle immagini**, e sul **C++ per quanto riguarda il codice di Arduino**.

<cMedia type="img" s="https://i0.wp.com/www.insidevcode.eu/wp-content/uploads/2015/05/python-logo.png?ssl=1" c="Logo di Python 3.9" provider=""></cMedia>

Python presenta infatti una sintassi molto leggera rispetto ad altri linguaggi (Java per esempio), e le innumerevoli librerie già presenti online sapevo ma avrebbero aiutato e velocizzato nella scrittura del codice. In particolar modo, ho adoperato:

* [OpenCV + PIL](https://opencv.org/) per l'elaborazione e l'estrapolazione dei dati dalle immagini; 
* [NumPy](https://numpy.org/) per la manipolazione di array e matrici; 
* [pySerial](https://pythonhosted.org/pyserial/) per la comunicazione tramite porta USB con Arduino; 
* [Tkinter](https://tkdocs.com/) per la creazione dell'interfaccia grafica dell'applicazione (GUI).

## L'algoritmo

L'algoritmo principale, ovvero quello che si occupa della stampa di immagini digitali, è sostanzialmente un algoritmo di ricerca e ordinamento.

Data un'immagine in input, il programma esegue una ricerca dei pixel che compongono i tratti principali dell'immagine utilizzando la **funzione [Canny()](https://docs.opencv.org/3.4/da/d22/tutorial_py_canny.html) presente in OpenCV**.

<cMedia type="img" s="https://www.mathworks.com/matlabcentral/mlc-downloads/downloads/submissions/51124/versions/1/screenshot.jpg" c="Un esempio di immagine elaborata con la funzione Canny()" provider=""></cMedia>

Dopo aver mappato i dati all'interno di una matrice bidimensionale, ne viene eseguita la scansione con la logica di andare a stampare non singoli punti (rischiando così di avere problemi con l'inchiostro della penna), ma linee continue. **Preso un elemento A, l'algoritmo ne analizza i pixel in posizioni limitrofe in cerca di un elemento B da stampare. In caso di successo ne invia le coordinate ad Arduino, altrimenti allarga il campo di ricerca sempre centranto in A fino a che non viene identificato un elemento B**. Il programma poi cicla prendendo come punto di partenza le coordinate dell'elemento B appena individuato, e continua in maniera analoga fino a che tutta la matrice non è stata scansionata.

<cMedia type="img" s="/v1632851575/Articoli/Gorlu%20la%20stampante/Algoritmo_di_ricerca_1.png" c="Simulazione grafica dell'algoritmo di ricerca"></cMedia>
<cMedia type="img" s="/v1632851575/Articoli/Gorlu%20la%20stampante/Algoritmo_di_ricerca_2.png" c="Uno screen dell'algoritmo di ricerca"></cMedia>

Vista la semplicità dell'algoritmo e la sua bassa complessità computazionale, il programma risulta essere rapido e poco dispendioso di risorse. Inoltre, **lavorando sempre e solo all'interno della RAM**, non vi è mai la necessità di salvare dati sul disco fisso e questo permette di **lasciare il PC libero da superflui file di salvataggio**.

## La struttura

Meccanicamente la stampante è composta da 2 elementi primari:
* Due carrelli che permettono i movimenti della penna lungo assi cartesiani del foglio; 
* Il meccanismo per alzare o abbassare la penna rispetto al foglio.

In particolare, i due carrelli hanno come base le componenti di vecchi lettori di DVD. Quest'ultimi presentano al loro interno, un motorino primario che si occupa della rotazione ad alta velocità del DVD, e un motore secondario incaricato dello scorrimento del lettore ottico. Questo motore passo-passo è proprio colui che una volta modificato sostituendone l'unità ottica con una base in legno, permette alla stampante di muovere il foglio e la penna lungo i due assi X e Y.

<cMedia type="vid" s="https://res.cloudinary.com/bocchio/video/upload/v1632851317/Articoli/Gorlu%20la%20stampante/Movimento_carrelli.mp4" c="Scorrimento dei due carrelli"></cMedia>

Il meccanismo legato invece al movimento della penna lungo l'asse Z è invece leggermente più fine e delicato. Esso si compone di un servo-motore legato con un filo inestensibile alla mina della penna. Quando la penna deve essere alzata, il servo compie una rotazione di qualche grado, mandando in tensione il filo e tirando così verso l'alto la mina. Per ritornare con la mina sul foglio, il servo rilascia la tensione lungo il filo, e un elastico spinge verso il basso la mina.

<cMedia type="vid" s="https://res.cloudinary.com/bocchio/video/upload/v1632851576/Articoli/Gorlu%20la%20stampante/Movimento_penna.mp4" c="Il meccanismo per alzare e abbasare la penna"></cMedia>

In questo modo visto che l'elastico genera sempre la stessa forza sulla mina, la stampa avrà una distribuzione di inchiostro omogenea.

## Gorlu la stampante!

Ecco qualche video del progetto finito.
<cMedia type="frame" s="https://www.youtube.com/embed/qBS6WiSzQmI" c="Stampa di Pikachu"></cMedia>
P. S. Il nome "Gorlu" è nato nel pieno della sua costruzione. Non ha mai avuto un significato ben preciso, ma mi sembrava simpatico e quindi perché no? :).

## Breve guida per realizzarlo da sé

Passiamo ora ad una brevissima guida per le persone interessate a realizzare anche loro questo progetto.

Partendo dalla lista dei materiali, serviranno:
* Una scheda Arduino e la scheda L293D; 
* Due vecchi lettori di DVD e un servo-motore; 
* Un alimentatore esterno che eroghi corrente continua tra i 5V e i 9V; 
* Sottili cavi elettrici; 
* Una tavola di legno; 
* Viti e bulloni
<cMedia type="img" s="/v1632851580/Articoli/Gorlu%20la%20stampante/Materiali.png" c="Componenti principali"></cMedia>

Lascio tra gli allegati in fondo alla pagina i link a cui poter comperare online le componenti elettroniche non facilmente reperibili nei negozi fisici.

Per quanto riguarda invece gli attrezzi necessari, serviranno comuni attrezzi per il taglio del legno (seghetti alternativi o simili), un avvitatore o trapano, e un saldatore a stagno.

Sempre tra gli allegati, è possibile trovare alcuni PDF utili per il taglio delle componenti in legno, e per eseguire correttamente il cablaggio delle componenti elettroniche.

Consiglio: visto la difficile reperibilità dei lettori DVD, **fare attenzione durante la saldatura dei cavi elettrici ai motori passo-passo**: è molto facile sbagliare ed essere costretti a buttare via il motore (e lo dico per esperienza personale... :( ).

Passando ora alla parte software, l'intero codice necessario per il corretto funzionamento è reperibile alla [pagina GitHub del progetto](https://github.com/Bocchio01/Arduino_CNC_plotter).

Per poterlo scaricare basterà **cliccare sul tasto verde "Code" e successivamente su "download ZIP"**. All'interno della cartella, troverete questi file:

<cMedia type="img" s="/v1632851575/Articoli/Gorlu%20la%20stampante/Cartella_GitHub.png" c="Files presenti nella repository del progetto"></cMedia>

Nella cartella "Arduino_code", potrete trovare lo sketch da caricare tramite l'IDE Arduino direttamente sulla scheda. Da notare che è necessario importare la libreria [AF_Motor.h](https://learn.adafruit.com/adafruit-motor-shield/library-install).

Per quanto riguarda poi l'algoritmo principale, è necessario scaricare ed installare sul proprio PC l'interprete di Python e le librerie aggiuntive. Python è facilmente [scaricabile da questo link](https://www.python.org/downloads/), mentre le librerie necessarie occorre installarle da terminale:

1. Aprire il terminale e navigare fino alla cartella "Scripts" contenuta nella directory di Python (con Windows digitare `cd C:\Users\*Nome_utente*\AppData\Local\Programs\Python\Python39\Scripts`);
2. Digitare quindi `pip install opencv-python pillow numpy pyserial tk`, e premere Invio
3. Una volta terminata l'installazione (in genere sono necessari pochi secondi), chiudere il terminale.

A questo punto è possibile aprire il file presente nella cartella scaricata denominato **main.py** e si è pronti ad utilizzare la propria stampante!

**Nota bene: la cartella sources e i files languages.py e main.py, devono sempre rimanere nella stessa cartella di lavoro!**
