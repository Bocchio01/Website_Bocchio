import { cos, floor, pi, pow, sin, sqrt, tan } from 'mathjs'

var fromUTMtoWGS84 = {
  result: {
    latitude: 'NaN',
    longitude: 'NaN',
  },

  // Constants.
  // Symbols as used in USGS PP 1395: Map Projections - A Working Manual
  DatumEqRad: [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4, 6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3],
  DatumFlat: [
    298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788, 299.1527052,
    300.8021499,
  ],

  Item: 0, // default

  init: function () {
    this.a = this.DatumEqRad[this.Item] // equatorial radius (meters)
    this.f = 1 / this.DatumFlat[this.Item] // polar flattening
    this.drad = pi / 180 // convert degrees to radians

    // Mor constants extracted from the this.function =
    this.k0 = 0.9996 // scale on central meridian
    this.b = this.a * (1 - this.f) // polar axis
    this.e = sqrt(1 - (this.b / this.a) * (this.b / this.a)) // eccentricity
    this.e0 = this.e / sqrt(1 - this.e * this.e) // called e' in reference
    this.esq = 1 - (this.b / this.a) * (this.b / this.a) // e² for use in expansions
    this.e0sq = (this.e * this.e) / (1 - this.e * this.e) // e0² — always even powers
  },

  utmToLatLon: function (x, y, utmz, north) {
    this.init()
    // First some validation:
    if (x < 160000 || x > 840000) {
      alert('Outside permissible range of easting values.')
      return
    }
    if (y < 0) {
      alert('Negative values are not allowed for northing.')
      return
    }
    if (y > 10000000) {
      alert('Northing may not exceed 10,000,000.')
      return
    }

    // Now the actual calculation:
    const zcm = 3 + 6 * (utmz - 1) - 180 // central meridian of zone
    const e1 = (1 - sqrt(1 - this.e * this.e)) / (1 + sqrt(1 - this.e * this.e)) // called e₁ in USGS PP 1395
    const M0 = 0 // in case origin other than zero lat - not needed for standard UTM

    let M // arc length along standard meridian
    if (north) {
      M = M0 + y / this.k0
    } else {
      // southern hemisphere
      M = M0 + (y - 10000000) / k
    }
    const mu = M / (this.a * (1 - this.esq * (1 / 4 + this.esq * (3 / 64 + (5 * this.esq) / 256))))
    let phi1 = mu + e1 * (3 / 2 - (27 * e1 * e1) / 32) * sin(2 * mu) + e1 * e1 * (21 / 16 - (55 * e1 * e1) / 32) * sin(4 * mu) // footprint Latitude
    phi1 = phi1 + e1 * e1 * e1 * ((sin(6 * mu) * 151) / 96 + (e1 * sin(8 * mu) * 1097) / 512)
    const C1 = this.e0sq * pow(cos(phi1), 2)
    const T1 = pow(tan(phi1), 2)
    const N1 = this.a / sqrt(1 - pow(this.e * sin(phi1), 2))
    const R1 = (N1 * (1 - this.e * this.e)) / (1 - pow(this.e * sin(phi1), 2))
    const D = (x - 500000) / (N1 * this.k0)
    let phi = D * D * (1 / 2 - (D * D * (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * this.e0sq)) / 24)
    phi = phi + (pow(D, 6) * (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * this.e0sq - 3 * C1 * C1)) / 720
    phi = phi1 - ((N1 * tan(phi1)) / R1) * phi

    // Output Latitude:
    const outLat = floor((1000000 * phi) / this.drad) / 1000000

    const lng = (D * (1 + D * D * ((-1 - 2 * T1 - C1) / 6 + (D * D * (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * this.e0sq + 24 * T1 * T1)) / 120))) / cos(phi1)
    const lngd = zcm + lng / this.drad

    // Output Longitude:
    const outLon = floor(1000000 * lngd) / 1000000

    this.result.latitude = outLat
    this.result.longitude = outLon
  },
}

export { fromUTMtoWGS84 }
