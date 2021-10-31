<template>
  <div class="media">
    <figure
      v-if="type == 'img'"
      v-bind:class="[espansione ? 'embedded_img' : '']"
      @click="expand"
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
      <nuxt-picture
        v-if="provider == 'Cloudinary'"
        provider="cloudinary"
        :src="s"
        sizes="xs:320px sm:400px md:460px lg:700px"
        v-bind:alt="a ? a : c"
        format="webp"
      />
      <img v-else :src="s" v-bind:alt="a ? a : c" />
      <figcaption>{{ c }}</figcaption>
    </figure>

    <figure v-if="type == 'vid'">
      <video controls>
        <source :src="s" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <figcaption>{{ c }}</figcaption>
    </figure>

    <figure v-if="type == 'frame'">
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
    provider: { type: String, default: 'Cloudinary' },
  },
  data() {
    return {
      espansione: false,
    }
  },
  methods: {
    expand() {
      if (this.type == 'img') this.espansione = !this.espansione
    },
  },
}
</script>
<style lang="scss">
.media {
  margin-block: 30px;
  text-align: center;
  &:first-of-type img {
    max-height: 450px;
    width: unset;
  }
  > figure {
    img,
    > video,
    > iframe {
      max-width: 100%;
      width: 700px;
      border-radius: 20px;
    }
    > figcaption {
      font-style: italic;
      font-size: var(--paragraph_font_size);
      font-family: var(--Base_font);
      text-align: center;
      padding-inline: 10px;
    }
    &.embedded_img {
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 0px;
      left: 0px;
      z-index: 5;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.9);
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
        font-size: calc(5px + var(--paragraph_size));
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