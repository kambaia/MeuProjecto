module.exports.banco = function(application, req, res) {

        if (req.session.autorizado && req.session.nivelAcesso == 5) {
            res.render('bancos', { nome: req.session.nome });
        } else {
            res.render("erro");
        }
    }
    /* perfil do  bancaria */

module.exports.PerfilUsuario = function(application, req, res) {
    var logo = req.session.logo;
    var foto = req.session.foto_perfil;
    var nome = req.session.nome
    var email = req.session.email

    var nif = req.session.numeroBI

    var prov = req.session.provincia;
    var endere = req.session.municipio;
    var cidade = req.session.bairro;
    var rua = req.session.rua;

    var cont1 = req.session.tel_movicel;
    var cont2 = req.session.tel_unitel;




    if (req.session.autorizado && req.session.nivelAcesso == 5) {
        res.render('bancos/perfil', { nome, logo, foto, email, nif, prov, endere, cidade, rua, cont1, cont2 });
    } else {
        res.render("erro");
    }
}



/* controller confirmar proprietario*/
module.exports.Acesso_confirmarConta = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 5) {
        res.render('bancos/verificar_conta', { nome: req.session.nome });
    } else {
        res.render("erro");
    }
}



module.exports.confirmarconta = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 5) {

        var nomeCliente = req.body.nome;
        var numeroConta = req.body.numeroConta;


        var dadosCliente = {
            nome: nomeCliente,
            numeroConta: numeroConta
        }
        var b = new application.app.models.Banco();
        b.confirmarConta_cliente(dadosCliente, req, res);
    } else {
        res.render("erro");
    }
}

/* controller confirmar fazer deposito*/
module.exports.acesso_ao_deposito = function(application, req, res) {

        if (req.session.autorizado && req.session.nivelAcesso == 5) {
            res.render('bancos/fazerDeposito', { nome: req.session.nome });
        } else {
            res.render("erro");
        }
    }
    /* controller confirmar fazer deposito*/
module.exports.FazerDeposito = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 5) {
        var valor = req.body.valor;
        var valor = req.body.valor;
        var b = new application.app.models.Banco();
        b.Depositar(valor, req, res);
    } else {
        res.render("erro");
    }
}





/* controller consulta*/
module.exports.acesso_ao_consultarconta = function(application, req, res) {

        if (req.session.autorizado && req.session.nivelAcesso == 5) {
            res.render('bancos/consultar_conta', { nome: req.session.nome });
        } else {
            res.render("erro");
        }
    }
    /* controller confirmar fazer deposito*/
module.exports.fazerconsulta = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 5) {
        var numeroConta = req.body.numeroConta;
        var b = new application.app.models.Banco();
        b.Consultar_conta(numeroConta, req, res);
    } else {
        res.render("erro");
    }
}




/* controller consulta   de todos clientes Cdastrados*/
module.exports.acesso_ao_todosCliente = function(application, req, res) {

    if (req.session.autorizado && req.session.nivelAcesso == 5) {
        var b = new application.app.models.Banco();
        b.Consultar_contaTodos(res);
    } else {
        res.render("erro");
    }
}