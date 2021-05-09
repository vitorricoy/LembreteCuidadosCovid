require('dotenv').config()
var express = require('express');
var userService = require('./services/user_service.js');

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());

app.post('/', function (req, res) {
    userService.atualizaDistancia(req.body.distancia, req.body.usuario).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// app.get('/', function(req, res) {
//     userService.listarUsuarios().then((result) => {
//         res.json({'dados': result.data.dados});
//     }).catch((error) => {
//         console.log(error);
//         res.sendStatus(500);
//     });
// });

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

setInterval(() => userService.enviarPush(), 1000);