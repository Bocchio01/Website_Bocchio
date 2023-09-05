<script setup lang="ts">

import type { BaseCard } from '~/types';

const props = defineProps<{
    statusCode?: number
}>()

const { t } = useI18n()

const errorCard: BaseCard = {
    title: t('card-data.title') + (props.statusCode ? ` (${props.statusCode})` : ' 404'),
    paragraph: [t('card-data.paragraph.0'), t('card-data.paragraph.1')],
    img: {
        src: t('card-data.img.src'),
        alt: t('card-data.img.alt'),
        provider: 'cloudinary'
    },
    _path: t('card-data._path')
}

</script>

<template>
    <div>
        <Card v-if="errorCard" :item="errorCard" :message-link="t('message-link')" />
    </div>
</template>

<i18n lang="json">
{
    "it": {
        "card-data": {
            "title": "Errore",
            "paragraph": [
                "Pensiamo che qualcosa sia andato storto.",
                "Se pensi possa essere un problema del sito, faccelo sapere tramite uno dei canali indicati a fondo pagina."
            ],
            "img": {
                "src": "/v1633054972/Undefined.png",
                "alt": "Icona non trovato"
            },
            "_path": "/"
        },
        "message-link": "Torna alla home"
    },
    "en": {
        "card-data": {
            "title": "Error",
            "paragraph": [
                "We think something went wrong.",
                "If you think it might be a problem with the site, let us know through one of the channels listed at the bottom of the page."
            ],
            "img": {
                "src": "/v1633054972/Undefined.png",
                "alt": "Icon not found"
            },
            "_path": "/"
        },
        "message-link": "Back to home"
    }
}
</i18n>