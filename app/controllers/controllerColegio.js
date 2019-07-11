module.exports.AcessoColegio = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        let dado_colegio = {
            foto: req.session.logo,
            email: req.session.email,
            data_fundacao: req.session.data_fundacao,
            nome: req.session.nome,
            codigo: req.session._id_colegio,
            colegio: req.session.Nome_Colegio,
            provic: req.session.provincia,
            munic: req.session.municipio,
            bairro: req.session.bairro,
            rua: req.session.rua,
            tel_mov: req.session.tel_movicel,
            numeroBI: req.session.numeroBI,
            tel_uni: req.session.tel_unitel,
            id_colegio: parseInt(req.session.id_colegio)
        }
        var foto = req.session.logo;

        var Perfilcolegio = new application.app.models.Perfilcolegio();
        Perfilcolegio.EntrarPerfilColegio(dado_colegio, req, res)
    } else {
        res.render("erro");
    }

}

module.exports.ReceberDadosColegio = function(application, req, res) {
    if (req.session.autorizado !== true && req.session.nivelAcesso !== 1) {
        var dados = req.body;
        var dadosColegio = {
            Nome_Colegio: req.session.Nome_Colegio,
            data_fundacao: req.body.data_fundacao,
            endereco: {
                provincia: req.body.provincia,
                municipio: req.body.municipio,
                bairro: req.body.bairro,
                rua: req.body.rua
            },
            contacto: {
                contacto_colegio: req.body.casa,
                contacto_movicel: req.body.movicel,
                contacto_unitel: req.body.unitel
            }
        }
        var usuarioLogin = req.session.nome;

        var Perfilcolegio = new application.app.models.Perfilcolegio();
        Perfilcolegio.InserirDadosColegio(dadosColegio, usuarioLogin);
        //jogoDAO.gerarParametro(dadosForm.usuario)
        res.redirect('/colegios');
    } else {
        res.render("erro");
    }
}

module.exports.AcessoEddColegio = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        let dado_colegio = {
            foto: req.session.logo,
            email: req.session.email,
            data_fundacao: req.session.data_fundacao,
            nome: req.session.nome,
            codigo: req.session._id_colegio,
            colegio: req.session.Nome_Colegio,
            provic: req.session.provincia,
            munic: req.session.municipio,
            bairro: req.session.bairro,
            rua: req.session.rua,
            tel_mov: req.session.tel_movicel,
            tel_uni: req.session.tel_unitel,
            id_colegio: parseInt(req.session.id_colegio)
        }

        res.render('colegios', {
            dado_colegio,
            dadosColegio: {}
        });

    } else {
        res.render("erro");
    }
}

/*********************************Pagamentos Recentes************************************************** */
module.exports.Pagamentos_recentes = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var id_colegio = req.session._id_colegio;
        console.log(id_colegio);
        var Perfilcolegio = new application.app.models.Perfilcolegio();
        Perfilcolegio.PamentosRecentes(id_colegio, req, res);
    }
}





module.exports.AcessoEddColegio = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {

        let dado_colegio = {
            foto: req.session.logo,
            email: req.session.email,
            data_fundacao: req.session.data_fundacao,
            nome: req.session.nome,
            codigo: req.session._id_colegio,
            colegio: req.session.Nome_Colegio,
            provic: req.session.provincia,
            munic: req.session.municipio,
            bairro: req.session.bairro,
            rua: req.session.rua,
            tel_mov: req.session.tel_movicel,
            tel_uni: req.session.tel_unitel,
            id_colegio: parseInt(req.session.id_colegio)
        }

        res.render('colegios', {
            dado_colegio,
            dadosColegio: {}
        });


    } else {
        res.render("erro");
    }
}

module.exports.AcessoPerfilColegio = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {

        var usuarioLogin = req.session.nome;
        dadosColegio = {
            nome: req.session.nome,
            email: req.session.email,
            senha: req.session.senha,
            data_fundacao: req.session.data_fundacao,
            Nome_Colegio: req.session.Nome_Colegio,
            provincia: req.session.provincia,
            municipio: req.session.municipio,
            bairro: req.session.bairro,
            rua: req.session.rua,
            tel_colegio: req.session.tel_colegio,
            tel_movicel: req.session.tel_movicel,
            tel_unitel: req.session.tel_unitel,
            id_colegio: req.session._id_colegio
        }
    } else {
        res.render("erro");
        return;
    }
}

module.exports.Acesso_configuracoes = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        let dado_colegio = {
            foto: req.session.logo,
            email: req.session.email,
            data_fundacao: req.session.data_fundacao,
            nome: req.session.nome,
            codigo: req.session._id_colegio,
            colegio: req.session.Nome_Colegio,
            provic: req.session.provincia,
            munic: req.session.municipio,
            bairro: req.session.bairro,
            rua: req.session.rua,
            tel_mov: req.session.tel_movicel,
            tel_uni: req.session.tel_unitel,
            id_colegio: parseInt(req.session.id_colegio)
        }

        res.render('colegios/configuracoes.ejs', {
            foto,
            dado_colegio,
            dadosColegio: {}
        });
    }
}

module.exports.Acesso_definicao = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        res.render('colegios/definecao', {
            dadosColegio: {},
            foto
        });
    } else {
        res.render("erro");
    }

}

/*......................   carteira dos colegios .................................*/

/*......................   carteira dos colegios .................................*/

module.exports.AcessoaCarteira = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        res.render('colegios/carteira', {
            dado_colegio,
            dadosColegio: {},
            foto
        });
    } else {
        res.render("erro");
    }
}


/********************************infromações do menu lateral do colegios................ */
module.exports.Informa_Conta = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        res.render('colegios/informacao_conta', {
            dadosColegio: {},
            foto
        });
    } else {
        res.render("erro");
    }
}


module.exports.centro_ajuda = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        res.render('colegios/centro-ajuda', {
            dadosColegio: {},
            foto
        });
    } else {
        res.render("erro");
    }
}