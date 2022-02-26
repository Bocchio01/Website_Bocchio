import { abs, acos, cos, cross, divide, dot, max, min, multiply, norm, pi, re, sin, subtract } from 'mathjs'

var Around_the_globe = {
  result: {
    azimut: 'NaN',
    distanza: 'NaN',
    inclinazione: 'NaN',
    lunghezza: 'NaN',
  },

  /*
  Script per il calcolo dell'azimut e distanze tra due luoghi sulla Terra
  Viene considerata la Terra come l'ellissoide di Hayford.
  I calcoli vengono efettuati considerando tutti i luoghi a quota 0 m.l.s.
  */

  // Raggio equatore e raggio poli
  Rpo: 6356752,
  Req: 6378137,

  init: function (array_of_point) {
    //Lettura dati iniziali da stringhe del tipo: 'latitudine, longitudine'

    var polari_0 = multiply(Object.values(array_of_point[0]), pi / 180)
    var polari_1 = multiply(Object.values(array_of_point[1]), pi / 180)

    polari_0[0] = pi / 2 - polari_0[0]
    polari_1[0] = pi / 2 - polari_1[0]

    this.main(polari_0, polari_1)
  },

  main: function (polari_0, polari_1) {
    var cartesiane_0 = this.terna_cartesiana(polari_0)
    var cartesiane_1 = this.terna_cartesiana(polari_1)

    var azimut_bussola =
      180 - this.angolo_vettori(this.vettore_piano_cartesiano([0, 0, 0], [0, 0, 1], cartesiane_0), this.vettore_piano_cartesiano([0, 0, 0], cartesiane_0, cartesiane_1))
    //Controllo sull'angolo se maggiore di 180°
    if (polari_1[1] < polari_0[1]) azimut_bussola = 360 - azimut_bussola

    var azimut_tunnel = abs(this.angolo_vettori(cartesiane_0, subtract(cartesiane_0, cartesiane_1)) - 90)

    this.result.azimut = azimut_bussola.toFixed(2)

    this.result.inclinazione = azimut_tunnel.toFixed(2)
    this.result.lunghezza = (norm(subtract(cartesiane_0, cartesiane_1)) / 1000).toFixed(2)
  },

  terna_cartesiana: function (polare) {
    /*
        Calcolo delle coordinate cartesiane di un punto a partire dalle due sue coordinate polari
        alfa => longitudine
        beta => latitudine
    */

    const alfa = polare[1]
    const beta = polare[0]

    var terna_cartesiane = [this.Req * sin(alfa) * sin(beta), this.Req * cos(alfa) * sin(beta), this.Rpo * cos(beta)]

    return terna_cartesiane
  },

  vettore_piano_cartesiano: function (p1, p2, p3) {
    // Calcolo del vettore matematico (array) generatore del piano passante per i 3 punti di partenza

    var vettore = cross(subtract(p1, p2), subtract(p1, p3))
    var vettore = divide(vettore, norm(vettore))

    return vettore
  },

  angolo_vettori: function (vet_1, vet_2) {
    // Calcolo dell'angolo in gradi tra due vettori matematici

    var CosTheta = max(min(dot(vet_1, vet_2) / (norm(vet_1) * norm(vet_2)), 1), -1)
    var Theta = divide(re(acos(CosTheta)), pi / 180)

    return Theta
  },
}

export { Around_the_globe }
