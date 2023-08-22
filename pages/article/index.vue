<script setup lang="ts">

const { locale, t } = useI18n()

const { data: navigation } = await useAsyncData('navigation',
  () => queryContent(locale.value, 'article')
    .only(['title', 'paragraph', 'img', 'tag', '_path'])
    .where({ _path: { $ne: `/${locale.value}/article` } })
    .sort({ date: 1 })
    .find()
)


const title: string = t('article.title')
const description: string = t('article.description')
// const section: Sections = 'blog'

useHead({
  title,
  meta: [{ name: 'description', content: description }],
})

// console.log(locale.value, navigation)

</script>

<template>
  <main>
    <Wrap v-for="(article, index) in navigation" :key="index" :obj="article" :msg="$t('article.msg')" />
  </main>
</template>
