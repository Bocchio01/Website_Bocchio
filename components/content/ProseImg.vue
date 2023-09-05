<script setup lang="ts">

import type { Providers } from '~/types'


withDefaults(defineProps<{
    src: string,
    alt?: string,
    caption?: string,
    provider?: Providers,
}>(), {
    provider: 'cloudinary'
})

const espansione = ref(false)

</script>


<template>
    <div class="media">

        <figure :class="[espansione ? 'embedded_img msg_bg visible' : '']" @click="espansione = !espansione">
            <nuxt-picture v-if="provider == 'cloudinary'" provider="cloudinary" :src="src" :alt="alt ? alt : caption"
                sizes="xs:320px sm:400px md:460px lg:1000px" />

            <svg v-else-if="provider == 'localSvg'">
                <use :xlink:href="useAsset('/svg/svg_list.svg') + '#' + src" :alt="alt ? alt : caption"></use>
            </svg>

            <img v-else :src="src" :alt="alt ? alt : caption" />

            <figcaption v-if="caption">{{ caption }}</figcaption>
        </figure>

    </div>
</template>