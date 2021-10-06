<template>
<div>
<div class="sinistra">
		<div class="hide_bar">
			<ul class="menu">
			</ul>
		</div>
		<div class="container">

			<div id='Guida' style="display: none;">
				<h1>Istruzioni</h1>
				<p>
					Questo script ti permetterà di calcolare con facilità l'azimut e la distanza tra due punti del
					mondo.<br><br>
					<b>Comandi disponibili</b> oltre all'inserimento/modifica manuale delle coordinate dai box input
					sottostanti:
				<ul>
					<li>Ricerca coordinate -> Lente di ingrandiemnto in alto a destra sulla mappa</li>
					<li>Selezione coordinate -> Click sulla mappa</li>
					<li>Modifica coordinate -> Trascinamento del punto sulla mappa</li>
					<li>Eliminazione coordinate -> Doppio click del punto sulla mappa</li>
				</ul>
				<br>
				Con il tasto <span style="font-size: var(--f_medium);">&#8597;</span> è possibile invertire le
				coordinate di partenza con quelle di
				arrivo.<br>
				Sulla mappa il punto di partenza è segnato in rosso, mentre quello di arrivo in verde.<br><br>
				Tutti i risultati relativi ai dati inseriti si trovano a fine pagina.<br>
				Per nascondere il riquadro "Istruzioni" cliccare sul menu a inizio pagina.

				</p>
				<div class="horizontal_line"></div>
			</div>

			<div id='Dati'>
				<h1>Dati in input</h1>
				<p>Inserisci di seguito le coordinate o clicca sulla mappa:</p>

				<table class="border">
					<tr>
						<th>
							<img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" height="25px" onclick="update_marker('partenza')">
						</th>
						<th>
							<input type="text" id="partenza" onchange="update_marker(this.id)">
						</th>
						<th rowspan="2">
							<button onclick="inverti()">
								<span style="font-size: var(--f_big); padding-left: 15px;">&#8597;</span>
							</button>
						</th>
						<th>
							<button onclick="clean('partenza')">🗑️</button>
						</th>
					</tr>
					<tr>
						<th><img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
								height="25px" onclick="update_marker('arrivo')"></th>
						<th>
							<input type="text" id="arrivo" onchange="update_marker(this.id)">
						</th>
						<th>
							<button onclick="clean('arrivo')">🗑️</button>
						</th>
					</tr>
				</table>

				<h1>Dati in output</h1>
				<p>Visualizza qui i risultati:</p>
				<table>
					<tr>
						<th colspan="2">Indicazioni reali</th>
					</tr>
					<tr>
						<th class="border">
							<div class="compass-bg">
								<img class="compass-pointer"
									src="http://vasilis-tsirimokos.com/codepen/compass-pointer.png" />
							</div>
						</th>
						<th class="border">
							<p id="compass">Azimut: NaN</p>
							<p id="compass_dist">Distanza: NaN</p>
						</th>
					</tr>
					<tr>
						<th colspan="2">Tunnel</th>
					</tr>
					<tr>
						<th class="border">
						</th>
						<th class="border">
							<div id="tunnel">Inclinazione: NaN</div>
							<div id="tunnel_dist">Lunghezza: NaN</div>
						</th>
					</tr>
				</table>
			</div>
		</div>
		<div class="footer_min">
			<p id="copyright"></p>

		</div>
	</div>
	<div class="vertical_line"></div>

	<div class="destra">
		<div id='map'></div>
	</div>
</div>

</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css',
        },
      ],
      script: [
        {
          hid: 'stripe',
          src: 'https://unpkg.com/mathjs@9.4.4/lib/browser/math.js',
          defer: true,
        },
        {
          hid: 'stripe',
          src: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
          defer: true,
        },
        {
          hid: 'stripe',
          src: 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js',
          defer: true,
        },
        {
          hid: 'stripe',
          src: 'https://cdn.jsdelivr.net/npm/leaflet.geodesic',
          defer: true,
        },
      ],
    }
  },
}	
</script>