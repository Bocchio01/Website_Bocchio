<template>
  <div class="Default">
    <cLoading v-if="$store.getters.show.loading" />
    <cHeader />
    <cSlogan />
    <Nuxt keep-alive />
    <lazy-cFooter />

    <lazy-cBackground />
    <lazy-cLogin />
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('beforeunload', () => {
      this.$store.dispatch('InteractionsUpdate')
    })
  }
}
</script>