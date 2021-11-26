<template>
  <div class="wrap_width flex_container">
    <div class="wrap navigation" v-if="file" style="flex: 1 1 250px">
      <h2>Allegati</h2>
      <p>La cartella del progetto.</p>
      <div>

        <div class="wrap document">
          <p>Mega Cloud</p>
          <cMedia s="/v1637895660/Mega_icon.png" a="Mega folder icon"></cMedia>
          <a :href="file" target="_blank" rel="nofollow noopener noreferrer">
            <div class="button">Scopri di più!</div>
          </a>
        </div>
        
      </div>
    </div>

    <div class="wrap navigation" style="flex: 3 1 400px" v-if="prev || next">
      <h2>Naviga nel sito</h2>
      <p v-if="prev && next">
        Di seguito l'articolo precedente e il successivo in ordine temporale.
      </p>
      <p v-else-if="next">
        Di seguito l'articolo successivo in ordine temporale.
      </p>
      <p v-else>Di seguito l'articolo precedente in ordine temporale.</p>
      <div>

        <div class="wrap document" v-if="prev">
          <p>{{ prev.title }}</p>
          <cMedia :s="prev.img.src" :a="prev.img.src"></cMedia>
          <NuxtLink :to="prev.slug">
            <div class="button ToTop"><span>&#8617;</span></div>
          </NuxtLink>
        </div>

        <div class="wrap document" v-if="next">
          <p>{{ next.title }}</p>
          <cMedia :s="next.img.src" :a="next.img.src"></cMedia>
          <NuxtLink :to="next.slug">
            <div class="button ToTop"><span>&#8618;</span></div>
          </NuxtLink>
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
  },
}
</script>

<style lang="scss">
.flex_container {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  align-items: stretch;
  justify-content: center;
  column-gap: 30px;
}
.wrap.navigation {
  padding: 15px;
  margin-top: 0px;

  > div {
    display: flex;
    justify-content: space-evenly;
    row-gap: 20px;
    column-gap: 20px;
    > .document {
      margin-inline: auto;
      text-align: center;
      margin: 10px;
      padding: 15px;
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
      .media {
        margin-top: 10px;
        margin-bottom: 0px;
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
  .wrap.navigation > div > .document img {
    max-height: 75px;
    max-width: 75px;
  }
}
</style>