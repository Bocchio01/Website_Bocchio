<template>
  <div class="wrap_width flex_container">
    <div
      class="wrap navigation"
      v-if="files[this.urlArticle]"
      style="flex: 1 1 270px"
    >
      <h2>Allegati</h2>
      <p v-if="files[this.urlArticle].length == 1">
        Di seguito la cartella del progetto.
      </p>
      <p v-else>Di seguito le cartelle del progetto.</p>
      <div>
        <div
          class="wrap document"
          v-for="(file, index) in files[this.urlArticle]"
          :key="index"
        >
          <p>{{ file.host }}</p>
          <img
            :src="'/AttachmentIcon/' + file.host + '.png'"
            :alt="file.host + ' icon'"
          />
          <a
            :href="file.url"
            class="link_hidden"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <div class="button">Scopri di più!</div>
          </a>
        </div>
      </div>
    </div>

    <div
      class="wrap navigation"
      style="flex: 2 1 270px"
      v-if="navdata.prev || navdata.next"
    >
      <h2>Naviga nel sito</h2>
      <p>{{ pharse }}</p>

      <div>
        <div class="wrap document" v-if="navdata.prev">
          <p>{{ navdata.prev.title }}</p>
          <cMedia :s="navdata.prev.img.src" :a="navdata.prev.img.src"></cMedia>
          <NuxtLink :to="navdata.prev.slug" class="link_hidden">
            <div class="button"><span>&#8617;</span></div>
          </NuxtLink>
        </div>

        <div class="wrap document" v-if="portal.urlPortal">
          <p>Portale del progetto</p>
          <cMedia :s="portal.img.src" :a="portal.img.src"></cMedia>
          <NuxtLink :to="portal.urlPortal" class="link_hidden">
            <div class="button"><span>&#8605;</span></div>
          </NuxtLink>
        </div>

        <div class="wrap document" v-if="navdata.next">
          <p>{{ navdata.next.title }}</p>
          <cMedia :s="navdata.next.img.src" :a="navdata.next.img.src"></cMedia>
          <NuxtLink :to="navdata.next.slug" class="link_hidden">
            <div class="button"><span>&#8618;</span></div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navdata: {
      type: Object,
      default: () => null,
    },
    portal: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      urlArticle: this.$route.fullPath,
      pharse: '',
    }
  },
  computed: {
    files: {
      get() {
        return this.$store.state.files
      },
    },
  },
  created() {
    var p = !!this.navdata.prev,
      n = !!this.navdata.next,
      u = !!this.portal.urlPortal,
      a = '',
      b = '',
      c = ''

    if (p) a = "l'articolo precedente"
    if (n) b = "l'articolo successivo"
    if (p && n) {
      a = "l'articolo precedente, successivo"
      b = ''
    }
    if (u)
      c =
        p || n
          ? ' e il portale associato al progetto'
          : ' il portale associato al progetto'

    this.pharse = 'Di seguito ' + a + b + c + '.'
  },
}
</script>

<style lang="scss">
.wrap.navigation {
  padding: 15px;
  margin-block: 0px;

  > div {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    > .document {
      margin-inline: auto;
      text-align: center;
      margin: 10px;
      padding: 15px;
      width: fit-content;
      > p {
        font-weight: bold;
      }
      .media {
        margin-top: 0px;
        margin-bottom: 0px;
      }
      img {
        border-radius: 20px;
        background-color: white;
        margin-top: 10px;
        max-height: 150px;
        max-width: 150px;
      }
      &:hover {
        transform: scale(1.05);
        background-color: gray;
        > .link_hidden {
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