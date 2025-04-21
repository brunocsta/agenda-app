const Login = require('../models/Login');
exports.index = (req, res) => {
    res.render('login');
}

exports.register = async (req, res) => {
    try{

        const login = new Login(req.body);
        await login.register();
    
        if (login.errors.length) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login/index'));
            return
        } else {
            req.flash('success', 'Seja bem-vindo(a), seu registro foi concluído!');
            req.session.save(() => res.redirect('/login/index'));
            return
        }
        
    } catch (e) {
        console.log(e);
        res.render('404');
        return
    }

}

exports.access = (req, res) => {}