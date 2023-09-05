<script setup lang="ts">

import type { BaseCard, Sections } from "~/types"

const { t, locale } = useI18n()

const { data: who_am_i } = await useAsyncData(`who_am_iCard`,
    () => queryContent<BaseCard>()
        .where({ _path: "/" + locale.value + "/mix/who-am-i" })
        .without("body")
        .findOne()
)

const { data: article } = await useAsyncData(`articleCard`,
    () => queryContent<BaseCard>()
        .where({ _path: "/" + locale.value + "/article" })
        .without("body")
        .findOne()
)

const { data: what_s_the_aim } = await useAsyncData(`what_s_the_aimCard`,
    () => queryContent<BaseCard>()
        .where({ _path: "/" + locale.value + "/mix/what-s-the-aim" })
        .without("body")
        .findOne()
)

const articles: BaseCard[] = [
    who_am_i,
    article,
    what_s_the_aim
].map(item => item.value).filter(article => article !== null) as BaseCard[];


const title: string = t('page-title')
const description: string = t('page-description')
const section: Sections = 'index'

useHead(buildHeadObj(title, description, section))

</script>

<template>
    <section>
        <CardList v-if="articles.length" :list="articles" :message-link="t('message-link')" />
    </section>
</template>

<i18n lang="json">
{
    "it": {
        "page-title": "Home",
        "page-description": "Tommaso Bocchietti. Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione all'ingegneria.",
        "message-link": "Scopri di più!"
    },
    "en": {
        "page-title": "Home",
        "page-description": "Tommaso Bocchietti. More than a simple portfolio: a real tour in Bocchio's mind and interests. Articles, blogs, portals and WebApps ranging from programming to engineering.",
        "message-link": "Explore more!"
    }
}
</i18n>