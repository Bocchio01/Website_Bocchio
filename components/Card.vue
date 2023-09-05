<script setup lang="ts">

import type { BaseCard } from "~/types";

defineProps<{
  cardData: BaseCard
  messageLink: string;
}>()

const localePath = useLocalePath()

const showCard = computed(() => true)

// console.log(cardData)

</script>

<template>
  <div class="wrap card" v-show="showCard">
    <!-- <nuxt-link :to="localePath(cardData._path.replace('/en', ''))" class="link_hidden">
      <div v-if="messageLink" class="button">{{ messageLink }}</div>
    </nuxt-link> -->

    <div>
      <h1>{{ cardData.title }}</h1>
      <div v-if="cardData.paragraph" v-html="cardData.paragraph.join('<br>')"></div>
      <!-- <div v-else-if="cardData.paragraph)" v-html="cardDataect.values)(cardData.paragraph)).join('<br>')"></div> -->
      <div v-else v-html="cardData.description"></div>
      <p v-if="cardData.tag" v-html="cardData.tag.join(' - ')"></p>
    </div>

    <figure v-if="cardData.img">
      <svg v-if="cardData.img.src.toString().startsWith('#')">
        <use :xlink:href="useAsset('/svg/svg_list.svg') + cardData.img.src" :alt="cardData.img.alt"></use>
      </svg>
      <nuxt-picture v-else-if="!cardData.img.src.startsWith('http')" provider="cloudinary" :src="cardData.img.src"
        :alt="cardData.img.alt" format="webp" />
      <img v-else :src="cardData.img.src" :alt="cardData.img.alt" />
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
