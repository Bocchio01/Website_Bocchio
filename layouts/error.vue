<template>
  <main>
    <div id="upper_wrap">
      <cHeader />
      <cSlogan :sloganMsg="'Errore ' + error.statusCode" />
      <cWrap :obj="val" :msg="'Torna alla home'" />
    </div>
    <cFooter />

    <cBackground />
  </main>
</template>

<script>
export default {
  layout: 'blank',
  props: ['error'],
  data() {
    return {
      val: {
        path: '/Home',
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
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: '/css/base_element.css' },
        { rel: 'stylesheet', href: '/css/media.css' },
        { rel: 'stylesheet', href: '/css/wrap.css' },
      ],
    }
  },
}
</script>