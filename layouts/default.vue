<template>
  <div class="Default">
    <CLoading v-if="$store.state.show.loading" />
    <CHeader />
    <CSlogan />
    <Nuxt keep-alive />
    <Lazy-CFooter />

    <Lazy-CBackground />
    <Lazy-CLogin />
  </div>
</template>
