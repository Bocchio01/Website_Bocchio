---
title: Attorno al globo
description: Il progetto Attorno al globo, ovvero uno script per il calcolo dell'azimut, delle distanze e molto altro tra due punti della superficie terrestre. Perché è nato, le sue funzionalità e la matematica che lo governa spiegata nel dettaglio.
paragraph:
  [
    "Uno script per il calcolo dell'azimut, delle distanze e molto altro, tra due punti della superfice terrestre.<br>",
    "Quando si dice che la matematica e l'informatica non sono poi così lontane...",
    "L'uso delle geometrie di Matlab assieme all'interattività messa a disposizione da GeoGebra ti aiuterà a comprendere con facilità l'algoritmo e la matematica usata.",
  ]
img:
  src: /v1636152274/Articoli/Around%20the%20globe/Around_the_globe_icon.jpg
  alt: Attorno al globo
tag: [Programmazione, Matematica]

portalurl: /it/portal/around_the_globe/

createdAt: 2021-08-21T15:55:00Z
updatedAt: 2022-02-25T22:36:00Z
---

# Attorno al globo

<CMedia :s="img.src" :a="img.src"></CMedia>

## Introduzione

Questo semplice script nasce da un'esigenza reale di un mio amico: un giorno mi disse di voler creare un palo di **crocevia con dei cartelli che indicassero le città più importanti nel mondo**. Aveva quindi la necessità di sapere l'azimut con il quale angolare i cartelli di modo che fossero direzionati correttamente. Nello scrivere il codice si sono poi aggiunte altre piccole funzioni che danno quel tocco di originalità all'algoritmo. Ma partiamo dalle basi.

## Le basi di partenza

Lo scopo principale era quello di ottenere a partire dalle coordinate geografiche di due punti, l'azimut tra di essi. [L'azimut](https://it.wikipedia.org/wiki/Azimut) è infatti l'angolo che si viene a formare tra la linea immaginaria che congiunge i due punti, e il meridiano passante per il punto iniziale.

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Azimut.jpg" c="Esempio di azimut tra due persone"></CMedia>

Utilizzando concetti base dal corso "Analisi e Geometria 2", è possibile visualizzare la superficie del [geoide terrestre](https://it.wikipedia.org/wiki/Geoide) attraverso un semplice sistema di 3 equazioni goniometriche. A partire da una qualsiasi coppia latitudine - longitudine, ovvero coordinate polari, sono facilmente ricavabili le coordinate cartesiane, ovvero la terna dei valori x-y-z, del punto considerato. **Sfruttando quindi le coordinate cartesiane è poi facile adoperare operazioni con vettori e piani**, essendo di fatto il sistema appena parametrizzato uno spazio euclideo formato dalla terna elemenatre dei versori I-J-K.

In particolare, per rappresentare al meglio il geoide terrestre, ho deciso di sfruttare l'ellissoide di Hayford, uno dei primi [ellissoidi di riferimento](https://it.wikipedia.org/wiki/Ellissoide_di_riferimento).

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Ellissoide_Matlab.png" c="L'ellissoide di Hayford rappresentato in Matlab"></CMedia>

## La matematica dietro l'algoritmo

Per il calcolo dell'azimut vengono sfruttati concetti base dal corso "Analisi e Geometria 1" applicati allo spazio tridimensionale. Sfruttando la parametrizzazione euclidea, sappiamo essere possibili sia il prodotto scalare che il prodotto vettoriale ed è quindi naturale risolvere il problema in questi termini.

Ricordando che il nostro obbiettivo è **l'angolo definito come 'NORD - Osservatore - Oggetto osservato'**, rappresentandone un esempio applicato ad una sfera 3D, si ottiene la situazione descritta nell'immagine sotto.

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Azimut_matlab.png" a="Azimut_matlab"></CMedia>

Ma allora osservando che le linee che collegano 'NORD - Osservatore' e 'Osservatore - Oggetto osservato', non sono altro che le intersezioni di due piani cartesiani con la sfera, allora appare chiaro che **l'azimut cercato è di fatto l'angolo formato tra questi due piani: il primo passante per i tre punti 'NORD - Osservatore - Centro della sfera', mentre il secondo passante per i tre punti 'Osservatore - Oggetto osservato - Centro della sfera'**.

Sapendo poi che ogni piano cartesiano è individuato tramire un vettore normale al piano stesso, e che l'angolo tra due vettori è ricavabile per via trigonometrica, allora l'azimut cercato ha valore:

<CMedia s="/v1635210809/Articoli/Around%20the%20globe/Formula_finale_azimut.png" c="p1, p2 sono i vettori normali ai due piani cartesiani"></CMedia>

Per avere una comprensione più chiara e gloabale del problema e della sua soluzione, è forse utile osservare il tutto in maniera più interattiva grazie all'uso di GeoGebra.

<CMedia type="iframe" s="https://www.geogebra.org/3d/snm5rqfd?embed" a="File di GeoGebra"></CMedia>

<a href="https://www.geogebra.org/3d/snm5rqfd" class="button" rel="nofollow noopener noreferrer" target="_blank">File online di GeoGebra</a>

## L'algoritmo

L'implementazione a livello di algoritmo di tutta la matematica spiegata sopra, avviene per mezzo di **JavaScript** e in particolare della libreria **Math.js**. La libreria offre infatti una vasta scelta di operatori e funzioni matematiche a partire dalle basilari di trigonometria fino ad operazioni con vettori e matrici e non solo.

Dopo aver salvato i dati di latitudine e longitudine in un array, ne esegue la conversione da gradi a radianti di modo da facilitare l'uso di funzioni trigonometriche essenziali per ricavare poi le coordinate cartesiane dei punti.

```javascript
  terna_cartesiana: function (polare) {
    /*
        Calcolo delle coordinate cartesiane di un punto a partire dalle due sue coordinate polari
        alfa => longitudine
        beta => latitudine
    */

    const alfa = polare[1]
    const beta = polare[0]

    var terna_cartesiane = [this.Req * sin(alfa) * sin(beta), this.Req * cos(alfa) * sin(beta), this.Rpo * cos(beta)]

    return terna_cartesiane
  }
```

<!-- <CMedia s="/v1635210809/Articoli/Around%20the%20globe/Algoritmo_coordinate_cartesiane.png" c="L'algoritmo per il cambio di parametrizzazione"></CMedia> -->

Successivamente l'algoritmo elabora i vettori normali ai due piani cartesiani necessari per il calcolo dell'azimut. Per fare ciò calcola, come sottrazione di coordinate dei tre punti di riferimento, due vettori che appartengono al piano e, con l'utilizzo del prodotto vettoriale su quest'ultimi, **calcola il vettore normale al piano cartesiano**. L'operazione viene poi ripetuta anche per il secondo piano cartesiano e **infine viene calcolato l'angolo formato tra i due vettori normali ai piani**, ottenendo così l'azimut ricercato.

```javascript
    vettore_piano_cartesiano: function (p1, p2, p3) {
    // Calcolo del vettore matematico (array) generatore del piano passante per i 3 punti di partenza

    var vettore = cross(subtract(p1, p2), subtract(p1, p3))
    var vettore = divide(vettore, norm(vettore))

    return vettore
  },

   angolo_vettori: function (vet_1, vet_2) {
    // Calcolo dell'angolo in gradi tra due vettori matematici

    var CosTheta = max(min(dot(vet_1, vet_2) / (norm(vet_1) * norm(vet_2)), 1), -1)
    var Theta = divide(re(acos(CosTheta)), pi / 180)

    return Theta
  }
```

<!-- <CMedia s="/v1635210809/Articoli/Around%20the%20globe/Algoritmo_vettore_piano.png" c="Vettore normale al piano - Calcolo dell'angolo tra vettori"></CMedia> -->

## Testalo e divertiti!

Il programmino è ovviamente online e di libero utilizzo. Contiene come detto nell'introduzione molte altre funzioni divertenti ed interessanti come il calcolo delle distanze o altro ancora.<br> Se vuoi dare uno sguardo al codice lo trovi su GitHub a questo [link](https://gist.github.com/Bocchio01/78001e29f59d98b7b22bfadb905f7175), altrimenti se vuoi direttamente provare il programma naviga nella sezione:

<nuxt-link :to="portalurl" class="button">Portale > Attorno_al_globo</nuxt-link>

**Non ti sei mai chiesto con quale inclinazione scavare un tunnel fino a Tokyo?** E per quanto dovresti scavare? Il programma ha tutte le risposte alle tue domande! Buon utilizzo!
