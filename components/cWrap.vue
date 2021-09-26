<template>
  <div class="container">
    <nuxt-link class="link_hidden" :to="obj.linkpath" target="_self"
      >Scopri di più</nuxt-link
    >
    <div>
      <h1 class="title_container">{{ obj.title }}</h1>
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
.container,
.article {
  position: relative;
  width: 60%;
  color: var(--black);
  background-color: var(--white);
  border: 1px solid #a2a2a2;
  padding: var(--padding_articles);
  margin-inline: auto;
  margin-block: 25px;
  transition: all 0.2s ease-in-out;
  -webkit-border-radius: var(--border_radius);
  -moz-border-radius: var(--border_radius);
  border-radius: var(--border_radius);
  text-align: center;
}

.link_hidden {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: var(--orange);
  z-index: 1;
  font-size: calc(2.5 * var(--paragraph_font_size));
  height: 100%;
  width: 100%;
  top: 0px;
  right: 0px;
  visibility: hidden;
}

/*article's title*/

.article .title,
.container .title_container {
  font-size: calc(2 * var(--paragraph_font_size));
}

.article .paragraph,
.container .text_container {
  font-size: var(--paragraph_font_size);
  font-family: "Roboto Condensed", sans-serif;
  text-align: justify;
}

/*paragraph title*/

.article h2 {
  border-bottom: 1px solid gray;
  text-align: left !important;
  font-size: calc(1.5 * var(--paragraph_font_size));
}

@media (max-width: 1030px) {
  :root {
    --padding_articles: 40px !important;
  }
  .article .title,
  .container .title_container {
    font-size: var(--paragraph_font_size) !important;
    text-align: center;
  }
  .article .paragraph,
  .container .text_container {
    font-size: calc(0.75 * var(--paragraph_font_size));
  }
}

@media (max-width: 1200px) {
  .container,
  .article {
    width: 70%;
  }
}

@media (max-width: 750px) {
  .container,
  .article {
    width: 93%;
  }
}
/**/
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