<template>
  <footer>
    <p>Puoi trovarmi anche qui</p>
    <div>
      <a href="https://github.com/Bocchio01"></a>
      <a href="https://t.me/Bocchio01"></a>
      <a href="https://www.instagram.com/bocchio_01/"></a>
    </div>
    <p class="copyright">Tommaso Bocchietti © {{ year }}</p>
  </footer>
</template>

<script>
export default {
  created() {
    this.year = new Date().getFullYear()
  }
}
</script>