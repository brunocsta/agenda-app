const Contato = require("../models/Contato");

exports.index = (req, res) => {
  res.render("contato", {contato: {}});
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato/index"));
      return;
    }
    req.flash("success", "Contato registrado com sucesso!");
    req.session.save(() =>
      res.redirect(`/contato/index/${contato.contato._id}`),
    );
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.editIndex = async(req, res) => {
  try{
    const contato = await Contato.buscaPorId(req.params.id);
    
    if(!contato) return res.render('404');
    console.log('Contato retornado:', contato);
    res.render('contato', {contato});
  } catch(e) {
    res.render('404')
  }
};
