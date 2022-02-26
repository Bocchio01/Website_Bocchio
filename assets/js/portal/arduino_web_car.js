import { reactive } from '@nuxtjs/composition-api'
var pointer = require('json-pointer')

var Web_car = {
  stage: reactive({ text: 'Collegati al server' }),
  name_of_client: reactive({ undefined: undefined }),
  type_of_client: 'Client',
  _: reactive({
    console: {},
  }),

  checher: null,
  ws: null,
  // url_server: 'ws://127.0.0.1:5000',
  url_server: 'wss://scientific-proximal-basement.glitch.me/',

  init: function () {
    var ws = new WebSocket(this.url_server)
    this.stage.text = 'Connesione in corso...'
    ws.onopen = () => {
      this.stage.text = 'Connesso'

      ws.send(JSON.stringify({ type: 'HandShake', value: this.type_of_client }))
      this.checher = setInterval(() => this.checkStatus(), 10000)
    }

    ws.onclose = () => {
      this.cleanAll()
    }

    ws.onerror = () => {
      alert("C'è stato un errore in fase di allacciamento al server. Riprova.")
      this.cleanAll()
    }

    ws.onmessage = (event) => {
      if (this.isJson(event.data)) {
        var message_obj = JSON.parse(event.data)
        //console.log(message_obj)

        for (var n in message_obj) {
          const data = message_obj[n]
          switch (data.type) {
            case 'add':
            case 'update':
              pointer.set(this._.console, data.jsonPointer, data.newValue)
              break
            case 'delete':
              pointer.remove(this._.console, data.jsonPointer)
              break
            case 'Init_list':
              this._.console = Object.assign({}, this._.console, data.newValue)
              break
            case 'Set_name':
              this.name_of_client = data.newValue
              break
            default:
              break
          }
        }
        this._.console = Object.assign({}, this._.console)
      }
    }
    return (this.ws = ws)
  },
  checkStatus: function () {
    if (this.ws.readyState == 3) {
      this.cleanAll()
    } else {
    }
  },
  isJson: function (str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return false
    }
    return true
  },
  cleanAll: function () {
    console.error('Il server è down!')
    this._.console = {}
    this.name_of_client = undefined
    this.stage.text = 'Collegati al server'
    clearInterval(this.checher)
  },
  disconnect: function (target) {
    this.ws.send(JSON.stringify({ type: 'Disconnect', value: [target] }))
  },

  senda(data) {
    //        console.log(data)
    try {
      this.ws.send(JSON.stringify({ value: data }))
    } catch (error) {}
  },
}

export { Web_car }
