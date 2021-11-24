<template>
  <div class="align">
    <div class="wrap navigation" v-if="file" style="flex: 1 1 300px">
      <h2>Allegati</h2>
      <p>
        Alcuni allegati utili per realizzare il progetto o semplicemente per
        avere qualche specifica tecnica in più
      </p>
      <div >
        <div
          class="wrap document"
        >
          <p>folder</p>
          <img
            src='/Icons/png.png'
            alt='Documento folder'
          />
          <a
            :href="file"
            target="_blank"
            rel="nofollow noopener noreferrer"
          ><div class="button">GO!</div></a>
        </div>
      </div>
    </div>
    <!-- <h2>Link utili</h2> -->
    <div class="wrap navigation" style="flex: 10 1 300px">
      <h2>Naviga nel sito</h2>
      <p v-if="prev && next">
        Di seguito l'articolo precedente e il successivo in ordine temporale
      </p>
      <p v-else-if="next">
        Di seguito l'articolo successivo in ordine temporale
      </p>
      <p v-else>Di seguito l'articolo precedente in ordine temporale</p>
      <div>
        <div class="wrap document" v-if="prev">
          <p>{{ prev.title }}</p>
          <cMedia :s="prev.img.src" :a="prev.img.src"></cMedia>
          <NuxtLink :to="prev.slug"
            ><div class="button ToTop"><span>&#8617;</span></div></NuxtLink
          >
        </div>
        <div class="wrap document" v-if="next">
          <p>{{ next.title }}</p>
          <cMedia :s="next.img.src" :a="next.img.src"></cMedia>
          <NuxtLink :to="next.slug"
            ><div class="button ToTop"><span>&#8618;</span></div></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
    },
    file: {
      type: String,
      default: () => null,
    },
  }
}
</script>
<style lang="scss">
.align {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  column-gap: 50px;
  // row-gap: 50px;

}
.wrap.navigation {
  padding: 15px;
  // flex: 1 1 300px;
  .inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    row-gap: 10px;
    > img {
      max-width: 50px !important;
      max-height: 50px !important;
    }
  }
  > div {
    display: flex;
    justify-content: space-evenly;
    // flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;
    > .document {
      * {
        margin-block: 5px;
        margin-inline: auto;
        text-align: center;
      }
      margin: 5px;
      padding: 20px;
      width: fit-content;
      > p {
        font-weight: bold;
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
      }
      img {
        max-height: 150px;
        max-width: 150px;
      }
      &:hover {
        transform: scale(1.05);
        background-color: gray;
        > a {
          visibility: visible;
        }
      }
    }
  }
}

@media (max-width: 750px) {
  .wrap.navigation {
    > div > .document img {
      max-height: 75px;
      max-width: 75px;
    }
    .inline > img {
      max-height: 30px !important;
      max-width: 30px !important;
    }
  }
}
</style>