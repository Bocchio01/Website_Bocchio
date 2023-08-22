<script setup lang="ts">
const { t, locale } = useI18n({
    useScope: 'local',
})

const { data: indexCards } = await useAsyncData('indexCards',
    () => queryContent()
        .where({
            $or: [
                { _path: { $eq: `/${locale.value}/mix/who-am-i` } },
                { _path: { $eq: `/${locale.value}/article` } },
                { _path: { $eq: `/${locale.value}/mix/what-s-the-aim` } },
            ]
        })
        .only(['title', '_path', 'paragraph', 'img'])
        .find()
)

// console.log(indexCards)

</script>

<template>
    <div>
        <Wrap v-for="(card, index) in indexCards" :key="index" :obj="card" :msg="t('msg')" />
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