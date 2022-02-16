<template>
  <div class="searchBar wrap">
    <div style="flex: 1 1 200px">
      <label>{{ $t('cSearch.0') }}</label>
      <input id="search" type="search" v-model="title_to_view" placeholder="Titolo.." autocomplete="new-password" />
    </div>
    <hr v-if="tags" />
    <div v-if="tags" style="flex: 4 1 400px">
      <label>{{ $t('cSearch.1') }}</label>
      <CMenuScelta @toParent="handler" :tags="tags" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
    },
  },
  data() {
    return {
      title_to_view: '',
      tags_to_view: [],
    }
  },
  mounted() {
    document.getElementById('search').autocomplete = Math.random()
  },
  methods: {
    handler(value) {
      this.tags_to_view = value
    },
    sendData() {
      this.$emit('toParent', {
        tags: this.tags_to_view,
        title: this.title_to_view,
      })
    },
  },
  watch: {
    title_to_view() {
      this.sendData()
    },
    tags_to_view() {
      this.sendData()
    },
  },
}
</script>

<style lang="scss">
.searchBar {
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: stretch;
  row-gap: 20px;
  column-gap: 20px;
  > div {
    label {
      font-weight: bold;
      display: block;
      width: 100%;
      color: var(--Color_Text);
      font-size: calc(1.2 * var(--Size_Text_Wrap));
    }
    input,
    nav {
      width: 100%;
      margin-block: 10px;
    }
    input {
      font-family: var(--Font_Base);
      padding: 5px 10px;
      border: 2px solid var(--Color_Main);
      border-radius: var(--Border_Radius_Header);
      color: var(--Color_Text);
      background-color: var(--Color_Text_BG);
      outline: none;
      font-size: calc(1.22 * var(--Size_Text_Wrap));
    }
  }
}

@media (max-width: 1000px) {
  .searchBar {
    display: block;
    hr {
      margin-block: 10px;
    }
  }
}
</style>
