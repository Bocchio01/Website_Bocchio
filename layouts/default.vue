<template>
  <div class="Default">
    <div id="upper_wrap">
      <cHeader @toParent="handler" />
      <cSlogan />
      <Nuxt />
    </div>
    <cFooter />

    <lazy-cBackground />
    <lazy-cLogin :showLogin="toggle_login" @toParent="handler"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle_login: false,
    }
  },
  methods: {
    handler(value) {
      this.toggle_login = value
    },
  },
  mounted() {
    if (localStorage.main_color) document.documentElement.style.setProperty('--main_color', localStorage.main_color)
    if (localStorage.font) document.documentElement.style.setProperty('--add_size', localStorage.font + 'px')
  }
}
</script>

<style lang="scss">
.Defalut {
  display: flex;
  flex-direction: column;
}
</style>