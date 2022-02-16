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
    const meta = getSiteMeta({
      title: this.title,
      description: this.description || this.$i18n.t('seo.description'),
      url: this.$route.fullPath,
      type: this.type,
    })
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

    return {
      title: meta.title,
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [...meta.meta, ...i18nHead.meta],
      link: [...meta.link, ...i18nHead.link],
    }
  },
}
</script>
