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
      this.showMenu = false
      this.showSubMenu = false
    },
  },
}
</script>

<style>
header,
.dropdown-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-inline: 15px;
  z-index: 2;
  background-color: var(--background_color);
  border: var(--border_setting);
  border-radius: var(--header_border_radius);
  -webkit-border-radius: var(--header_border_radius);
  -moz-border-radius: var(--header_border_radius);
}

header a {
  display: block;
  margin: 15px 15px;
  font-weight: bold;
  font-family: var(--Special_font);
  font-size: var(--header_font_size);
}

header a:hover, header a.hover {
  color: var(--link_hover_color);
}

header div {
  display: flex;
  justify-content: space-between;
}

header ul {
  display: flex;
  list-style-type: none;
  padding: 0px;
}

header .dropdown-content {
  display: block;
  position: absolute;
  right: 0px;
  width: auto;
  justify-content: center;
}

/* menu icon */

header .menu-icon {
  display: none;
  cursor: pointer;
  padding: 30px;
}

header .menu-icon .navicon {
  align-self: center;
  background: #333;
  height: 2px;
  position: relative;
  transition: all 0.2s ease-out;
  width: 18px;
}

header .menu-icon .navicon:before,
header .menu-icon .navicon:after {
  background: #333;
  content: '';
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}

.navicon:before {
  top: 6px;
}

.navicon:after {
  top: -6px;
}

/* menu btn */

header .menu-btn {
  display: none;
}

header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

header .menu-btn:checked ~ .menu-icon .navicon:before,
header .menu-btn:checked ~ .menu-icon .navicon:after {
  top: 0;
}

@media (max-width: 1200px) {
  header {
    display: block;
  }
  header .menu-icon {
    display: inline-flex;
  }
  header li {
    text-align: center;
  }
  header .dropdown-content {
    width: 100%;
  }
  header ul {
    display: block;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
}

@media (max-width: 570px) {
  :root {
    --header_font_size: 19px;
  }
  header a {
    margin: 15px 0px;
  }
  header .menu-icon {
    padding: 15px;
  }
}
</style>
