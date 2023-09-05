<script setup lang="ts">

defineProps<{
    url: string,
    text: string,
}>()

const localePath = useLocalePath()

</script>

<template>
    <div>
        <NuxtLink :to="localePath(url.replace('/en', ''))" class="button">{{ text }}</NuxtLink>
    </div>
</template>