const express = require('express');
const home = require('./src/controllers/home')
const route = express.Router()

module.exports = route;

route.get('/', home.paginaInicial)
route.post('/', home.trataPOST)

