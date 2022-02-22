<template>
  <CHeadBase v-if="portale" :title="portale.title" :description="portale.description" />
</template>

<script>
export default {
  data() {
    return {
      portale: {},
    }
  },

  async fetch() {
    const lang = this.$i18n.locale
    const slug = lang == this.$i18n.defaultLocale ? this.$route.fullPath.slice(7) : this.$route.fullPath.slice(10)
    this.portale = await this.$content(lang + '/portal', slug).fetch()
  },
}
</script>
