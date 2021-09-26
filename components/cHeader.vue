<template>
  <header class="header">
    <nuxt-link id="header_name" to="/Home">Tommaso Bocchietti</nuxt-link>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn">
      <span class="navicon"></span>
    </label>
    <ul class="menu">
      <li><nuxt-link to="/Chi sono?">Chi sono?</nuxt-link></li>
      <li><nuxt-link to="/Articoli">Articoli</nuxt-link></li>
      <li class="dropdown">
        <a><p>App</p></a>
        <div class="dropdown-content">
          <nuxt-link to="/App/IoT/">IoT</nuxt-link>

          <a href="/App/IoT/" target="_self">IoT</a>
          <a href="/App/Orienteering/" target="_self">Orienteering</a>
        </div>
      </li>

      <!-- <li><a href="/main_pages/Forum/">Forum</a></li> -->
    </ul>
  </header>
</template>

<script>
export default {
  name: "cHeader",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*--- header ---*/

.dropdown:hover p {
  color: var(--orange);
}

.dropdown:hover .dropdown-content {
  display: flex !important;
  flex-direction: column;
}

.dropdown-content {
  display: none;
  position: fixed !important;
  right: 0px;
  width: auto !important;
}

.header,
.dropdown-content {
  position: relative;
  width: 100%;
  font-size: var(--header_font_size);
  font-weight: bold;
  padding-inline: 15px;
  border: 1px solid var(--gray);
  background-color: var(--white);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  z-index: 2;
}

.header a:hover {
  color: var(--orange);
}

.header #header_name {
  font-size: 1.1em;
  padding-inline-end: 0px !important;
}

.header #header_name,
.header .menu li a {
  height: var(--header_height);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: 15px;
}

.header .menu {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  clear: both;
  max-height: 0;
  transition: max-height 0.3s ease-out;
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  float: right;
  position: relative;
  user-select: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  width: var(--header_height);
  height: var(--header_height);
}

.header .menu-icon .navicon {
  align-self: center;
  background: #333;
  display: block;
  height: 2px;
  position: relative;
  transition: all 0.2s ease-out;
  width: 18px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: #333;
  content: "";
  display: block;
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

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 240px;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

@media (min-width: 1200px) {
  .header .menu li {
    float: left;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
  }
  .header .menu-icon {
    display: none;
  }
}

@media (max-width: 1200px) {
  .header .menu li {
    text-align: center;
  }
  .header .menu li a {
    height: calc(0.6 * var(--header_height));
  }
  .dropdown-content {
    width: 100% !important;
  }
}

@media (max-width: 570px) {
  :root {
    --header_height: 70px !important;
  }
  .header {
    padding-inline: 0px;
  }
  .header #header_name {
    padding-inline: 0px;
    padding-inline-start: 13px;
  }
  .header #header_name,
  .menu li a {
    font-size: 0.7em;
  }
}
</style>
