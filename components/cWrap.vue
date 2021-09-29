<template>
  <div class="container">
    <nuxt-link class="link_hidden" :to="obj.linkpath" target="_self"
      >Scopri di più</nuxt-link
    >
    <div>
      <h1>{{ obj.title }}</h1>
      <div class="text_container" v-html="obj.description.join('<br/>')"></div>
    </div>
    <div class="separator"></div>
    <img class="img_container" v-bind:src="[obj.img.src.indexOf('http') ? require(`~/assets/img/${obj.img.src}`) : obj.img.src]" :alt="obj.img.alt" />
  </div>
</template>

<script>
export default {
  props: ['obj'],
}
</script>

<style>
@import url("@/assets/css/wrap.css");

.container {
  display: flex;
}

.container .text_container {
  margin-top: 10px;
  margin-bottom: 20px;
}

.container .separator {
  min-width: var(--padding_articles);
}

.container .img_container {
  display: flex;
  margin: auto;
  max-height: 300px;
  transition: all 0.2s ease-in-out;
  max-width: -webkit-fill-available;
  font-family: "Roboto Condensed", sans-serif;
}

.container:hover {
  transform: scale(1.05);
  background-color: gray;
}

.container:hover .link_hidden {
  visibility: visible;
}

.container:hover .img_container {
  transform: scale(1.1);
}

@media (max-width: 1030px) {
  .container {
    display: block;
  }
  .container .link_hidden {
    font-size: calc(1.5 * var(--paragraph_font_size)) !important;
    padding-inline: var(--padding_articles) !important;
  }
  .container .img_container {
    max-height: 200px !important;
  }
}
</style>