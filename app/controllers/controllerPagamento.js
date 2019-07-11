module.exports.pagamentos = function(application, req, res) {
    if (req.session.autorizado !== true && req.session.nivelAcesso == 1) {
        res.render("erro");
        return;
    }
    res.render('colegios/pagamentos', { nome: req.session.nome });
}

module.exports.fazerPagamento = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        res.render('encarregados/carteira/fazerpagamento', { nome: req.session.nome });
    } else {

    }
}

module.exports.VerificarDadosAluno = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        var id_colegio = parseInt(req.session.id_colegio);
        console.log(typeof(id_colegio));
        var dadosTransferencia = req.body;
        var pagamento = new application.app.models.Pagamentos();
        pagamento.VerificarAluno(dadosTransferencia, id_colegio, req, res);
    } else {
        res.redirect('/encarregados/carteira');
    }

}
module.exports.VerificarTrans = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        res.render('encarregados/carteira/verificar_aluno', { aluno: {}, validacao: {}, dadosForm: {} });
    } else {
        res.redirect('/encarregados/carteira');
    }

}

module.exports.VerificarTransferencia = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        var dadosForm = req.body;
        req.assert('meses', 'Não fui marcado nenhum mês! Marca os meses que deseja pagar').notEmpty();
        var aluno = req.session.aluno
        var erros = req.validationErrors();

        if (erros) {
            res.render('encarregados/carteira/verificar_aluno', { aluno: aluno, validacao: erros, dadosForm });
            return;
        }
        var saldo = req.session.saldo;
        let meses = req.body.meses;

        let mes = meses.length;
        let meses_Apagar = parseInt(req.body.mesesapagar);

        let propina = parseInt(req.body.valor_apagar);
        const totalDeValorApagar = meses_Apagar * propina;

        if (meses_Apagar > 0 && meses_Apagar < 2 && meses_Apagar !== mes && typeof(meses) == 'string') {
            console.log("*******************Estou apagar apenas um mês*************************");
            console.log(typeof(meses));

            var dadosaTransferencia = {
                numeroContaDestinatario: req.body.numeroConta,
                mese: req.body.meses,
                numerodemeses: meses_Apagar,
                valor_apagar: totalDeValorApagar
            }

            console.log(totalDeValorApagar)

            var pagamento = new application.app.models.Pagamentos();
            pagamento.pagar(dadosaTransferencia, saldo, req, res);

        } else if (meses_Apagar >= 2 && mes >= 2 && meses_Apagar == mes && typeof(meses) == 'object') {


            console.log("*******************Estou apagar  Mais de um mês*************************");
            console.log(typeof(meses));

            var dadosaTransferencia = {
                numeroContaDestinatario: req.body.numeroConta,
                mese: req.body.meses,
                numerodemeses: meses_Apagar,
                valor_apagar: totalDeValorApagar
            }

            console.log(totalDeValorApagar)
            var pagamento = new application.app.models.Pagamentos();
            pagamento.pagar(dadosaTransferencia, saldo, req, res);

        } else {
            res.send("<h3>Os meses marcados não correspondem com os meses selecionados<a href='/encarregados/carteira/entraremprocessoapagar'>Volte a tentar</a>/h3>!");
        }


    } else {
        res.redirect('/encarregados/carteira');
    }

}

module.exports.FizalizarTransferencia = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        res.render('encarregados/carteira/confirmacao_pagamento', { nome: req.session.nome });
    } else {
        res.redirect('/encarregados/carteira');
    }
}

module.exports.verpagamentosFeito = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.logado == true) {
        const numeroconta = req.session.contaEncaregado
        var pagamento = new application.app.models.Pagamentos();
        pagamento.faturadospagameto(numeroconta, req, res);
    } else {
        res.redirect('/encarregados/carteira');
    }

}

module.exports.ddMulticaixac = function(application, req, res) {
    if (req.session.autorizado !== true && req.session.nivelAcesso !== 2) {
        res.render("erro");
        return;
    }
    res.render('encarregados/carteira/addcontabancaria', { nome: req.session.nome });
}

module.exports.criarCarteiraViaEncarregado = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 2) {
        var foto = req.session.foto_perfil;
        res.render('encarregados/criar_carteira', { nome: req.session.nome, foto });
    } else {
        res.render("erro");
    }

}





/*********************************************Todos os movimentos do colégios**************************************** */

module.exports.verpagamentosFeitocolegio = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1 && req.session.logado == true) {
        const numeroconta = req.session.colegio

        console.log("passei no controller dos pagameto");

        console.log(numeroconta);

        var pagamento = new application.app.models.Pagamentos();
        pagamento.faturadospagametoAlunos(numeroconta, req, res);
    } else {
        res.redirect('/colegios/carteira');
    }

}


/*********************************************Todos os movimentos do colégios**************************************** */

module.exports.ddMulticaixac = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1 && req.session.logado == true) {
        res.render('colegios/carteira/addcontabancaria', { nome: req.session.nome });
    } else {
        res.redirect('/colegios/carteira');
    }

}