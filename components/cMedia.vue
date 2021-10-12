<template>
  <div class="media">
    
    <div v-if="type == 'img'" v-bind:class="[espansione ? 'embedded_img' : '']" @click="expand">
      <img :src="s" v-bind:alt="[a ? a : c]" />
      <p>{{ c }}</p>
    </div>

    <div v-if="type == 'vid'">
      <video controls>
        <source :src="s" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{{ c }}</p>
    </div>

    <div v-if="type == 'frame'">
      <iframe
        width="560"
        height="315"
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
  props: ['s', 'a', 'c', 'type'],
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

.media p, .embedded_img p {
    font-style: italic;
    font-size: var(--paragraph_font_size);
    font-family: var(--Base_font);
    text-align: center;
}

.media img {
    max-width: 100%;
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
    width: 90%;
}
</style>