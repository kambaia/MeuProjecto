module.exports.AcessoEncarregado = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {

        var foto = req.session.foto_perfil;
        var datanas = req.session.data_nascimento;
        var nome = req.session.nome;
        var nome_completo = req.session.nome_encarregado;

        var provic = req.session.provincia;
        var munic = req.session.municipio
        var bairro = req.session.bairro;
        var rua = req.session.rua;
        var tel_mov = req.session.tel_movicel;
        var tel_uni = req.session.tel_unitel;
        var id_colegio = parseInt(req.session.id_colegio);

        console.log(foto);
        var convocatoria = new application.app.models.Convocatoria();
        convocatoria.ExiberConvocatoriasparaEnca(nome, foto, nome_completo, datanas, provic, munic, bairro, rua, tel_mov, tel_uni, id_colegio, req, res);
    } else {

        res.render("erro");
    }
}
module.exports.AcessoPerfilencarregado = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        res.render('encarregado/editPerfil', { nome: req.session.nome });
    } else {
        res.render("erro")
    }
}

module.exports.AtribuirDadosEncarregado = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {

        var dadosencarregado = {
            usuario_registrado: req.session.nome,
            Nome_encarregado: req.body.Nome_encarregado,
            data_nascimento: req.body.data_nascimento,
            genero: req.body.genero,
            numeroBI: req.body.numeroBI,
            endereco: {
                provincia: req.body.provincia,
                municipio: req.body.municipio,
                bairro: req.body.bairro,
                rua: req.body.rua
            },
            contacto: {
                contacto_movicel: req.body.movicel,
                contacto_unitel: req.body.unitel,
                email: req.session.email
            },
            codigo_identificacao: Math.floor(Math.random() * 1000000)
        }

        var encarregado = new application.app.models.perfilEncarregado();
        Usuario.prototype.inserirUsuario(dadosencarregado);
        res.redirect('/encarregado');

    } else {
        res.render("erro")
    }
}
module.exports.AcessoaCarteira = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        var foto = req.session.foto_perfil;
        res.render('encarregados/carteira', { nome: req.session.nome, foto });
    } else {
        res.render("erro");
    }
}