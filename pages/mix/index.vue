<script setup lang="ts">

import type { BaseCard, Sections } from '~/types'

const { t } = useI18n()

const { data: mixs } = await useAsyncData('mixs',
    () => queryContent<BaseCard>(buildFullPath())
        .without('body')
        .find()
)

const title: string = t('page-title')
const description: string = t('page-description')
const section: Sections = 'mix'

useHead(buildHeadObj(title, description, section))

</script>

<template>
    <main>
        <CardList v-if="mixs !== null" :list="(mixs as BaseCard[])" :message-link="t('message-link')" />
    </main>
</template>

<i18n lang="json">
{
    "it": {
        "page-title": "Sezione pagine di mix",
        "page-description": "Pagina di elenco dei mix del sito Bocchio's WebSite",
        "message-link": "Esplora il mix!"
    },
    "en": {
        "page-title": "Mix section",
        "page-description": "Bocchio's WebSite mix list page",
        "message-link": "Explore the mix!"
    }
}
</i18n>