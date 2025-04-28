const express = require("express");
const route = express.Router();
const home = require("./src/controllers/home");
const login = require("./src/controllers/login");
const contato = require("./src/controllers/contato");
const { loginRequired, saveLastUrl } = require('./src/middlewares/middeware')
//Rotas da home
route.get("/", home.index);


//Rotas da login
route.get("/login/index", login.index);
route.get("/login/logout", login.logout);
route.post("/login/register", login.register);
route.post("/login/login", login.login);

//rotas de contato
route.get("/contato/index", loginRequired, saveLastUrl, contato.index);
route.post("/contato/register", loginRequired, contato.register);
route.get("/contato/index/:id", loginRequired, saveLastUrl, contato.editIndex);
route.post("/contato/edit/:id", loginRequired, contato.edit);
route.get("/contato/delete/:id", loginRequired, saveLastUrl, contato.delete);

module.exports = route;
