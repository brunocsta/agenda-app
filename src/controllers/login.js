const Login = require('../models/Login');
exports.index = (req, res) => {
    res.render('login');
}

exports.register = async (req, res) => {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length) {
        req.flash('errors', login.errors);
        req.session.save(() => res.redirect('/login/index'));
        return
    } else {
        req.flash('success', 'You have successfully registered.');
        req.session.save(() => res.redirect('/login/index'));
        return
    }

}

exports.access = (req, res) => {}