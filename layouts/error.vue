<template>
  <div>
    <cWrap :obj="val" :msg="'Torna alla home'" />
  </div>
</template>

<script>
export default {
  props: ['error'],
  data() {
    return {
      val: {
        path: '/',
        title: 'Errore ' + this.error.statusCode,
        paragraph: [
          'Pensiamo che qualcosa sia andato storto.',
          'Se pensi possa essere un problema del sito, faccelo sapere tramite uno dei canali indicati a fondo pagina.'
        ],
        img: {
          src: '/v1633054972/Undefined.png',
          alt: 'Icona non trovato'
        }
      }
    }
  }
}
</script>