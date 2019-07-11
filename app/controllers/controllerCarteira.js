// .....................................Carteira do Encarregado /////////////////////////////////////////

module.exports.CarteiraDoEncarregado = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        var saldo = req.session.saldo;
        var numeroConta = req.session.contaEncaregado;

        var carteira = new application.app.models.Carteira();
        var foto = req.session.foto_perfil
        carteira.TransfererenciaRecentes_conta(numeroConta, foto, saldo, req, res, );
    } else {
        res.redirect('/encarregados/carteira');
    }
}
module.exports.confirmacao_data_carteira = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        var foto = req.session.foto_perfil;
        res.render("confirmacao_data_carteira", { foto });
    } else {
        res.redirect('/encarregados/carteira');
    }
}

module.exports.AcessaraCarteira = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        const codigoAcesso = parseInt(req.body.codigo);
        let bi = req.session.numeroBI;

        var carteira = new application.app.models.Carteira();
        carteira.AcessarMinha_conta(codigoAcesso, bi, req, res);
    } else {
        res.redirect('/colegios/carteira');
    }

}


module.exports.confirmacao_data_carteira = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        var foto = req.session.logo;
        res.render("confirmacao_data_carteira", { nome: req.session.nome, foto });
    } else {
        res.redirect('/colegios/carteira');
    }
}


///////////////////////fim das tratativa de acesso a carteira*******************************************/

/* -------------------------------colegios------------------------*/
module.exports.CarteiraDoColegio = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1 && req.session.logado == true) {
        var saldo = req.session.saldo;
        var numeroconta = req.session.colegio;
        var carteira = new application.app.models.Carteira();
        carteira.TransfererenciaRecentes_deumaluno(numeroconta, saldo, req, res);

    } else {
        res.redirect('/colegios/carteira');
    }

}


module.exports.AcessarCarteiraColegio = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {

        var codigoAcesso = parseInt(req.body.codigo);
        var carteira = new application.app.models.Carteira();
        carteira.AcessarMinha_contaC(codigoAcesso, req, res);
    } else {
        res.redirect('/colegios/carteira');
    }

}



module.exports.Carteira_criada = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        res.render("colegios/confirmacao_data_carteira", { foto });
    } else {
        res.redirect('/colegios/carteira');
    }

}


/**************************************encarregado ********************************* */

module.exports.Carteira_criadaEn = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.foto_perfil;
        res.render("colegios/confirmacao_data_carteira", { foto });
    } else {
        res.redirect('/colegios/carteira');
    }

}


/////////////////*****confirmar os dados da carteira virtual*************************************** */

module.exports.criarCarteiraViaColegio = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var saldo = req.session.saldo;
        var foto = req.session.logo;

        res.render('colegios/criar_carteira', { nome: req.session.nome, foto, saldo });

    } else {
        res.render("erro");
    }

}

module.exports.SolicitarCarteiraColegio = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        console.log(req.body)
        var d = new Date();
        var data = "Data:" + d.toLocaleString();
        var email = req.body.email;
        var nomeCliente = req.body.nome;
        var numeroBI = req.body.numeroBI;
        var saldoIniciar = 100;

        function numeroEmKwanza(numero) {
            var numero = numero.toFixed(2).split('.');
            numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        }
        var x = numeroEmKwanza(saldoIniciar);
        console.log(x);

        var Saldo = x;
        var ema = req.session.email;
        var numbi = req.session.numeroBI;

        var dadosCliente = {
            nome: nomeCliente,
            email: email,
            numeroBI: numeroBI,
            codigoAcesso: Math.floor(Math.random() * 1000000),
            numeroConta: Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 100000000),
            valor: Saldo,
            datadeabertura: data
        }

        var cont = new application.app.models.Carteira();
        cont.SolicitarContaC(dadosCliente, ema, numbi, res);
        var foto = req.session.logo;
        res.render("colegios/confirmacao_data_carteira", { foto });
    } else {
        res.render("erro");
    }
}

///////////////////////////////////////Solitar conta para o encarregado //////////////////////////
module.exports.Solicitar_Conta = function(application, req, res) {

    var d = new Date();
    var data = "Data:" + d.toLocaleString();

    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        var email = req.body.email;
        var nomeCliente = req.body.nome;
        var numeroIB = req.body.numeroBI;
        var saldoIniciar = 100;

        function numeroEmKwanza(numero) {
            var numero = numero.toFixed(2).split('.');
            numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        }
        var x = numeroEmKwanza(saldoIniciar);
        console.log(x);

        var Saldo = x;
        var ema = req.session.email;
        var numbi = req.session.numeroBI;

        var dadosCliente = {
            nome: nomeCliente,
            email: email,
            numeroBI: numeroIB,
            codigoAcesso: Math.floor(Math.random() * 1000000),
            numeroConta: Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 100000000),
            valor: Saldo,
            datadeabertura: data
        }

        var cont = new application.app.models.Carteira();
        cont.SolicitarConta(dadosCliente, ema, numbi, res);
        var foto = req.session.foto_perfil;
        res.render("encarregados/confirmacao_data_carteira", { foto });
    } else {
        res.render("erro");
    }

}

module.exports.entrarNacarteira = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;

        res.render("colegios/carteira", { foto });
    } else {
        res.render("erro");
    }
}



//////////////////////////////Deslogar da carteira/////////////////////////
module.exports.sairdaCarteiraEn = function(application, req, res) {

    req.session.destroy(function(err) {
        res.render("login", { validacao: {} });
    })
}


//////////////////////////////Deslogar da carteira/////////////////////////
module.exports.sairdaCarteiraCole = function(application, req, res) {
    var nome = req.session.nome;
    var colegio = req.session.Nome_Colegio;
    var foto = req.session.logo;
    var codigo = parseInt(req.session._id_colegio);
    req.session.destroy(function(err) {
        res.render('colegios', { foto: foto, nome: nome, codigo: codigo, colegio: colegio });
    })
}