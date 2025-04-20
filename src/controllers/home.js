exports.index = (req, res) => {

    res.render('index');
}

exports.trataPOST = (req, res) => {
    res.send(req.body);
    return
}