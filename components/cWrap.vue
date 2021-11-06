<template>
  <div
    class="wrap card"
    v-show="useTag ? tags.some((r) => obj.tag.includes(r)) : true"
  >
    <nuxt-link :to="obj.path"
      ><div class="button">{{ msg }}</div></nuxt-link
    >
    <div>
      <h1>{{ obj.title }}</h1>
      <p v-html="obj.paragraph.join('<br>')"></p>
    </div>
    <nuxt-img
      v-if="obj.img.src.indexOf('http') == -1"
      provider="cloudinary"
      :src="obj.img.src"
      :alt="obj.img.alt"
      height="300px"
    />
    <img v-else :src="obj.img.src" :alt="obj.img.alt" height="300px" />
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true
    },
    useTag: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array
    },
    msg: {
      type: String,
      default: 'Scopri di più',
    }
  }
}
</script>

<style lang="scss">
.wrap.card {
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  column-gap: 64px;
  &:nth-child(2n) {
    flex-direction: row-reverse;
  }
  > div {
    flex: auto;
    overflow-wrap: anywhere;
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
    text-decoration: none;
    color: var(--text_color);
    > div.button {
      font-size: calc(var(--paragraph_size) + 5px);
      font-family: var(--Special_font);
      text-decoration: none;
    }
  }
  > img {
    margin: auto;
    border-radius: 20px;
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