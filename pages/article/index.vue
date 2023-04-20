<script setup lang="ts">
  import type { Article, Sections } from '~/types'

  const { data: articles } = await useAsyncData('it/article', () =>
    queryContent<Article>('it/article')
      .where({ published: { $ne: false } })
      .sort({ date: -1 })
      .find()
  )

  const title: string = "$t('article.title')"
  const description: string = "$t('article.description')"
  const section: Sections = 'articles'

  useHead({
    title,
    meta: [{ name: 'description', content: description }],
  })
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
    <!-- <Tags :section="section" /> -->
    <!-- <ItemList v-if="articles !== null" :list="articles" :section="section" /> -->
    <CWrap v-for="(article, index) in articles" :key="index" :obj="article" />
  </main>
</template>
