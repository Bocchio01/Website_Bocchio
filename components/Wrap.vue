<script>
export default {
  props: ['obj', 'search_title', 'tags', 'msg'],
  computed: {
    showCard() {
      if (this.search_title) {
        return this.obj.title.toLowerCase().indexOf(this.search_title.toLowerCase()) !== -1;
      } else if (this.tags.length !== 0) {
        return this.tags.some((r) => this.obj.tag.includes(r));
      } else {
        return true;
      }
    },
  },
};
</script>

<template>
  <div class="wrap card" v-show="showCard">
    <nuxt-link :to="localePath(obj.path)" class="link_hidden">
      <div v-if="msg" class="button">{{ msg }}</div>
    </nuxt-link>

    <div>
      <h1>{{ obj.title }}</h1>
      <div v-if="Array.isArray(obj.paragraph)" v-html="obj.paragraph.join('<br>')"></div>
      <div v-else-if="obj.paragraph" v-html="Object.values(obj.paragraph).join('<br>')"></div>
      <div v-else v-html="obj.description"></div>
      <p v-if="obj.tag" v-html="obj.tag.join(' - ')"></p>
    </div>

    <figure v-if="obj.img">
      <svg v-if="obj.img.src.startsWith('#')">
        <use :xlink:href="useAsset('/svg/svg_list.svg') + obj.img.src" :alt="obj.img.alt"></use>
      </svg>
      <nuxt-picture v-else-if="!obj.img.src.startsWith('http')" provider="cloudinary" :src="obj.img.src"
        :alt="obj.img.alt" format="webp" />
      <img v-else :src="obj.img.src" :alt="obj.img.alt" />
    </figure>
  </div>
</template>

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

  >div {
    flex: 1 1 340px;
    overflow-wrap: anywhere;

    >div {
      margin-block: 10px;
      max-width: fit-content;
    }

    >p {
      color: gray;
      text-align: center;
      text-decoration: underline;
      font-weight: bold;
    }
  }

  >.link_hidden>div.button {
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

    >.link_hidden {
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
