var Around_the_globe = {
  dati: {
    partenza: {
      name: 'Partenza',
      coord_to_show: '',
      IconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      selector: null,
    },
    arrivo: {
      name: 'Arrivo',
      coord_to_show: '',
      IconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      selector: null,
    },
  },
  result: {
    azimut: 'NaN',
    distanza: 'NaN',
    inclinazione: 'NaN',
    lunghezza: 'NaN',
  },
  map: null,
  geodesic: null,

  //function
  loadMap: function () {

    var map = L.map('map').locate({ watch: true, setView: true })

    map.on('locationfound', function (e) {
      map.stopLocate()
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    L.Control.geocoder({ defaultMarkGeocode: false })
      .on('markgeocode', function (e) {
        map.setView(e.geocode.center, 10)
      })
      .addTo(map)
    const geodesic = new L.Geodesic().addTo(map)

    map.on('click', (e) => this.mapClicked(e.latlng))

    return this.map = map, this.geodesic = geodesic
  },

  mapClicked: function (location) {
    if (this.dati.partenza.selector == null) {
      this.dati.partenza = this.createMarker(this.dati.partenza, location)
    } else if (this.dati.arrivo.selector == null) {
      this.dati.arrivo = this.createMarker(this.dati.arrivo, location)
    } else {
      alert(
        "Elimina o modifica uno dei due marker già creati per posizionarne un'altro."
      )
    }
    try {
      init()
    } catch (error) { }
  },

  createMarker: function (el, loc) {
    el.coord_to_show = loc.lat.toFixed(5) + ', ' + loc.lng.toFixed(5)

    var myIcon = new L.Icon({
      iconUrl: el.IconUrl,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    el.selector = L.marker(loc, { draggable: true, icon: myIcon })
      .bindPopup('<p>Punto di ' + el.name + '</p>')
      .addTo(this.map)
    el.selector.on('dragend', () => this.update(el))
    el.selector.on('dblclick', () => this.clean(el))
    try {
      this.init()
    } catch (error) { }
    return el
  },

  clean: function (el) {
    el.coord_to_show = ''
    try {
      this.map.removeLayer(el.selector)
    } catch (error) {

    }
    this.geodesic.setLatLngs([])
    el.selector = null
  },

  update: function (el) {
    try {
      el.coord_to_show = el.selector.getLatLng().lat.toFixed(5) + ', ' + el.selector.getLatLng().lng.toFixed(5)
      this.init()
    } catch (error) { }

  },

  inverti: function () {
    try {
      let state1 = this.dati.partenza.selector.getLatLng()
      this.dati.partenza.selector.setLatLng(this.dati.arrivo.selector.getLatLng()).update()
      this.dati.arrivo.selector.setLatLng(state1).update()

      this.init()
    }
    catch (error) { }
    this.update(this.dati.partenza)
    this.update(this.dati.arrivo)

  },

  focusOn: function (el) {
    try {
      this.map.setView(L.latLng(el.selector.getLatLng(), 10))
    } catch (error) {
      console.loh('Il marker non esiste')
    }
  },

  /*
  Script per il calcolo dell'azimut e distanze tra due luoghi sulla Terra
  Viene considerata la Terra come l'ellissoide di Hayford.
  I calcoli vengono efettuati considerando tutti i luoghi a quota 0 m.l.s.
  */

  // Raggio equatore e raggio poli
  Rpo: 6356752,
  Req: 6378137,

  init: function () {
    this.geodesic.setLatLngs([this.dati.partenza.selector.getLatLng(), this.dati.arrivo.selector.getLatLng()])
    //Lettura dati iniziali da stringhe del tipo: 'latitudine, longitudine'

    var polari_0 = math.multiply(Object.values(this.dati.partenza.selector.getLatLng()), math.PI / 180);
    var polari_1 = math.multiply(Object.values(this.dati.arrivo.selector.getLatLng()), math.PI / 180);

    polari_0[0] = (math.PI / 2) - polari_0[0]
    polari_1[0] = (math.PI / 2) - polari_1[0]

    this.main(polari_0, polari_1)
  },

  main: function (polari_0, polari_1) {

    var cartesiane_0 = this.terna_cartesiana(polari_0)
    var cartesiane_1 = this.terna_cartesiana(polari_1)

    var azimut_bussola = 180 - this.angolo_vettori(this.vettore_piano_cartesiano([0, 0, 0], [0, 0, 1], cartesiane_0), this.vettore_piano_cartesiano([0, 0, 0], cartesiane_0, cartesiane_1));
    //Controllo sull'angolo se maggiore di 180°
    if (polari_1[1] < polari_0[1]) azimut_bussola = 360 - azimut_bussola

    var azimut_tunnel = math.abs(this.angolo_vettori(cartesiane_0, math.subtract(cartesiane_0, cartesiane_1)) - 90)

    this.result.azimut = azimut_bussola.toFixed(2)
    this.result.distanza = (new L.Geodesic().distance(this.dati.partenza.selector.getLatLng(), this.dati.arrivo.selector.getLatLng()) / 1000).toFixed(2)

    this.result.inclinazione = azimut_tunnel.toFixed(2)
    this.result.lunghezza = ((math.norm(math.subtract(cartesiane_0, cartesiane_1))) / 1000).toFixed(2)

  },

  terna_cartesiana: function (polare) {
    /*
        Calcolo delle coordinate cartesiane di un punto a partire dalle due sue coordinate polari
        alfa => longitudine
        beta => latitudine
    */

    const alfa = polare[1]
    const beta = polare[0]

    var terna_cartesiane = [
      this.Req * math.sin(alfa) * math.sin(beta),
      this.Req * math.cos(alfa) * math.sin(beta),
      this.Rpo * math.cos(beta)
    ]

    return terna_cartesiane
  },

  vettore_piano_cartesiano: function (p1, p2, p3) {
    // Calcolo del vettore matematico (array) generatore del piano passante per i 3 punti di partenza

    var vettore = math.cross(math.subtract(p1, p2), math.subtract(p1, p3))
    var vettore = math.divide(vettore, math.norm(vettore))

    return vettore
  },

  angolo_vettori: function (vet_1, vet_2) {
    // Calcolo dell'angolo in gradi tra due vettori matematici

    var CosTheta = math.max(math.min(math.dot(vet_1, vet_2) / (math.norm(vet_1) * math.norm(vet_2)), 1), -1)
    var Theta = math.divide(math.re(math.acos(CosTheta)), math.PI / 180)

    return Theta
  }
}

export { Around_the_globe };