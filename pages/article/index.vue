<script setup lang="ts">

import type { BaseCard, Sections } from '~/types'

const { t } = useI18n()

const { data: articles } = await useAsyncData('article',
    () => queryContent<BaseCard>(buildFullPath())
        .skip(1)
        .without('body')
        .find(),
)

const title: string = t('page-title')
const description: string = t('page-description')
const section: Sections = 'article'

useHead(buildHeadObj(title, description, section))

const tags = articles.value?.map((article) => article.tag).flat()

const titleInput = ref<string>('')
const tagsSelected = ref<Array<string>>([])

const tagsSelecetedHandler = (tags: Array<string>) => {
    tagsSelected.value = tags
}

const titleInputHandler = (title: string) => {
    titleInput.value = title
}

</script>

<template>
    <main>
        <navSearchBar :tags="tags" @tagsSelected="tagsSelecetedHandler" @titleInput="titleInputHandler" />
        <CardList v-if="articles !== null" :list="(articles as BaseCard[])" :message-link="t('message-link')"
            :tagsSelected="tagsSelected" :titleInput="titleInput" />
    </main>
</template>

<i18n lang="json">
{
    "it": {
        "page-title": "Sezione articoli",
        "page-description": "Pagina di elenco degli articoli del sito Bocchio's WebSite",
        "message-link": "Vai all'articolo!"
    },
    "en": {
        "page-title": "Articles section",
        "page-description": "Bocchio's WebSite article list page",
        "message-link": "Go to the article!"
    }
}
</i18n>