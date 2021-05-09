const axios = require('axios')

function enviarNotificacao(usuario, distancia) {
    axios.post("https://"+process.env.URL_PUSH+process.env.PATH_PUSH, {
            notification: {
                title: "Lembrete de Cuidados",
                body: "Você está a "+distancia+" km de casa desde que abriu o app pela última vez. Lembre-se dos cuidados contra a covid ao sair de casa.",
                click_action: process.env.ACTION_PUSH,
                icon: process.env.ICON_PUSH
            },
            to: usuario
        }, {headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key='+process.env.KEY_PUSH 
        }}).then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        }).catch(error => {
            console.error(error)
        });
}

module.exports = { enviarNotificacao };