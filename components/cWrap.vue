<template>
  <div
    class="container"
    v-show="useTag ? tags.some((r) => obj.tag.includes(r)) : true"
  >
    <nuxt-link class="link_hidden" :to="obj.path" target="_self"
      ><mark> {{ msg }}</mark></nuxt-link
    >
    <div style="flex: auto">
      <h1>{{ obj.title }}</h1>
      <div class="text_container" v-html="obj.paragraph.join('<br>')"></div>
    </div>
    <img class="img_container" :src="obj.img.src" :alt="obj.img.alt" />
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
    },
    useTag: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
    },
    msg: {
      type: String,
      default: 'Scopri di più',
    },
  },
}
</script>

<style>
@import url('@/assets/css/wrap.css');

.container {
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 64px;
}

.container .text_container {
  margin-block: 10px;
  max-width: fit-content;
}

.container .img_container {
  margin: auto;
  max-height: 300px;
  transition: all 0.2s ease-in-out;
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

.link_hidden {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  z-index: 1;
  height: 100%;
  width: 100%;
  top: 0px;
  right: 0px;
  visibility: hidden;
  color: var(--link_hover_color);
  font-family: var(--Special_font);
  font-size: var(--title_size);
}

mark {
  background-color: #0a0a0a;
  color: var(--link_hover_color);
  border-radius: 10px;
  align-self: center;
  width: min-content;
  padding-inline: 20px;
}

@media (max-width: 1030px) {
  .container .img_container {
    max-height: 200px;
    max-width: 100%;
  }
}
</style>