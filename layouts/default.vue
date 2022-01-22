<template>
  <div class="Default">
    <CLoading v-if="$store.getters.show.loading" />
    <CHeader />
    <CSlogan />
    <Nuxt keep-alive />
    <Lazy-CFooter />

    <Lazy-CBackground />
    <Lazy-CLogin />
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('beforeunload', () => {
      this.$store.dispatch('InteractionsUpdate')
    })
  },
}
</script>
