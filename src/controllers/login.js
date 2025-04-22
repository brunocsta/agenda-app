const Login = require('../models/Login');
exports.index = (req, res) => {
    if(req.session.user) return res.render('login-login')
    return res.render('login');
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


exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length){
    req.flash('errors', login.errors);
    req.session.save(() => res.redirect('/login/index'));
    return 
   } 

   req.flash('success', 'Bem-vindo de volta!');
   req.session.user = login.user; // Se quiser salvar o usuário na sessão
   req.session.save(() => res.redirect('/')); // Redireciona pro dashboard, home, etc
   return;
   
  } catch (e) {
    console.log(e);
    res.render('login');
  }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}