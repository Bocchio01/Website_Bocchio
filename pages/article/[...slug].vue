<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData('get-document', () => queryContent(route.path).findOne())
</script>

<template>
  <main>
    <ContentRenderer :value="data" />
  </main>
</template>