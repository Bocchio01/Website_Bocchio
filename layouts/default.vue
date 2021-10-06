<template>
  <main>
    <div id="upper_wrap">
      <cHeader />
      <cSlogan />
      <Nuxt />
    </div>
    <cFooter />

    <cBackground />
  </main>
</template>

<script>
export default {
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: '/css/global.css' },
        { rel: 'stylesheet', href: '/css/base_element.css' },
        { rel: 'stylesheet', href: '/css/media.css' },
        { rel: 'stylesheet', href: '/css/wrap.css' },
      ]
    }
  }
}
</script>

<style>
div#upper_wrap {
  min-height: calc(100vh - 207px);
}
</style>