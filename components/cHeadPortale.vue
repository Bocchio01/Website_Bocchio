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
    let slug = lang == this.$i18n.defaultLocale ? this.$route.fullPath.slice(7) : this.$route.fullPath.slice(10)
    if (slug.charAt(slug.length - 1) === '/') {
      slug = slug.substring(0, slug.length - 1);
    }
    this.portale = await this.$content(lang + '/portal', slug).fetch()
  },
}
</script>
