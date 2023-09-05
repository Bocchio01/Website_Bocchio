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
            <video controls>
                <source :src="src" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <figcaption v-if="caption">{{ caption }}</figcaption>
        </figure>

    </div>
</template>