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

    <div v-if="type == 'vid'">
      <video controls>
        <source :src="s" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{{ c }}</p>
    </div>

    <div v-if="type == 'frame'">
      <iframe
        width="80%"

        :src="s"
        v-bind:title="[a ? a : c]"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <p>{{ c }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    s: { type: String },
    a: { type: String },
    c: { type: String },
    type: { type: String },
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
}

.media figcaption,
.embedded_img figcaption {
  font-style: italic;
  font-size: var(--paragraph_font_size);
  font-family: var(--Base_font);
  text-align: center;
}

.media img {
  max-width: 100%;
  //max-height: 450px;
}

.media video {
  width: 80%;
}

.media iframe {
  width: 80%;
  height: 400px;
}

/*--- embedded_img ---*/

.embedded_img {
  position: fixed;
  z-index: 5;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  overflow: auto;
}

.embedded_img img {
  z-index: 7;
  margin: auto;
  display: block;
  max-width: 90vw;
  max-height: 90vh;
}
</style>