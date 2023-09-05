<script setup lang="ts">

import type { BaseCard, Providers } from '~/types';

defineProps<{
  item: BaseCard
  messageLink: string
}>()

const localePath = useLocalePath()

</script>

<template>
  <div class="wrap card" v-show="true">
    <nuxt-link :to="localePath(item._path.replace('/en', ''))" class="link_hidden">
      <div class="button">{{ messageLink }}</div>
    </nuxt-link>

    <div>
      <h1>{{ item.title }}</h1>
      <div v-if="item.paragraph" v-html="item.paragraph.join('<br>')"></div>
      <div v-else v-html="item.description"></div>
      <p v-if="item.tag" v-html="item.tag.join(' - ')"></p>
    </div>

    <figure>
      <nuxt-picture v-if="item.img.provider == 'cloudinary'" provider="cloudinary" :src="item.img.src"
        :alt="item.img.alt" />

      <svg v-else-if="item.img.provider == 'localSvg'">
        <use :xlink:href="useAsset('/svg/svg_list.svg') + '#' + item.img.src" :alt="item.img.alt"></use>
      </svg>

      <img v-else :src="item.img.src" :alt="item.img.alt" />
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