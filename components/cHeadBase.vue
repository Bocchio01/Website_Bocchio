<template>
  <span v-if="false" />
</template>

<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/

export default {
  props: {
    title: {
      type: String,
      default: "Bocchio's WebSite - Sito personale di Tommaso Bocchietti",
    },
    description: {
      type: String,
      default: 'Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione alla fisica.',
    },
    type: {
      type: String,
      default: 'website',
    },
  },

  head() {
    const meta = {
      title: this.title,
      description: this.description,
      url: this.$route.fullPath,
      type: this.type,
    }
    return getSiteMeta(meta)
  },
}
</script>
