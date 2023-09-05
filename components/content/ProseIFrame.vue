<script setup lang="ts">

defineProps<{
    src: string,
    alt?: string,
    caption?: string,
}>()

</script>


<template>
    <div class="media">

        <figure>
            <iframe :src="src" v-bind:title="caption ? caption : alt" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>

            <figcaption v-if="caption">{{ caption }}</figcaption>
        </figure>

    </div>
</template>