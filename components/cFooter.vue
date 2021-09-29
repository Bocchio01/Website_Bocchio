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


<style>
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  width: 100%;
  border: var(--border_setting);
  background-color: var(--background_color);
  -webkit-border-radius: var(--header_border_radius);
  -moz-border-radius: var(--header_border_radius);
  border-radius: var(--header_border_radius);
  z-index: 2;
  padding-block: 20px;
}

footer p {
  color: var(--text_color);
  font-weight: bold;
  font-family: var(--Special_font);
  font-size: var(--footer_font_size);
  width: fit-content;
}

footer .copyright {
  color: #a2a2a2;
  border-top: var(--border_setting);
  border-top-color: black;
}

footer div a {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 50%;
  border: var(--border_setting);
  margin: 10px;
}

footer div a:nth-child(1) {
  background: url('~assets/img/GitHub.png') no-repeat;
  background-size: contain;
}

footer div a:nth-child(2) {
  background: url('~assets/img/Telegram.png') no-repeat;
  background-size: contain;
}

footer div a:nth-child(3) {
  background: url('~assets/img/Instagram.png') no-repeat;
  background-size: contain;
}

footer div a:hover {
  transform: scale(1.1);
}

@media (max-width: 570px) {
  :root {
    --footer_font_size: 18px;
  }
  footer div a {
    width: 40px;
    height: 40px;
  }
}
</style>
