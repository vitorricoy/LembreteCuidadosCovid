var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data.db', autoload: true });
db.ensureIndex({fieldName: 'usuario', unique: true }, function (err) {console.log(err)});

function usuarioNoBanco(usuario) {
    let promise = new Promise(function(resolve, reject) {
        db.find({"usuario": usuario}, function (err, docs) {
            if(err !== null) {
                reject(new Error({msg: err}));
            } else {
                resolve({msg: 'Success', data: {valido: Boolean(docs.length === 1)}})
            }
        });
    });
    return promise;
}

function insereUsuario(usuario, distancia) {
    let promise = new Promise(function(resolve, reject) {
        db.insert({usuario: usuario, distancia: distancia}, function (err, newDoc) {   // Callback is optional
            if(err !== null) {
                reject(new Error({msg: err}));
            } else {
                resolve({msg: 'Success'});
            }
        });
    });
    return promise;
}

function atualizaUsuario(usuario, distancia) {
    let promise = new Promise(function(resolve, reject) {
        db.update({usuario: usuario}, {usuario: usuario, distancia: distancia}, {}, function (err, newDoc) {   // Callback is optional
            if(err !== null) {
                reject(new Error({msg: err}));
            } else {
                resolve({msg: 'Success'});
            }
        });
    });
    return promise;
}

function listarTudo() {
    let promise = new Promise(function(resolve, reject) {
        db.find({}, function (err, docs) {
            if(err !== null) {
                reject(new Error({msg: err}));
            } else {
                resolve({msg: 'Success', data: {dados: docs}})
            }
        });
    });
    return promise;
}

module.exports = { usuarioNoBanco, insereUsuario, atualizaUsuario, listarTudo };