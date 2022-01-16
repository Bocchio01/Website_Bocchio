<template>
  <div class="media">
    <figure
      v-if="type == 'img' || type == 'svg'"
      :class="[espansione ? 'embedded_img msg_bg visible' : '']"
      @click="expand()"
    >
      <!--
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
      -->

      <svg v-if="s.indexOf('#') == 0">
        <use :xlink:href="'/svg/svg_list.svg' + s" :alt="a"></use>
      </svg>

      <nuxt-picture
        v-else-if="provider == 'Cloudinary'"
        provider="cloudinary"
        :src="s"
        sizes="xs:320px sm:400px md:460px lg:700px"
        v-bind:alt="a ? a : c"
        format="webp"
      />
      <img v-else :src="s" v-bind:alt="a ? a : c" />
      <figcaption>{{ c }}</figcaption>
    </figure>

    <figure v-if="type == 'video'">
      <video controls>
        <source :src="s" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <figcaption>{{ c }}</figcaption>
    </figure>

    <figure v-if="type == 'iframe'">
      <iframe
        :src="s"
        v-bind:title="[a ? a : c]"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <figcaption>{{ c }}</figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    s: { type: String },
    a: { type: String },
    c: { type: String },
    type: { type: String, default: 'img' },
    provider: { type: String, default: 'Cloudinary' }
  },
  data() {
    return {
      espansione: false
    }
  },
  methods: {
    expand() {
      if (this.type == 'img') this.espansione = !this.espansione
    }
  }
}
</script>
<style lang="scss">
.media {
  margin-block: 30px;
  text-align: center;
  &:first-of-type img,
  &:first-of-type svg {
    max-height: 450px;
    width: unset;
  }
  > figure {
    svg {
      padding: 20px;
      aspect-ratio: 1;
    }
    svg,
    img,
    > video,
    > iframe {
      max-width: 100%;
      width: 700px;
      border-radius: 20px;
      background-color: white;
    }
    > figcaption {
      font-style: italic;
      font-size: calc(var(--Size_Text_Wrap) - 2px);
      font-family: var(--Font_Base);
      text-align: center;
      padding-inline: 10px;
      overflow-wrap: anywhere;
    }
    &.embedded_img {
      color: white;
      overflow: auto;

      img {
        z-index: 7;
        max-width: 90vw;
        max-height: 90vh !important;
        width: unset;
        background-color: white;
      }
      > figcaption {
        font-size: calc(5px + var(--Size_Text_Wrap));
      }
    }
  }
}

@media (min-width: 700px) {
  .media > figure > iframe {
    height: 400px;
  }
}

@media (max-width: 700px) {
  .media > figure > iframe {
    height: 300px;
  }
}
</style>