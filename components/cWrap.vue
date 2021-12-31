<template>
  <div
    class="wrap card"
    v-show="useTag ? (tags.some((r) => obj.tag.includes(r)) || (title!='' && obj.title.toLowerCase().indexOf(title.toLowerCase()) != -1)) : (title!='' ? obj.title.toLowerCase().indexOf(title.toLowerCase()) != -1 : true)"
  >
    <nuxt-link :to="obj.path" class="link_hidden">
      <div class="button">{{ msg }}</div>
    </nuxt-link>
    <div>
      <h1>{{ obj.title }}</h1>
      <div v-html="obj.paragraph.join('<br>')"></div>
    </div>

    <figure>
      <!--
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
      -->

      <svg v-if="obj.img.src.indexOf('#') == 0">
        <use
          :xlink:href="'/svg/svg_list.svg' + obj.img.src"
          :alt="obj.img.alt"
        ></use>
      </svg>

      <nuxt-picture
        v-else-if="obj.img.src.indexOf('http') == -1"
        provider="cloudinary"
        :src="obj.img.src"
        v-bind:alt="obj.img.alt"
        format="webp"
      />
      <img v-else :src="obj.img.src" :alt="obj.img.alt" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true,
    },
    useTag: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
    },
    title: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: 'Scopri di più',
    },
  },
}
</script>

<style lang="scss">
.wrap.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
    font-size: calc(var(--paragraph_size) + 5px);
    font-family: var(--Special_font);
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
</style>