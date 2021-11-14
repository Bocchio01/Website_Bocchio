<template>
  <div class="Portale">
    <Nuxt />
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.main_color) document.documentElement.style.setProperty('--main_color', localStorage.main_color)
    if (localStorage.font) document.documentElement.style.setProperty('--add_size', localStorage.font + 'px')
  }
}
</script>