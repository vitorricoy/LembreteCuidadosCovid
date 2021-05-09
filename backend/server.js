require('dotenv').config()
var express = require('express');
var cors = require('cors');
var userService = require('./services/user_service.js');

var app = express();

app.use(cors());

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

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 8000!');
});

setInterval(() => userService.enviarPush(), 60000);