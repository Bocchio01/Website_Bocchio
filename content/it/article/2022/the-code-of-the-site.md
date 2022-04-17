---
published: false

title: Il codice del sito
description: Tutta l'evoluzione tecnica che questo sito ha avuto durante la sua costruzione e le quindi le tecnologie che alla fine ho scelto di usare.
paragraph: ["Tutta l'evoluzione tecnica che questo sito ha avuto durante la sua costruzione e le quindi le tecnologie che alla fine ho scelto di usare.",
"Sapete dove vengono salvati i dati relativi agli utenti del sito? Nell'articolo questo e molto altro"]
img:
  src: /v1647994993/Articoli/Il%20codice%20del%20sito/Nuxt_MySQL_logo_2.png
  alt: Il codice del sito
tag: [Programmazione]

createdAt: 2022-03-25T23:48:00Z
updatedAt: 2022-03-25T23:48:00Z
---

# Il codice del sito

<CMedia :s="img.src" :a="img.src"></CMedia>

## Le conoscenze di partenza

_Perchè quando mi metto in testa qualcosa, non importa quanto complicata o sofisticata che sia, caschi il mondo ma prima o poi la ottengo._
_Perchè in fondo, chi va piano va sano e va lontano._

Questo sito è frutto di una serie di sperimentazioni e tentativi (e ripetuti fallimenti) che mi hanno portato da una conoscenza decisamente limitata di HTML e CSS, ad avere una visione molto più completa delle architetture Web, dei Framework, nonchè della manipolazione di dati server/client. Sicuramente però posso affermare che il salto più grande sia stato il passaggio dall'utilizzo di linguaggi _"vaniglia"_, all'uso di tecnologie più strutturate quali i framework JavaScript che costituiscono attualmente la vera e propria struttura del sito. Ma andiamo con calma.

## Primi esperimenti

I primi test risalgono ad Aprile 2021. Avevo già in mente circa la struttura e l'impostazione che volevo dare al progetto, ma ancora non sapevo come realizzare sotto forma di codice le idee che avevo in testa. Il risultato di quelli esperimenti è il sito visitabile (se non l'ho eliminato) a questo link. A prima vista può sembrare una copia semi-identica di questa versione attuale, ma le tecnoligie utilizzte differiscono di non poco. Se volete dare un occhiata al codice è reperibile qui. Volendo allora riassumere le conoscenze/capacità apprese:

- Maggior conoscenza di HTML, CSS e SVG;
- Primo approccio a JavaScript e relaive librerie quali JQuery;
- Chiamate AJAX tra client e server;
- Struttura basilare di database e linguaggio PHP.

Contro dell'approccio adottato per la stesura del codice:

- Bassa, se non nulla, manutentinilità del codice;
- Impossibilià nello sviluppare modulularmente il sito;
- Complessità nell'aggiunta di contenuti (scrittura di vero e proprio HTML per ogni singolo articolo).

Avevo ormai compreso che più scrivevo codice, e più moi stavo infilando in un vicolo cieco, costringendomi cosi ad impazzire per ogni successiva modifca che avessi voluto implementare.

Decisi allora di cambiare radicalmente approccio e affidarmi ad una struttura "preconfezionata" ma ugualmente personalizzabile che mi aiutasse nell'organizzare in maniera più ottimizzata i file ed in generale che mi permettesse di sistemare una volta per tutte la struttura per poi avere il focus al 100% sui contenuti, ma al tempo stesso mi agevolasse nel caso di cambiamenti o aggiunte in corsa.

## L'approccio a Vue e NuxtJS

Su suggerimento di un amico, nel settembre 2021 incominciai a valutare il miglior framework da utilizzare in base alle mie esigenze e la scelta ricadde quasi istantaneamente su VueJs, data la sua flessibilità unita alla sua semplicità d'utilizzo. Dopo circa 2 settimane di studio e primi test, incominciai a ri-sviluppare il mio sito avendo in mente di fare praticamente una copia della versione.

## Moduli principali

## L'organizazzione della repository

## Il database

## I barbatrucchi nascosti

<!--
  Nulle.

  <CMedia s="http://localhost/BWS/site/analytics.php?anni=1&id_pagina=9&tipo_pagina=&lingua=&anno_partenza=&submit=Genera" c="Bocchio's Analitics" type="iframe"></CMedia>

  <CMedia s="https://open.spotify.com/embed/playlist/1NVMtezq5vWtoDhG9fnZhx?utm_source=generator&theme=0" c="Spotify playlist" type="iframe"></CMedia>
-->
