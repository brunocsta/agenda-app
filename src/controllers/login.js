const Login = require('../models/Login');
exports.index = (req, res) => {
    res.render('login');
}

exports.register = (req, res) => {
    const login = new Login(req.body)
    login.register()
    res.send(login.errors);

}

exports.access = (req, res) => {}