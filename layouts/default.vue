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

<style>
div#upper_wrap {
  min-height: calc(100vh - 207px);
}

body {
  background-color: var(--background_color_body);
}

</style>