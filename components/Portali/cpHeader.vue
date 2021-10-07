<template>
    <header>
      <h1>{{ title }}</h1>
      <h3>{{ subtitle }}</h3>
      <div class="o_separator"></div>
    </header>
</template>

<script>
export default {
    props: ['title', 'subtitle']
}
</script>

<style scoped>
header {
    width: 100%;
    text-align: center;
    padding-top: 10px;

}

header h1 {
    font-size: var(--app_title_size);
    font-family: var(--Special_font);
}

header h3 {
    font-size: var(--app_paragraph_size);
}
</style>