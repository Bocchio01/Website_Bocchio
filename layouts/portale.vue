<template>
  <div class="Portale">
    <cLoading v-if="$store.getters.show.loading" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  created() {
    window.addEventListener('beforeunload', () => {
      this.$store.dispatch('InteractionsUpdate')
    })
  },
}
</script>