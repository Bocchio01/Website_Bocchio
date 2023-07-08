<script setup>

const locale = useI18n()

const { data: navigation } = await useAsyncData('navigation',
  () => queryContent(locale.value, 'article')
    .find()
)

console.log(locale.value, navigation)

</script>

<template>
  <main class="text-left">
    <nav>
      <p v-for="el in navigation">
        <a :href="el._path">{{ el.title }}</a>
        <br>
      </p>
    </nav>
  </main>
</template>
