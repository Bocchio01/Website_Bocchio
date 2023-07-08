<!-- <script setup lang="ts">

const { path } = useRoute()

const { data: article } = await useAsyncData(path.,
  () => queryContent('en', 'article')
    .where({ _path: path })
    .findOne(),
)

console.log(article)
</script> -->

<template>
  <main>
    <ContentQuery :path="$route.path" v-slot="{ data }">
      <ContentRenderer>
        {{ data }}
      </ContentRenderer>

    </ContentQuery>
  </main>
</template>