// src/plugins/vue-leaflet.js
import Vue from 'vue'
import { LMap, LTileLayer, LMarker, LControlAttribution, LControlLayers, LControlScale, LPopup, LImageOverlay } from 'vue2-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import { Geodesic } from 'leaflet.geodesic'

import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'

// Build icon assets.
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const VueLeaflet = {
  install(Vue, options) {
    Vue.component('l-map', LMap)
    Vue.component('l-marker', LMarker)
    Vue.component('l-tile-layer', LTileLayer)

    Vue.component('l-popup', LPopup)
    Vue.component('l-control-scale', LControlScale)
    Vue.component('l-control-layers', LControlLayers)
    Vue.component('l-control-attribution', LControlAttribution)
    Vue.component('l-image-overlay', LImageOverlay)

    Vue.component('v-locatecontrol', Vue2LeafletLocatecontrol)

    Vue.prototype.GeoSearchControl = GeoSearchControl
    Vue.prototype.OpenStreetMapProvider = OpenStreetMapProvider
  },
}
Vue.use(VueLeaflet)
export default VueLeaflet
