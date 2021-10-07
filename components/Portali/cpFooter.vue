<template>
  <footer>
    <div class="o_separator"></div>

    <div class="link">
      <NuxtLink to="/Home">Torna alla Home</NuxtLink>
      <p>|</p>
      <NuxtLink to="/Elenco/Portale">Torna all'elenco dei portali</NuxtLink>
    </div>
    <p class="copyright">Tommaso Bocchietti © {{ year }}</p>
  </footer>
</template>

<script>
export default {
  created() {
    this.year = new Date().getFullYear()
  },
}
</script>

<style scoped>
footer {
  width: 100%;
  padding-bottom: 10px;
  text-align: center;
  font-weight: bold;
}
footer .link {
  font-size: var(--app_paragraph_size);
  display: flex;
  flex-direction: row;
  justify-content: center;

}
footer .link a {
  padding-inline: 10px;
  text-decoration: underline;
  z-index: 5;
}
footer .link a:hover {
  color: var(--link_hover_color)
}

footer .copyright {
  color: #a2a2a2;
  font-family: var(--Special_font);
  font-size: var(--app_title_size);
  display: flex;
  justify-content: center;
}
</style>