const Contato = require("../models/Contato");

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos()
    res.render('index', { contatos });
}

