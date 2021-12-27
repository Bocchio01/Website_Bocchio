<template>
  <div class="Default">
    <cHeader />
    <cSlogan />
    <Nuxt keep-alive/>
    <cFooter />

    <lazy-cBackground />
    <lazy-cLogin />
    <cLoading v-if="$store.getters.show.loading"/>
  </div>
</template>

<script>
  export default {
    created() {

      window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        // event.preventDefault();
        // Chrome requires returnValue to be set.
        // event.returnValue = '';
        this.$store.dispatch('InteractionsUpdate')
      });

    }
  }
</script>