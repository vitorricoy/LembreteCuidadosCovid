var db = require('../agents/db_agent.js');
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

module.exports = { atualizaDistancia, listarUsuarios };