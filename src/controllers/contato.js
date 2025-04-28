const req = require("express/lib/request");
const Contato = require("../models/Contato");

exports.index = (req, res) => {
  res.render("contato", { contato: {} });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save( () => res.redirect(req.session.originalUrl || `/contato/index/${req.params.id}`));
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

exports.editIndex = async (req, res) => {
  try {
    if(!req.params.id) return res.render('404');
    const contato = await Contato.buscaPorId(req.params.id);

    if (!contato) return res.render("404");
    res.render("contato", { contato });
  } catch (e) {
    res.render("404");
  }
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save( () => res.redirect(req.session.originalUrl || `/contato/index/${req.params.id}`));
      return;
    }

    req.flash("success", "Contato editado com sucesso.");
    req.session.save(() =>
      res.redirect(`/contato/index/${contato.contato._id}`),
    );
    return;
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};
