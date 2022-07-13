---
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

# Il codice del sito

<CMedia :s="img.src" :a="img.src"></CMedia>

## Le conoscenze di partenza

Questo sito è stato fin da subito per me un grande laboratorio online dove poter sperimentare e testare molti dei linguaggi, delle tecniche e delle problematiche che riguardano lo sviluppo web moderno.

Riassumendo brevemente si può dire che, grazie al continuo sviluppo e alla mia incessante voglia di migliorare, sono passato dall'avere una conoscenza decisamente limitata di HTML e CSS, ad avere una visione molto più completa delle architetture Web, dei Framework, nonché della manipolazione di dati server/client.

**Il salto più grande è stato sicuramente il passaggio dall'utilizzo di linguaggi _"vaniglia"_, all'uso di tecnologie più strutturate quali i framework JavaScript che per altro costituiscono attualmente lo scheletro portante del sito.**

## Primi esperimenti

### Marzo 2021

I primi esperimenti avevano il semplice scopo di fare un po' una rispolverata generale delle poche nozioni che avevo appreso a scuola. Per questo creai delle semplici pagine statiche con puro HTML e CSS così da ripassare i principali _<\tag>_ e gli attributi di stile, nonché la corretta struttura da dare al DOM (Document Object Model).

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
Oltre a questa piccola nota positiva, **il resto del codice riportava delle profonde criticità dovute principalmente alla mia inesperienza con questo tipo di programmazione e al susseguirsi di innumerevoli micro correzioni a causa di un progetto poco definito già in partenza**.
Ma sapevo che questa era ancora semplicemente una fase di puro testing e che il risultato finale era ancora ben lontano.

La prima bozza del sito, risultato degli esperimenti fino a quel momento effettuati, è ancora online e [visibile al seguente link](https://bocchio.altervista.org/) così come [la sua repository](https://github.com/Bocchio01/Personal_web_site).

<CMedia s="/v1655593847/Articoli/Il%20codice%20del%20sito/Gif_old_site.gif" c="Pagina di benvenuto del vecchio sito"></CMedia>

Volendo allora riassumere le principali criticità/limitazioni riscontrate:

- Impossibilità nello sviluppare in maniera modulare il sito;
- Processo macchinoso per la creazione di nuovi contenuti;
- Utilizzo spropositato di HTML, CSS, e JS, in relazione anche alla bassa complessità del sito.

**Decisi allora di ripartire completamente da zero, avendo però ora in mente in maniera più delineata la direzione da seguire sia in quanto a stile grafico che in quanto a scopo finale da dare all'intero progetto.**

## L'approccio a Vue e NuxtJS

### Settembre 2021

Passata l'estate, incominciai a valutare seriamente l'utilizzo di un FrameworkJS (a me sconosciuti fino a quel momento).
Scelsi quasi in automatico di provare [VueJS](https://vuejs.org/) visto che anche senza conoscerlo riuscivo a muovermi facilmente all'interno di progetti e repository fornite d'esempio. La sua semplicità si è rilevata strabiliante anche più avanti nel progetto. Dopo circa 1 mese di sperimentazione su progetti minori, adocchiai [NuxtJS](https://v3.nuxtjs.org/) che veniva consigliato proprio per la creazione di siti web. Appena scaricato capii che era il framework più adatto alle mie esigenze ed **iniziai così a ri-sviluppare da zero il mio sito web**.

<CMedia s="https://www.youtube.com/embed/nhBVL41-_Cw" c="Panoramica del Framework Vue" type="iframe"></CMedia>

### Ottobre 2021

Visto che della parte grafica ero abbastanza soddisfatto già dalla prima versione, decisi di trasferire tale e quale lo stile, ristrutturandolo però ora in file [SCSS](https://sass-lang.com/). Questo semplice cambio di approccio portò ad eliminare molto dello stile ridondante e ad ottimizzarne le sue possibili modifiche successive. Presi poi vantaggio delle comodità offerte dal framework, per **concentrarmi maggiormente sulla creazione e gestione dei contenuti, adoperando il modulo aggiuntivo di NuxtContent**.

### Dicembre 2021

Avendo quindi ricreato tutte le funzionalità precedentemente integrate nella prima versione del sito, iniziai ora a sperimentare nuovamente aggiungendo [un vero e proprio database](#il-database). Avendo già delle conoscenze di PHP, scelsi appunto di creare un database MySQL, sfruttando l'hosting gratuito fornito da AlterVista. In poco tempo quindi **scrissi la logica e le tabelle necessarie a gestire l'autenticazione e l'analytics per ogni pagina**.

### Gennaio 2022

Incominciai ad uplodare con costanza dopo ogni sessione di scrittura, il codice e i file aggiornati sull'[host di Netlify](https://www.netlify.com/). Ad un certo punto, controllando che funzionasse sempre tutto, mi accorsi che al refresh di ogni articolo, il sito si rompeva e nella console appariva un errore che sembrava legato al core vero e proprio del modulo di NuxtContent. Dopo giorni passati a cercare informazioni utili online su come cercare di risolvere, e consapevole che l'errore si presentava solamente nella versione pubblicata online e mai sulla versione locale, incominciai più o meno ad impazzire. Era un bug abbastanza fastidioso visto che bloccava l'intero sito e non ne permetteva l'accesso.
Incominciai allora a provare più o meno di tutto, fino a quando non rinominai uno dei file degli articoli da "gorlu la stampante.md" a "gorlu-la-stampante.md". Il bug sparì... meglio che non commento 😡.

Risolto quindi il fatidico bug, **pensai che non sarebbe stato male avere il sito multilingua** e così, sfruttando il modulo di i18n, creai manualmente la traduzione di ogni pagina.

### Febbrario 2022

Ormai soddisfatto del progetto, decisi di non apportare ulteriori modifiche e incominciai a testare bene ogni funzionalità creata per poi quindi lanciarlo online.

### Maggio 2022

Dopo mesi di attesa per questioni varie, comprai finalmente il nome di dominio! **Bocchio.dev era ufficialmente online ed operativo**.

<CMedia s="/v1657554206/Articoli/Il%20codice%20del%20sito/FuochiArtificioBocchio.png" c="Accurata rappresetazione del mio stato d'animo :)"></CMedia>

## Moduli principali

Ovviamente **niente di tutta questa struttura sarebbe stata possibile senza l'utilizzo di risorse esterne create da altri sviluppatori**. Quelle che nel campo della programmazione in C venivano chiamate librerie, nell'ambito dello sviluppo Web prendono il nome di moduli, e tra i principali utilizzati nel sito ci sono:

- [NuxtContent](https://content.nuxtjs.org/): si occupa di ordinare, elencare e quindi reperire quando richiesti i contenuti presenti sul sito. Tutte le pagine delle sezioni “articoli” e “mix” sono infatti semplici file di markdown (.md) che vengono di volta in volta interpretati, trasformati in file javascript object notation (.json), ed impiantati poi dentro al DOM. Questo modulo è quindi di fondamentale importanza vista la **funzionalità di content-delivery interno** che svolge.

- [NuxtImage](https://image.nuxtjs.org/): si occupa di **ottimizzare il caricamento dei file multimediali dal provider esterno**. Ogni file multimediale (immagine o video breve) è infatti caricato sulla piattaforma esterna di Cloudinary. Il modulo prende quindi in carico la richiesta e la ottimizza in base alla dimensione dello schermo del dispositivo. Tutto ciò viene operativamente svolto dal modulo andando ad applicare dei parametri nell'url di chiamata alla risorsa, di modo che il provider restituisca il file ridimensionato e nel formato migliore per il web (.webp).

- [Nuxti18n](https://i18n.nuxtjs.org/): modulo appositamente creato per la traduzione multilingua. Si occupa di caricare correttamente tutto il contenuto statico dall'apposito file "lang.json" in base alla lingua selezionata. Gestisce inoltre il corretto reindirizzamento dei link interni.

- [NuxtPWA](https://pwa.nuxtjs.org/): crea un file di ServiceWorker ed offre quindi la possibilità di installare come una vera app il sito sia su mobile che su desktop. Inoltre, ottimizza al meglio l'uso della memoria cache portando così performance all'intero progetto.

## L'organizzazione della repository

La repository è fortemente influenzata, per quanto riguarda l'organizzazione dei file, dalla struttura che impone NuxtJS. Ogni cartella ha un nome ed uno scopo ben preciso. Inoltre, avendo scelto di affidarmi ad un framework che adopera la logica delle _pagine a componenti_, tra il codice è possibile distinguere a grandi linee due categorie di file:

Nella prima categoria rientrano:

- I contenuti delle cartelle: _/assets - /static - /content - /i18n_
- Tutti i file presenti nella root della repository, ed in particolare il file: _nuxt.config.js_

Tra quelli sopra elencati è quindi possibile identificare file di configurazione (necessari per dichiarare i parametri di setup del framework in base alle proprie preferenze), file di stile (sia .scss che classico .css), nonché risorse statiche quali immagini o documenti. **Particolare attenzione va data alla cartella _/content_, che appunto contiene tutti i file .md relativi agli articoli e alle pagine di mix.** Come spiegato in precedenza infatti, il modulo NuxtContent attinge proprio da questa cartella per caricare il contenuto delle varie pagine. Anche questo articolo è in realtà un file salvato all'interno della cartella _/content_.

<CMedia s="/v1657558786/Articoli/Il%20codice%20del%20sito/Repository.png" c="Root del progetto"></CMedia>

Nella seconda categoria rientrano i contenuti delle cartelle: _/components - /pages_

La cartella _/components_ è di particolare importanza visto che costituisce l'essenza dello scheletro portante del progetto nonché racchiude in sé la logica e le motivazioni dietro l'utilizzo di un WebFramework. Per come strutturati ed ideati infatti, essi funzionano in maniera modulare e ogni pagina è scomponibile in blocchi primari, ovvero i componenti. **I componenti web sono blocchi di codice che racchiudono la struttura interna di elementi HTML, compresi CSS e JavaScript, e consentono di applicarne il codice relativo in una qualsiasi posizione all'interno della pagina web.** Ogni pagina è infatti l'unione di più componenti ripetuti ma caricati con un diverso contenuto. La struttura rimane quindi sempre la stessa (e da qui la modularità del progetto), ma il framework prende in carico il compito di iniettare di volta in volta il contenuto richiesto dallo specifico elemento.

## Il database

**Avendo in mente di attivare anche un forum**, avevo la necessità di conservare dati in maniera permanente e poterli reperire con facilità ed immediatezza. Nella prima versione del sito, avevo risolto questo problema andando a salvare i dati su dei file .json che venivano letti e scritti da uno script in PHP. Essendo infatti il sito, come detto in precedenza, hostato su un server Apache, avevo la possibilità di eseguire modifiche ai file direttamente dallo script. In questo modo però, nonostante il tutto fosse altamente automatizzato, risultava difficile avere una chiara visione dei contenuti dei forum essendo i post non su un unico file ma suddivisi nelle varie sottocartelle della repo.

<CMedia s="/v1657622148/Articoli/Il%20codice%20del%20sito/MySQL-Logo.jpg" c="Logo MySQL"></CMedia>

Ripartito da capo con l'intero progetto, decisi ora di risolvere il problema adoperando una via risolutiva più consona ed adatta. Incominciai così a giocare con i database, ed in particolare con quello che può essere considerato il primo passo da fare per esplorare questo campo, ovvero un DB MySQL. **Sempre l'host della prima versione del sito, offriva infatti il servizio di un semplice database relazionale facilmente compatibile con gli script PHP.**

### Funzionalità di base

Compresa allora l'impalcatura da voler dare al progetto di backend, iniziai strutturando una semplice tabella per la memorizzazione dei dati legati agli utenti tra cui _nickname - email - password_.

**Da qui il progetto si ampliò decisamente a causa del divertimento che provavo nella manipolazione dei dati e nell'approfondimento delle tecniche di interconnessione tra servizi online.** Nonostante considerassi il linguaggio PHP ormai antiquato, incominciai invece a comprenderne le potenzialità e decisi così di creare un vero e proprio server backend anche se non strettamente necessario ai fini del sito.

Impostato dunque il database per contenere i dati essenziali legati ai forum, aggiunsi poi le varie personalizzazioni di colori e font per gli utenti registrati. In questo modo sono riuscito ad approfondire ulteriormente la gestione dei dati nel browser, nonché l'uso dei Cookies o ancora dei token di autenticazione.

### Analytics

Successivamente, una volta costruita una buona base di partenza con un paio di funzioni di log utili in fase di debug e non solo, pensai di aggiungere un servizio esterno di analytics al sito per pura curiosità nel capirne meglio il funzionamento. Visti però i requisiti monetari / di hosting richiesti, **decisi di scrivere da zero un semplice applicativo che mi permettesse di tenere traccia dei dati essenziali relativi alle pagine presenti sul sito**.

Punto di partenza fondante di tutta l'architettura, è la completa distinzione dei dati raccolti in base alla lingua di visualizzazione. All'apertura di ogni pagina, viene inviata una richiesta dal browser all'host del database contenente l'url della pagina visualizzata. A questo punto uno script PHP prende in carico la richiesta e va ad aggiornare opportunamente i campi del DB.

I dati che vengono salvati sono quindi quelli relativi alle visite di ogni pagina suddivise in base alla lingua e al mese corrente. Sfruttando poi la libreria _PHPlot_ ho creato una semplice interfaccia che facilitasse la fruizione / analisi dei dati raccolti per mezzo di grafici autogenerati.

<CMedia s="/v1657670913/Articoli/Il%20codice%20del%20sito/Analytics_screen_2.png" a="Pagina di Analytics"></CMedia>

<a href="https://bocchioutils.altervista.org/BWS/site/analytics.php?l=en&stat=1" class="button" rel="nofollow noopener noreferrer" target="_blank">Visita la pagina di Analytics</a>

Quella nell'immagine è solo una piccola parte delle informazioni che l'applicativo raccoglie. É possibile visitare e consultare liberamente tali dati cliccando sul tasto qui sopra.

Ovviamente è una versione di analytics molto semplice rispetto a quelle utilizzate in ambito lavorativo ma, oltre ad essere stato molto diverte da implementare, svolge egregiamente il suo lavoro e soprattutto non salvando alcun dato legato all'utente, è sicuramente regolare rispetto a questioni legate alla privacy.

### Il sito backend

Ampliando la pagina di visualizzazione dei dati di analytics, creai un vero e proprio mini-sito con una pagina dove poter reperire facilmente ed in modo chiaro i dati dalle tabelle del DB, nonché un paio di pagine con relativi script per permettere agli utenti di gestire un possibile cambio o recupero delle credenziali.

Il sito di backend, o come soprannominato in seguito delle _utilità_, è visitabile a [questo link](https://bocchioutils.altervista.org/BWS/site/). Vista la possibilità di poter facilmente integrare script PHP con un database MySQL, è molto probabile che sempre su questo dominio affiancherò parte dei miei futuri progetti che richiederanno una parte di memorizzazione dei dati o semplicemente una elaborazione pesante eseguibile solo lato server.

## I barbatrucchi nascosti

Tra quelli che a me piace definire come _barbatrucchi_, ovvero delle **piccole ma efficaci funzionalità che lavorano nel dietro le quinte del sito principale**, c'è sicuramente lo script relativo alle cosidette _OG image_ o _immagini OpenGraph_. Quando infatti si prova a condividere un link del sito tramite un qualsiasi social o semplicemente per messaggio WhatsApp, appare quasi immediatamente un'immagine con il logo del sito e il titolo della pagina condivisa sotto.

Tale immagine viene generata di volta in volta in maniera totalmente automatizzata, sfruttando quelle che vengo chiamate _serveless function_ o _funzionalità senza server_. Queste sono infatti dei piccoli pezzi di codice che è possibile eseguire online senza dover necessariamente adoperare un server proprietario in quanto vengono immediatamente rigirate ai server di Amazon che le eseguono e danno in output il risultato. Ogni volta che si condivide quindi una link del sito, viene inviata una richiesta a questa funzione che **genera l'immagine con logo e titolo della pagina** come nell'esempio sotto.

<CMedia s="https://bocchio.dev/.netlify/functions/og-image?title=Barbatrucco!&theme=dark" c="Immagine generata ora dal server" provider=""></CMedia>
