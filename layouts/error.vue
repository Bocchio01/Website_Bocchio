<template>
  <div>
    <cSlogan :sloganMsg="'Errore ' + error.statusCode" />
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
        title: 'Cosa è successo?',
        paragraph: [
          'Pensiamo che qualcosa sia andato storto.',
          'Se pensi possa essere un problema del sito, faccelo sapere tramite uno dei canali indicati a fondo pagina.',
        ],
        img: {
          src: 'https://res.cloudinary.com/bocchio/image/upload/v1633054972/Undefined.png',
          alt: 'Icona non trovato',
        },
      },
    }
  },
}
</script>