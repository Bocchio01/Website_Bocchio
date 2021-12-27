<template>
  <div class="loading">
    <div class="logo"></div>
    <p>{{ $store.state.status }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('UserLogin')
    this.$store.dispatch('InteractionsUpdate')
    this.$store.dispatch('GetAllFile')
    setTimeout(() => {
      const el = document.getElementsByClassName('loading')[0]
      el.style.opacity = 0
      el.style.top = '-100vh'
    }, 2500)
    setTimeout(() => this.$store.commit('toggle_show', 'loading'), 5000)
  },
}
</script>

<style lang="scss">
div.loading {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-family: var(--Special_font);
  font-size: var(--title_size);
  text-align: center;
  transition: all 1000ms ease-in;
  > .logo {
    transition: all 1s 0.5s ease-in;
    width: 600px;
    height: 600px;
    cursor: unset;
  }
}

// @media (max-width: 550px) {
//   div.loading.logo {
//     width: 300px;
//     height: 300px;
//   }
// }
</style>
