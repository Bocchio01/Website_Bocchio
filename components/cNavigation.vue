<template>
  <div class="wrap nav_container">
    <div class="wrap navigation" v-if="files" style="flex: 1 1 250px">
      <h2>{{ $t('cNavigation.attachment.h2') }}</h2>
      <p v-if="files.length == 1">{{ $t('cNavigation.attachment.p.0') }}</p>
      <p v-else>{{ $t('cNavigation.attachment.p.1') }}</p>
      <div>
        <div class="wrap document" v-for="(file, index) in files" :key="index">
          <!-- [
        { host: "Dropbox/Mega",
        url: "http:// ... "}] -->
          <p>{{ file.host }}</p>
          <img :src="require('@/assets/png/AttachmentIcon/' + file.host + '.png')" :alt="file.host + ' icon'" />
          <a :href="file.url" class="link_hidden" target="_blank" rel="nofollow noopener noreferrer">
            <div class="button">{{ $t('cNavigation.attachment.button') }}</div>
          </a>
        </div>
      </div>
    </div>

    <div class="wrap navigation" style="flex: 5 1 300px" v-if="data">
      <h2>{{ $t('cNavigation.navigation.h2') }}</h2>
      <p>{{ pharse }}</p>

      <div>
        <div class="wrap document" v-if="data.prev">
          <p>{{ data.prev.title }}</p>
          <CMedia :s="data.prev.img.src" :a="data.prev.img.src"></CMedia>
          <NuxtLink :to="localePath('/article/' + data.prev.slug + '/')" class="link_hidden">
            <div class="button"><span>&#8617;</span></div>
          </NuxtLink>
        </div>

        <div class="wrap document" v-if="data.portal.urlPortal">
          <p>{{ $t('cNavigation.navigation.portal_title') }}</p>
          <CMedia :s="data.portal.img.src" :a="data.portal.img.src"></CMedia>
          <NuxtLink :to="localePath(data.portal.urlPortal)" class="link_hidden">
            <div class="button"><span>&#8605;</span></div>
          </NuxtLink>
        </div>

        <div class="wrap document" v-if="data.next">
          <p>{{ data.next.title }}</p>
          <CMedia :s="data.next.img.src" :a="data.next.img.src"></CMedia>
          <NuxtLink :to="localePath('/article/' + data.next.slug + '/')" class="link_hidden">
            <div class="button"><span>&#8618;</span></div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sendRequest from '@/assets/js/sendRequest.js'

export default {
  props: {
    data: { type: Object },
  },
  data() {
    return {
      pharse: '',
      files: null,
    }
  },

  mounted() {
    sendRequest({
      action: 'NavigationGetFiles',
      data: JSON.stringify({
        url: this.$route.fullPath,
      }),
    })
      .then((res) => (this.files = res.Data))
      .catch((res) => this.$store.commit('auth_error', res.Log))

    var p = !!this.data.prev,
      n = !!this.data.next,
      u = !!this.data.portal.urlPortal,
      i18n = Object.values(this.$t('cNavigation.navigation.p'))

    if (p && n && u) {
      this.pharse = i18n[0]
    } else if (p && n && !u) {
      this.pharse = i18n[1]
    } else if (p && !n && !u) {
      this.pharse = i18n[2]
    } else if (!p && n && !u) {
      this.pharse = i18n[3]
    } else if (!p && !n && u) {
      this.pharse = i18n[4]
    } else if (p && !n && u) {
      this.pharse = i18n[5]
    } else if (!p && n && !u) {
      this.pharse = i18n[6]
    }
  },
}
</script>

<style lang="scss">
.wrap.nav_container {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  align-items: stretch;
  justify-content: center;
  padding: 0px;
  background: none;
  border: none;
  column-gap: 25px;
  row-gap: 25px;
  margin-block: 25px;
}
.wrap.navigation {
  padding: var(--Padding_Wrap_Min);
  margin-block: 0px;

  > div {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    > .document {
      margin-inline: auto;
      text-align: center;
      margin: 10px;
      padding: var(--Padding_Wrap_Min);
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
