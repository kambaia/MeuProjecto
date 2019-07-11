module.exports.Enviarconvocatoria = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        res.render('colegios/enviar-convocatoria', { nome: req.session.nome, foto });
    } else {
        res.render("erro");
    }
}
module.exports.Receberconvocatoria = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var dadosConvocatoria = {
            Comunicado: req.body,
            codigo_identificacaoC: req.session._id_colegio,
            usuarioLogin: req.session.nome,
            Colegio: req.session.Nome_Colegio,
            dataEnviadaConv: new Date()
        }
        var convicatoria = new application.app.models.Convocatoria();
        convicatoria.Enviarconvocatoria(dadosConvocatoria);
        res.redirect('/colegios');
    } else {
        res.render("erro");
    }



}
module.exports.MostrarConvocatorias = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var convocatoria = new application.app.models.Convocatoria();
        var usuarioLogin = req.session.nome;
        convocatoria.ExiberConvocatorias(usuarioLogin, req, res);
    } else {
        res.render("erro");
    }

}

module.exports.verTodasasConvocatoriasEnc = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        var id_colegio = parseInt(req.session.id_colegio);
        var convocatoria = new application.app.models.Convocatoria();
        convocatoria.ExiberTodas_Convocatorias(id_colegio, req, res);
    } else {
        res.render("erro");
    }
}

module.exports.verConvocatorias_Atul_Enc = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        var id_colegio = parseInt(req.session.id_colegio);
        var convocatoria = new application.app.models.Convocatoria();
        convocatoria.ExiberConvocatoriasAtul(id_colegio, req, res);
    } else {
        res.render("erro");
    }
}

module.exports.Editar_convocatorio = function(application, req, res) {
        if (req.session.autorizado && req.session.nivelAcesso === 1) {
            var id = req.params.id;
            var convocatoria = new application.app.models.Convocatoria();
            convocatoria.Editar(id, req, res);
        } else {
            res.render("erro");
        }
    }
    /***********************************ATUALIZAR AS CONVOCATÓRIAS ********************************** */
module.exports.Updateconvocatoria = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var id = req.body.id;
        var dadosConvocatoria = {
            Comunicado: req.body,
            codigo_identificacaoC: req.session._id_colegio,
            usuarioLogin: req.session.nome,
            Colegio: req.session.Nome_Colegio,
            dataEnviadaConv: new Date()
        }
        var convicatoria = new application.app.models.Convocatoria();
        convicatoria.Atualizar(dadosConvocatoria, id, req, res);
    } else {
        res.render("erro");
    }
}