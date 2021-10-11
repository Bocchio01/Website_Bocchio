<template>
  <div
    class="container"
    v-show="useTag ? tags.some((r) => obj.tag.includes(r)) : true"
  >
    <nuxt-link class="link_hidden" :to="obj.path" v-if="type == 'nuxt-link'"><mark> {{ msg }}</mark></nuxt-link>
    <a class="link_hidden" :href="obj.path" v-else ><mark> {{ msg }}</mark></a>
    <div style="flex: auto">
      <h1>{{ obj.title }}</h1>
      <div class="text_container" v-html="obj.paragraph.join('<br>')"></div>
    </div>
    <img class="img_container" :src="obj.img.src" :alt="obj.img.alt" />
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
    },
    useTag: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
    },
    msg: {
      type: String,
      default: 'Scopri di più',
    },
    type: {
      type: String,
      default: 'nuxt-link'
    }
  },
}
</script>