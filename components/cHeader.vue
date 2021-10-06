<template>
  <header>
    <div>
      <nuxt-link to="/Home">Tommaso Bocchietti</nuxt-link>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn" @click="Menu_click">
        <span class="navicon"></span>
      </label>
    </div>
    <ul :style="{ 'max-height': [showMenu ? '240px' : '0px'] }">
      <li><nuxt-link to="/Articolo/Chi sono">Chi sono?</nuxt-link></li>
      <li><nuxt-link to="/Elenco/Articolo">Articoli</nuxt-link></li>
      <li>
        <a @click="SubMenu_click" :class="{hover: showSubMenu}">App</a>
        <ul class="dropdown-content" v-show="(showSubMenu)">
          <li><nuxt-link to="/Elenco/Portale">Portali</nuxt-link></li>
          <li><nuxt-link to="#">Orienteering</nuxt-link></li>
        </ul>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      showSubMenu: false,
    }
  },
  methods: {
    Menu_click() {
      this.showMenu = !this.showMenu
      this.showSubMenu = false
    },
    SubMenu_click() {
      this.showSubMenu = !this.showSubMenu
    },
  },
  watch: {
    $route() {
      document.getElementById('menu-btn').checked = false
      this.showMenu = false
      this.showSubMenu = false
    },
  },
}
</script>