---
published: false

title: Il codice del sito
description: "Tutta l'evoluzione che questo sito ha avuto durante la sua costruzione: gli esperimenti, le scelte fatte e quindi le tecnologie attualmente adoperate."
paragraph: ["Un misto tra story telling e tecnicismi del codice di questo sito e del suo database.",
"A partire dai primi esperimenti con HTML e CSS vaniglia, fino alla scoperta dei FrameworkJS e delle loro potenzialità.",
"Tocco finale dato dai barbatrucchi nascosti dietro le quinte :)"]
img:
  src: /v1647994993/Articoli/Il%20codice%20del%20sito/Nuxt_MySQL_logo_2.png
  alt: Il codice del sito
tag: [Programmazione]

createdAt: 2022-03-25T23:48:00Z
updatedAt: 2022-05-06T23:48:00Z
---

# La costruzione del sito

<CMedia :s="img.src" :a="img.src"></CMedia>

## Le conoscenze di partenza

Questo sito è stato fin da subito per me un grande laboratorio online dove poter sperimentare e testare molti dei linguaggi, delle tecniche e delle problematiche che riguardano lo sviluppo web moderno.

Riassumento brevemente si può dire che, grazie al continuo sviluppo e alla mia incessante voglia di migliorare, sono passato dall'avere una conoscenza decisamente limitata di HTML e CSS, ad avere una visione molto più completa delle architetture Web, dei Framework, nonchè della manipolazione di dati server/client.

Il salto più grande è stato sicuramente il passaggio dall'utilizzo di linguaggi _"vaniglia"_, all'uso di tecnologie più strutturate quali i framework JavaScript che per altro costituiscono attualmente lo scheletro portante del sito.

## Primi esperimenti

### Marzo 2021

I primi esperimenti avevano il semplice scopo di fare un po' una rispolverata generale delle poche nozioni che avevo appreso a scuola. Per questo creai delle semplici pagine statiche con puro HTML e CSS così da ripassare i principali _<\tag>_ e gli attributi di stile, nonchè la corretta struttura da dare al DOM (Document Object Model).

```html
<html>
  <head>
    <style>
      h1 {
        text-align: center;
        background-color: orange;
        padding: 0.3em;
      }
      p.logo > a:hover {
        color: green;
        font-size: larger;
      }
    </style>
    <title>Example page</title>
  </head>

  <body>
    <h1>Tommaso's Test</h1>
    <p class="logo">
      <a href="/">Go to the home page!</a>
    </p>
  </body>
</html>
```

### Aprile 2021

Incominciai allora a cercare di creare quello che sarebbe già potuto essere il template del sito finale, nonostante non avessi ancora minimamente definito la tipologia di contenuti che avrei voluto inserire o l'impostazione grafica da seguire.
Ovviamente fino a questo punto ho sempre cercato per quanto possibile di limitarmi a cose semplici ma di costruirle senza l'aiuto di librerie esterne quali JQuery o simili, utilizzando quindi semplice _JavaScript vanilla_. Questo fu quindi il primo approccio a JS, visto che fino a quel momento non avevo mai avuto modo di adoperarlo.
Incominciai poi ad implementare anche qualche semplice funzionalità di database. Fortunatamente, l'hosting dove caricavo questi esperimenti mi offriva la possibilità di sviluppare con il linguaggio PHP, essendo un server Apache. Provai allora ad implementare un semplicissimo forum e ad aggiungere qualche articolo di prova.

### Giugno 2021

Dopo ormai 2 mesi di test, ero riuscito ad ottenere un sito che se all'apparenza sembrava potesse funzionare "decentemente", in realtà non mi soddisfaceva per niente dal lato del codice. Provai allora a sostituire il semplice JS vanilla, con le potenzialità di JQuery che infatti portò un leggero miglioramento nella facilità di gestione delle pagine e dei contenuti in generale.
Oltre a questa piccola nota positiva, il resto del codice riportava delle profonde criticità dovute principalmente alla mia inesperienza con questo tipo di programmazione e al susseguirsi di numerevoli micro correzioni a causa di un progetto poco definito già in partenza.
Ma sapevo che questa era ancora semplicemente una fase di puro testing e che il risultato finale era ancora ben lontano.

La prima bozza del sito, risultato degli esperimenti fino a quel momento effettuati, è ancora online e [visibile al seguente link](https://bocchio.altervista.org/) così come [la sua repository](https://github.com/Bocchio01/Personal_web_site).

<CMedia s="/v1655593847/Articoli/Il%20codice%20del%20sito/Gif_old_site.gif" c="Pagina di benvenuto del vecchio sito"></CMedia>

Volendo allora riassumere le principali criticità/limitazioni riscontrate:

- Impossibilità nello sviluppare modularmente il sito;
- Processo macchinoso per la creazione di nuovi contenuti;
- Utilizzo spropositato di HTML, CSS, e JS, in relazione anche alla bassa complessità del sito.

Decisi allora di ripartire completamente da zero, avendo però ora in mente in maniera più delineata la direzione da seguire sia in quanto a stile grafico che in quanto a scopo finale da dare all'intero progetto.

## L'approccio a Vue e NuxtJS

### Settembre 2021

Passata l'estate, incominciai a valutare seriamente l'utilizzo di un FrameworkJS (a me sconosciuti fino a quel momento).
Scelsi quasi in automatico di provare VueJS visto che anche senza conoscerlo riuscivo a muovermi facilmente all'interno di progetti e repository fornite d'esempio. La sua semplicità si è rilevata strabiliante anche più avanti nel progetto. Dopo circa 1 mese di sperimentazione su progettini minori, addocchiai NuxtJS che veniva consigliato proprio per la creazione di siti web. Appena scaricato capiì che era il framework più adatto alle mie esigenze ed iniziai così a risviluppare da zero il mio sito web.

<!-- <CMedia s="/v1655594577/Articoli/Il%20codice%20del%20sito/Nuxt_logo.png" c="Logo del web-framework Nuxt"></CMedia> -->

### Ottobre 2021

Visto che della parte grafica ero abbastanza soddisfatto già dalla prima versione, decisi di trasferire tale e quale lo stile, ristrutturandolo però ora in file SCSS. Questo semplice cambio di approccio portò ad eliminare molto dello stile ridondante e ad ottimizzarne le sue possibili modifiche successive. Presi poi vantaggio delle comodità offerte dal framework, per concentrarmi maggiormente sulla creazione e gestione dei contenuti, adoperando il modulo aggiuntivo di [NuxtContent](https://content.nuxtjs.org/).

### Dicembre 2021

Avendo quindi ricreato tutte le funzionalità precedentemente integrate nella prima versione del sito, iniziai ora a sperimentare nuovamente aggiungendo un vero e proprio database. Avendo già delle conoscenze di PHP, scelsi appunto di creare un database MySQL, sfruttando l'hosting gratuito fornito da altervista. In poco tempo quindi scrissi la logica e le tabelle necessarie a gestire l'autenticazione e l'analytics per ogni pagina.

### Gennaio 2022

Incominciai ad uplodare con costanza dopo ogni sessione di scrittura, il codice e i file aggiornati sull'host di Netilfy. Ad un certo punto, controllando che funzionasse sempre tutto, mi accordi che al refresh di ogni articolo, il sito si rompeva e nella console appariva un errore che sembrava legato al core vero e proprio del modulo di NuxtContent. Dopo giorni passati a cercare informazioni utili online su come cercare di risolvere, e consapevole che l'errore si presentava solamente nella versione pubblicata online e mai in sulla versione locale, incominciai più o meno ad impazzire. Era un bug abbastanza fastidioso visto che bloccava l'intero sito e non ne permetteva quindi l'accesso.
Incominciai allora a provare più o meno di tutto, fino a quando non rinominai uno dei file degli articoli da "gorlu la stampante.md" a "gorlu-la-stampante.md". Il bug sparì, e si, l'unico errore che stavo facendo era quello di lasciare spazi vuoti nei nomi dei file... bhe non ero troppo contento dopo averlo scoperto.

Risolto quindi il fatidico bug, pensai che non sarebbe stato male avere il sito multilingua e così, sfruttando il modulo di i18n, creai manualmente la traduzione di ogni pagina.

### Febbrario 2022

Ormai soddisfatto del progetto, decisi di non apportare ulteriori modifiche e incominciai a testare bene ogni funzionalità creata e quindi lanciarlo online.

### Maggio 2022

Dopo mesi di attesa per questioni varie, comprai finalmente il nome di dominio! Bocchio.dev era ufficialmente online ed operativo.

## Moduli principali

Tra i moduli principali del sito ci sono:

- NuxtContent: si occupa di ordinare, elencare e quindi reperire quando richiesti i contenuti presenti sul sito. Tutte le pagine delle sezioni "articoli" e "mix", sono infatti semplici file di markdown (.md) che vengono di volta in volta interpretati, trasformati in file javascript object notation (.json), ed impiantati poi dentro al DOM. Questo modulo è quindi di fondamentale importanza vista la funzionalità di content-delivery interno che svolge.

- NuxtImage: si occupa di ottimizzare il caricamento dei file multimediali dal provider esterno. Ogni file multimediale (immagine o video breve) è infatti caricato sulla piattaforma estrena di Cloudinary. Il modulo prende quindi in carico la richiesta e la ottimizza in base alla dimensione dello schermo del dispositivo. Tutto ciò viene operativamente svolto dal modulo andando ad applicare dei parameteri nell'url di chiamata alla risorsa, di modo che il provider restituisca il file ridimensionato e nel formato migliore per il web (.webp).

- Nuxti18n: modulo appositamente creato per la traduzione multilingua. Si occupa di caricare correttamente tutto il contenuto stastico dall'apposito file "lang.json" in base alla lingua selezionata. Gestisce inoltre il corretto reindirizzamento dei link interni.

- NuxtPWA: crea un file di ServiceWorker e offre quindi la possibilità di installare come una vera app il sito sia su mobile che su desktop. Inoltre, ottimizza al meglio l'uso della memoria cache portando così performance all'intero progetto.

## L'organizazzione della repository

La repository è fortemente influenzata, per quanto riguarda l'organizzazione dei file, dalla struttura che impone il framework di NuxtJS. Ogni cartella ha un nome ed uno scopo ben preciso. Inoltre avendo scelto di affidarmi ad un framework che adopera la logica delle pagine "a componenti", tra i file di codice è possibile distinguere

Di seguito solo le principali:

- Pages: contiene i file con le strutture portanti per le varie tipologie di pagina. Vi è quindi un file con la struttura della Home, una con la strutture delle pagine di index come Articoli o Portali, e una con la struttura delle pagine di articolo vero e proprio. Ogni file dunque non contiene propriamente il codice html che compone la pagina, ma solo i nomi dei tag dei componenti che devono essere inseriti

la struttura delle pagine presenti sul sito, ovvero la struttura di pagine statiche come la Home, o dinamiche come gli index degli articoli/portali;

- Components: per come struttari ed ideati i framework, essi funzionano con una struttura scomponibile a blocchi, ovvero i componenti. Ogni pagina è infatti l'unione di più componenti ripetuti e caricato con un diverso contenuto. _Ogni componente è quindi un elemento che viene inserito nelle pagine con un contenuto diverso ma di struttura simile._

- Content: file .md che vengono poi presi in considerazione dal modulo di NuxtContent

- Static, Assets: contengono tutti i file statici, quali i file CSS o le immagini .SVG, o ancora i file Javascript che vengono utilizzati dai portali del sito.

Al di fuori di queste cartelle, si trovano i file di configurazione utilizzati in particolare da Nuxt stesso per settare alcuni parametri di funzionamento e puntare correttamente alle varie librerie di Node.

## Il database

Ovviamente, giusto per non farmi mancare nulla, ho pensato sarebbe stato comodo e giusto avere un vero e prorpio database dietro le quinte del sito. Il suo scopo principale era inizialmente solo quello di gestire i dati legti agli utenti del sito, e quindi avere la possibilità di salvare nome utente, mail, password ecc.., ma con il passare del tempo e visto il divertimento che mi portava, il progetto si ampliò.
Incominciai così a creare tutta una parte di analitycs e struttare quindi una serie di tabelle per il salvataggio del numero di visite per ciascuna pagina, il trend per ogni mese e molto altro.
Successivamente creai un vero e proprio secondo sito, da cui poter visualizzare con comodità i dati salvati grazie all'uso di grafici e tabelle.
Tutto quanto descritto sopra, è scritto con il linguaggio PHP e con l'uso di un semplice database MySQL, visto che queste erano le uniche scelte che l'host del secondo sito (altervista) offriva.

## I barbatrucchi nascosti

Tra quelli che a me piace definire come barbatrucchi, ovvero delle piccole ma efficaci funzionalità che lavorano nel dietro le quinte del sito principale, c'è sicuramente lo script relativo alle cosidette "OG image" o immagini OpenGraph. Quando infatti si prova a condividere un link del sito tramite un qualsiasi social o semplicemente per messaggio WhatsApp, appa quasi immediatamente un'immagine con il logo del sito e il titolo della pagina condivisa sotto. Ovviamente quella è un immagine che viene generata di volta in volta in maniera totalemente automatizzata, sfruttando quelle che vengo chiamate "serveless function" o "funzionalità senza server". Queste sono infatti dei piccoli pezzi di codice che è possibile eseguire online senza dover necessariamente adoperare un server proprio in quanto vengono immediatamente rigirate ai server di Amazon che le eseguono e danno in output il risultato. Ogni volta che si condivide quini una pagina del sito, viene fatta la richista e questa funzione appositamente scritta che è in grado di generare l'immagine per come pensata da me e con il titolo corretto

<!--
	- Analytics;
	- Traduzione Forum automatica.
-->
