const express = require('express');
const home = require('./src/controllers/home')
const login = require('./src/controllers/login')
const route = express.Router()

//Rotas da home
route.get('/index', home.index)
route.get('/', home.index)
route.post('/', home.trataPOST)

//Rotas da login
route.get('/login/index', login.index)
route.get('/login/logout', login.logout)
route.post('/login/register', login.register)
route.post('/login/login', login.login)

module.exports = route;