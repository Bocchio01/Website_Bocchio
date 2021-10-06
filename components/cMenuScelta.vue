<template>
  <nav>
    <div>
      <p
        @click="addOrRemove(tag)"
        v-for="(tag, index) in tags"
        :key="index"
        v-bind:class="{ active: isActive[tag] }"
      >
        {{ tag }}
      </p>
    </div>
    <p class="fallback" v-show="!tags_selected.length">Seleziona un argomento.</p>
  </nav>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default() {
        return [
          'Programmazione',
          'Meccanica',
          'Fisica',
          'Matematica',
          'Orienteering',
        ]
      },
    },
  },
  data() {
    return {
      tags_selected: [],
      isActive: Object.assign(...this.tags.map((k) => ({ [k]: false }))),
    }
  },
  methods: {
    addOrRemove(tag_clicked) {
      var index = this.tags_selected.indexOf(tag_clicked)

      if (index === -1) {
        this.tags_selected.push(tag_clicked)
        this.isActive[tag_clicked] = true
      } else {
        this.tags_selected.splice(index, 1)
        this.isActive[tag_clicked] = false
      }
      this.$emit('toParent', this.tags_selected)
    },
  },
}
</script>