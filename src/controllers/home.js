exports.paginaInicial = (req, res) => {
    req.session.usuario = {name: 'Bruno', logado: true}
    console.log(req.session.usuario);
    res.render('index');
}