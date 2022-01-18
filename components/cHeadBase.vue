<template>
  <span v-if="false" />
</template>

<script>
import getSiteMeta from '@/assets/js/getSiteMeta.js'

// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/

export default {
  props: {
    title: { type: String },
    description: { type: String },
    type: { type: String },
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
