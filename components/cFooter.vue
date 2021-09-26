<template>
  <div id="footer">
    <footer>
      <p>Puoi trovarmi anche qui</p>
      <div class="social">
        <a href="https://github.com/Bocchio01"></a>
        <a href="https://t.me/Bocchio01"></a>
        <a href="https://www.instagram.com/bocchio_01/"></a>
      </div>
      <p id="copyright">Tommaso Bocchietti © {{ count }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "cFooter",
  data: function () {
    return {
      count: new Date().getFullYear()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*--- footer ---*/

#footer {
	display: inline-flex;
	margin-top: auto;
	width: 100%;
	font-weight: bold;
	font-size: calc(0.9*var(--header_font_size));
	border: 1px solid var(--gray);
	background-color: var(--white);
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	z-index: 2;
	justify-content: center;
	text-align: center;
	padding: 20px 20px;
	color: var(--black);
}

#footer .social {
	padding: 10px;
}

#footer .social a {
	width: 50px;
	height: 50px;
	display: inline-block;
	border-radius: 50%;
	border: 1px solid #ccc;
	margin: 0 8px;
	color: inherit;
	overflow: hidden;
}

#footer .social a:nth-child(1) {
	background: url('~assets/img/GitHub.png') no-repeat;
	background-size: contain;
}

#footer .social a:nth-child(2) {
	background: url('~assets/img/Telegram.png') no-repeat;
	background-size: contain;
}

#footer .social a:nth-child(3) {
	background: url('~assets/img/Instagram.png') no-repeat;
	background-size: contain;
}

#footer p {
	margin: 0px;
}

#footer #copyright {
	color: var(--gray);
	border-top: 1px solid var(--black);
	;
}

#footer div a:hover {
	transform: scale(1.1);
}

@media (max-width: 1030px) {
	#footer {
		font-size: 15px;
	}
	#footer .social a {
		width: 40px;
		height: 40px;
	}
}
</style>
