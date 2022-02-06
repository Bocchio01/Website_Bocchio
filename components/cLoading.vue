<template>
  <div class="loading">
    <div class="logo"></div>
    <p>{{ $store.state.status || 'Caricamento...' }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('UserLogin')
    if (!localStorage.getItem('master')) this.$store.dispatch('InteractionsUpdate', this.$route.fullPath + '?loading=true')
    const loading = document.getElementsByClassName('loading')[0]
    const sloganHome = document.getElementsByClassName('sloganHome')[0]

    setTimeout(() => {
      loading.style.opacity = 0
      loading.style.top = '-100vh'
      sloganHome.style.animationName = 'login'
    }, 2500)
    setTimeout(() => (this.$store.commit('toggle_show', 'loading'), (sloganHome.style.animationName = 'none')), 7000)
  },
}
</script>

<style lang="scss">
div.loading {
  z-index: 1100;
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
  font-family: var(--Font_Special);
  font-size: var(--Size_Title);
  text-align: center;
  transition: all 1000ms ease-in;
  > .logo {
    transition: all 1s 0.5s ease-in;
    width: 500px;
    height: 500px;
    cursor: unset;
    margin-bottom: 10px;
  }
}

@media (max-width: 550px) {
  div.loading > .logo {
    width: 300px;
    height: 300px;
    max-width: 80vw;
  }
}
</style>
