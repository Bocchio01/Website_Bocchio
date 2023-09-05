<script setup lang="ts">

const { t } = useI18n()

const error = {
    title: t('error.wraps.title') + ' 404',
    _path: t('error.wraps.path'),
    paragraph: [t('error.wraps.paragraph.0'), t('error.wraps.paragraph.1')],
    img: {
        src: t('error.wraps.img.src'),
        alt: t('error.wraps.img.alt')
    }
}

</script>

<template>
    <div>
        <Card :card-data="error" :message-link="t('error.msg')" />
    </div>
</template>