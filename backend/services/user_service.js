var db = require('../agents/db_agent.js');
var firebase = require('../agents/firebase_agent.js');

function atualizaDistancia(distancia, usuario) {
    let promise = new Promise(function(resolve, reject) {
        db.usuarioNoBanco(usuario).then((result) => {
            if(result.data.valido) {
                db.atualizaUsuario(usuario, distancia).then((result) => {
                    resolve({msg: 'Success'});
                }).catch((error) => {
                    reject(error);
                });
            } else {
                db.insereUsuario(usuario, distancia).then((result) => {
                    resolve({msg: 'Success'});
                }).catch((error) => {
                    reject(error);
                });
            }
        }).catch((error) => {
            reject(error);
        })
    });
    return promise;
}

function listarUsuarios() {
    let promise = new Promise(function(resolve, reject) {
        db.listarTudo().then((result) => {
            resolve({msg: 'Success', data: {dados: result.data.dados}});
        }).catch((error) => {
            reject(error);
        })
    });
    return promise;
}

function enviarPush() {
    listarUsuarios().then((result)=> {
        for(usuarios of result.data.dados) {
            if(usuarios.distancia !== -1) {
                firebase.enviarNotificacao(usuarios.usuario, usuarios.distancia);
                console.log("enviou notificacao para usuario: " + usuarios.usuario);
            }
        }
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = { atualizaDistancia, listarUsuarios, enviarPush};