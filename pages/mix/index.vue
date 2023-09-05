<script setup lang="ts">

import type { BaseCard, Sections } from '~/types'

const { t } = useI18n()

const { data: mixs } = await useAsyncData('mix',
    () => queryContent<BaseCard>(buildFullPath())
        .where({ published: { $ne: false } })
        .sort({ date: -1 })
        .find(),
)

const title: string = t('page-title')
const description: string = t('page-description')
const section: Sections = 'mix'

useHead({
    title,
    meta: [{ name: 'description', content: description }],
})
</script>

<template>
    <main>
        <!-- <Tags :section="section" /> -->
        <div v-if="mixs !== null">
            <Card v-for="(mix, index) in mixs" :card-data="mix" :message-link="t('message-link')" />
        </div>
    </main>
</template>

<i18n lang="json">
{
    "it": {
        "page-title": "Tutte le avventure di mix",
        "page-description": "Ecco alcune delle mie avventure di mix.",
        "message-link": "Scopri di più!"
    },
    "en": {
        "page-title": "All the advetures of mix",
        "page-description": "Here are some of my mix adventures.",
        "message-link": "Explore more!"
    }
}
</i18n>