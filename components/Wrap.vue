<script setup lang="ts">

interface Props {
  obj: ObjInt;
  tags?: string[];
  msg?: string;
  search_title?: string;
}

interface ObjInt {
  title: string;
  paragraph: string[];
  description?: string;
  tag?: string[];
  img?: {
    src: string;
    alt: string;
  };
  _path: string;
}

const Props = withDefaults(defineProps<Props>(), {
  obj: () => ({
    title: '',
    paragraph: [],
    description: '',
    tag: [],
    img: {
      src: '',
      alt: ''
    },
    _path: ''
  }),
})

const localePath = useLocalePath()

// const showCard = computed(() => {
//   const tags: string[] = Props.tags ? Props.tags.map(tag => tag) : [];
//   const search_title: string = Props.search_title ? Props.search_title.toLowerCase() : '';
//   const title: string = Props.obj.title ? Props.obj.title.toLowerCase() : '';
//   const tag: string[] = Props.obj.tag ? Props.obj.tag.map(tag => tag) : [];

//   return Props.search_title?.trim() !== ''
//     ? Props.obj.title.includes(Props.search_title!)
//     : Props.tags?.length !== 0
//       ? Props.obj.tag?.some((r) => Props.obj.tag?.includes(r))
//       : true;
// });

const showCard = computed(() => true)

</script>

<template>
  <div class="wrap card" v-show="showCard">
    <nuxt-link :to="Props.obj._path" class="link_hidden">
      <div v-if="msg" class="button">{{ msg }}</div>
    </nuxt-link>

    <div>
      <h1>{{ Props.obj.title }}</h1>
      <div v-html="Props.obj.paragraph.join('<br>')"></div>
      <!-- <div v-else-if="Props.obj.paragraph)" v-html="Props.Object.values)(Props.obj.paragraph)).join('<br>')"></div> -->
      <!-- <div v-else v-html="Props.obj.description)"></div> -->
      <p v-if="Props.obj.tag" v-html="Props.obj.tag.join(' - ')"></p>
    </div>

    <figure v-if="Props.obj.img">
      <svg v-if="Props.obj.img.src.toString().startsWith('#')">
        <use :xlink:href="useAsset('/svg/svg_list.svg') + Props.obj.img.src" :alt="Props.obj.img.alt"></use>
      </svg>
      <nuxt-picture v-else-if="!Props.obj.img.src.startsWith('http')" provider="cloudinary" :src="Props.obj.img.src"
        :alt="Props.obj.img.alt" format="webp" />
      <img v-else :src="Props.obj.img.src" :alt="Props.obj.img.alt" />
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
