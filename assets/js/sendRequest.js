export default (args) => {
    const xhttp = new XMLHttpRequest()
    const FD = new FormData(args.form)
    for (const [key, value] of Object.entries(args)) {
        if (key != 'form') FD.append(key, value)
    }

    return new Promise((resolve, reject) => {
        xhttp.onreadystatechange = (e) => {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    const json = JSON.parse(xhttp.responseText)
                    if (json.Status == 0) {
                        resolve(json)
                    } else {
                        console.warn(json.Log[json.Log.length - 1])
                        reject(json)
                    }
                } else {
                    reject(
                        console.warn('Errore nella richiesta: Status -> ' + xhttp.status)
                    )
                }
            }
        }
        xhttp.open('POST', process.env.UTILS_SITE + '/PWS/main.php')

        xhttp.send(FD)
    })
}