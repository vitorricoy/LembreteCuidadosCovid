const https = require('https')

function enviarNotificacao(usuario, distancia) {
    const data = JSON.stringify({
        notification: {
            title: "Lembrete de Cuidados",
            body: "Você está a "+distancia+" km de casa desde que abriu o app pela última vez. Lembre-se dos cuidados contra a covid ao sair de casa.",
            click_action: process.env.ACTION_PUSH,
            icon: process.env.ICON_PUSH
        },
        to: usuario
    });
    
    const options = {
        hostname: process.env.URL_PUSH,
        path: process.env.PATH_PUSH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': 'key='+process.env.KEY_PUSH
        }
    }
    console.log(options);

    const req = https.request(options);

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()
}

module.exports = { enviarNotificacao };