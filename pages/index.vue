<template>
  <div>
    <cWrap v-for="(data, index) in datas" :key="index" :obj="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [
        {
          path: '/mix/chi sono/',
          title: 'Chi sono?',
          paragraph: [
            'Ciao! Mi chiamo Tommaso e sono uno studente di ingegneria meccanica al Politecnico di Milano.',
            "Parallelamente agli studi universitari, sviluppo nel tempo libero la passione per l'informatica e la programmazione.",
            '<b>Ho sempre voglia di creare cose nuove, cimentarmi in nuove sfide e molte volte mi intestardisco finchè non riesco o non sono pienamente soddisfatto.</b>',
            'Infine credo fortemente nel contatto con la natura quale fonte di ispirazione, ed è probabilmente per questo che pratico Orienteering...',
          ],
          img: {
            src: '#Chi_sono',
            alt: 'Chi sono?',
          },
        },
        {
          path: '/articolo/',
          title: 'Contenuti del sito',
          paragraph: [
            'Il sito è strutturato su tre sezioni pricipali:',
            '<ul><li>Articoli: <b>tutti i progetti realizzati descritti in maniera approfondita</b></li><li>Portali (in costruzione..): <b>WebApp programmate per soddisfare esigenze specifiche di alcuni progetti</b></li><li>Forum: pensato <b>per favorire la discussione e lo scambio di idee.</b> Sarà presto integrato a fondo di ogni articolo</li></ul>',
            'In generale tutti gli articoli, i portali e il sito in sé sono da considerarsi di assoluto libero utilizzo.',
            '<b>La diffusione dei contenuti, delle idee o dei concetti che è possibile trovare tra queste pagine è assolutamente un atto positivo e da promuovere.</b>',
          ],
          img: {
            src: '#Contenuti',
            alt: 'I contenuti del sito',
          },
        },
        {
          path: '/mix/qual é lo scopo/',
          title: 'Qual é lo scopo?',
          paragraph: [
            "Questo sito nasce dall'esigenza di avere uno spazio completamente mio dove poter condividere con altri le mie idee e i miei progetti.",
            'Sono infatti convinto che i social media siano per certi versi restrittivi e costringano a troppe limitazioni.',
            '<b>Lo scopo è quindi sempre stato quello di creare uno spazio web che fosse al 100% personale</b> e da gestire in completa autonomia. Durante il suo sviluppo mi sono però reso conto del suo <b>enorme potenziale</b>, che andava ben oltre la semplice vetrina di articoli e post...',
          ],
          img: {
            src: '#Scopo',
            alt: 'Lo scopo del sito',
          },
        },
      ],
    }
  },
}
</script>
