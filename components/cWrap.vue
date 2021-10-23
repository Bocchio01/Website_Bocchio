<template>
  <div
    class="wrap card"
    v-show="useTag ? tags.some((r) => obj.tag.includes(r)) : true"
  >
    <nuxt-link :to="obj.path"
      ><div> {{ msg }}</div></nuxt-link
    >
    <div>
      <h1>{{ obj.title }}</h1>
      <p v-html="obj.paragraph.join('<br>')"></p>
    </div>
    <img :src="obj.img.src" :alt="obj.img.alt" />
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
    type: {
      type: String,
      default: 'nuxt-link',
    },
  },
}
</script>

<style lang="scss">
.wrap.card {
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 64px;
  > div {
    flex: auto;
    > p {
      margin-block: 10px;
      max-width: fit-content;
    }
  }
  > a {
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
    text-decoration: unset;
    > div {
      background-color: #0a0a0a;
      color: var(--link_hover_color);
      border-radius: 10px;
      align-self: center;
      width: min-content;
      padding-inline: 20px;
    }
  }
  > img {
    margin: auto;
    max-height: 300px;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    transform: scale(1.05);
    background-color: gray;
    > a {
      visibility: visible;
    }
    > img {
      transform: scale(1.1);
    }
  }
}
@media (max-width: 1030px) {
  .wrap.card > img {
    max-height: 200px;
    max-width: 100%;
  }
}
</style>