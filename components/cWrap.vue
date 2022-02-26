<template>
  <div
    class="wrap card"
    v-show="search_title ? obj.title.toLowerCase().indexOf(search_title.toLowerCase()) != -1 : tags.length != 0 ? tags.some((r) => obj.tag.includes(r)) : true"
  >
    <nuxt-link :to="localePath(obj.path)" class="link_hidden">
      <div v-if="msg" class="button">{{ msg }}</div>
    </nuxt-link>

    <div>
      <h1>{{ obj.title }}</h1>
      <div v-if="Array.isArray(obj.paragraph)" v-html="obj.paragraph.join('<br>')"></div>
      <div v-else v-html="Object.values(obj.paragraph).join('<br>')"></div>
    </div>

    <figure>
      <svg v-if="obj.img.src.indexOf('#') == 0">
        <use :xlink:href="require('~/assets/svg/svg_list.svg') + obj.img.src" :alt="obj.img.alt"></use>
      </svg>
      <nuxt-picture v-else-if="obj.img.src.indexOf('http') == -1" provider="cloudinary" :src="obj.img.src" v-bind:alt="obj.img.alt" format="webp" />
      <img v-else :src="obj.img.src" :alt="obj.img.alt" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    obj: { type: Object, required: true },
    tags: {
      type: Array,
      default: () => {
        return []
      },
    },
    search_title: { type: String, default: '' },
    msg: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
.wrap.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: var(--Padding_Wrap);
  row-gap: 15px;
  column-gap: 64px;
  &:nth-child(2n) {
    flex-direction: row-reverse;
  }
  > div {
    flex: auto;
    overflow-wrap: anywhere;
    > div {
      margin-block: 10px;
      max-width: fit-content;
    }
  }
  > .link_hidden > div.button {
    font-size: calc(var(--Size_Text_Wrap) + 5px);
    font-family: var(--Font_Special);
    text-decoration: none;
  }
  img,
  svg {
    height: 300px;
    margin: auto;
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    max-width: 100%;
    border-radius: 20px;
    background-color: white;
  }
  svg {
    padding: 15px;
    aspect-ratio: 1;
  }
  &:hover {
    transform: scale(1.05);
    background-color: gray;
    > .link_hidden {
      visibility: visible;
    }
    img,
    svg {
      transform: scale(1.1);
    }
  }
}
@media (max-width: 1030px) {
  .wrap.card {
    img,
    svg {
      max-height: 200px;
      max-width: 100%;
    }
  }
}

// @media (max-width: 750px) {
//   .wrap.card:hover {
//     background-color: var(--Color_Text_BG);
//   }
// }
</style>
