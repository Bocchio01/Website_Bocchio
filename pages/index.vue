<script setup lang="ts">

import type { BaseCard } from "~/types";

const { t, locale } = useI18n()

const articles: any[] = []
const articlePaths: string[] = [
    'mix/who-am-i',
    'article',
    'mix/what-s-the-aim',
]

articlePaths.forEach(async path => {

    const { data: article } = await useAsyncData(`homeCard`,
        () => queryContent<BaseCard>(`/${locale.value}/${path}`)
            .where({ published: { $ne: false } })
            .without('body')
            .findOne()
    )

    if (article !== null) {
        articles.push(article)
    }
});

</script>

<template>
    <div>
        <div v-if="articles !== null">
            <Card v-for="(mix, index) in articles" :card-data="mix" :message-link="t('message-link')" />
        </div>
    </div>
</template>

<i18n lang="json">
{
    "it": {
        "msg": "Scopri di più!"
    },
    "en": {
        "msg": "Explore more!"
    }
}
</i18n>