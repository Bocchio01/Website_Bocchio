<template>
  <div v-if="data.length">
    <div
      class="affianca"
      v-for="(section, main_index) in data"
      :key="main_index"
    >
      <div class="box" v-for="(el, sub_index) in section" :key="sub_index">
        <h2>{{ el.title[$i18n.locale] }}</h2>
        <table
          v-if="el.type == 'table' && el.baseTab && editOn == null"
          @dblclick="activateEdit(el)"
        >
          <thead>
            <tr>
              <th v-for="(key, index) in el.baseTab" :key="index">
                {{ el.locale[$i18n.locale][key] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in el.data" :key="index">
              <td v-for="(key, index) in el.baseTab" :key="index">
                {{ row[key] }}
              </td>
            </tr>
          </tbody>
        </table>

        <table
          v-else-if="el.type == 'table' && editOn == null"
          @dblclick="activateEdit(el)"
        >
          <thead>
            <tr>
              <th v-for="(key, index) in Object.keys(el.data[0])" :key="index">
                {{ el.locale[$i18n.locale][key] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in el.data" :key="index">
              <td v-for="(cell, index) in row" :key="index">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>

        <table
          v-else-if="
            el.type == 'table' && el.sudoTab && editOn.split('.')[0] == el.table
          "
        >
          <thead>
            <tr>
              <th
                v-for="(key, index) in el.sudoTab"
                :key="index"
                @click="sort(key)"
              >
                {{ el.locale[$i18n.locale][key] }}
              </th>
              <th v-for="(key, index) in el.controls" :key="key">
                {{ el.locale[$i18n.locale][key] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in sortedColumns"
              :key="index"
              :class="[editOn == el.table + '.' + row['id'] ? 'focusOn' : '']"
            >
              <td
                v-for="(key, index) in el.sudoTab"
                :key="index"
                @dblclick="editOn = null"
                @click="editOn = el.table + '.' + row['id']"
              >
                <input
                  v-if="editOn == el.table + '.' + row['id']"
                  type="text"
                  :value="row[key]"
                  :id="el.table + '.' + row['id'] + '.' + key"
                />

                <p v-else>{{ row[key] }}</p>
              </td>
              <td v-if="el.controls.includes('modify')">
                <button
                  v-if="editOn == el.table + '.' + row['id']"
                  @click="sendModify(el.table + '.' + row['id'], el.sudoTab)"
                >
                  {{ el.locale[$i18n.locale]['modify'] }}
                </button>
              </td>
              <td v-if="el.controls.includes('delete')">
                <button
                  v-if="editOn == el.table + '.' + row['id']"
                  @click="sendDelete(el.table + '.' + row['id'])"
                >
                  {{ el.locale[$i18n.locale]['delete'] }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else-if="el.type == 'graph'" style="background-color: white">
          <img :src="el.url" :alt="el.title" />
        </div>

        <div v-else>
          <h2>SUDO</h2>
          <p>Sei entrato in modalità SUDO.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: [],
      SUDO: false,
    },

    data() {
      return {
        editOn: null,
        currentSort: 'id',
        currentSortDir: 'desc',
        sortedData: [],
      }
    },

    computed: {
      sortedColumns() {
        return this.sortedData.sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        })
      },
    },

    methods: {
      sort: function (s) {
        //if s == current sort, reverse
        if (s === this.currentSort) {
          this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
        }
        this.currentSort = s
      },

      sendModify(id, tab) {
        if ((id, tab)) {
          this.editOn = null
          this.$emit('modifyRecord', id, tab)
        }
      },

      sendDelete(id) {
        if (id) {
          this.editOn = null
          this.$emit('deleteRecord', id)
        }
      },

      activateEdit(el) {
        if (this.SUDO && el.sudoTab) {
          this.sortedData = el.data
          this.editOn = el.table
        }
      },
    },
  }
</script>

<style lang="scss">
  tr.focusOn {
    background-color: var(--Color_Main) !important;
    opacity: 0.8;

    input {
      width: -webkit-fill-available;
      background-color: white;
    }
  }
</style>
