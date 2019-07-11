module.exports.EscolherUsuario = function(application, req, res) {

    res.render('escolhaUsuario', { nome: req.session.nome });

}