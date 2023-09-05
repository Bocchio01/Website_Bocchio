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

</script>

<template>
    <main>
        <CardList v-if="articles !== null" :list="(articles as BaseCard[])" :message-link="t('message-link')" />
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