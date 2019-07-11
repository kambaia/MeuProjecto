module.exports = function(application) {


    /* Abertura da carteira do colegios   */
    application.get('/colegios/criar_carteira', function(req, res) {
        application.app.controllers.controllerCarteira.criarCarteiraViaColegio(application, req, res);
    });

    application.post('/colegios/criar_conta', function(req, res) {
        application.app.controllers.controllerCarteira.SolicitarCarteiraColegio(application, req, res);
    });

    application.get('/colegios/carteira-criada', function(req, res) {
        application.app.controllers.controllerCarteira.Carteira_criada(application, req, res);
    });

    /////////////////////////////////////////////////////////fim//////////////////////////////////////////////////
    application.get('/colegios/carteira', function(req, res) {
        application.app.controllers.controllerCarteira.entrarNacarteira(application, req, res);
    });

    /////////////////////////////////////////////////////////fim//////////////////////////////////////////////////

    /* Abertura da carteira do encarregado  */

    application.get('/encarregados/criar_carteira', function(req, res) {
        application.app.controllers.controllerPagamento.criarCarteiraViaEncarregado(application, req, res);
    });

    application.post('/encarregados/confirmarcarteira', function(req, res) {
        application.app.controllers.controllerCarteira.AcessaraCarteira(application, req, res);
    });

    application.post('/encarregados/solicitar-carteira', function(req, res) {
        application.app.controllers.controllerCarteira.Solicitar_Conta(application, req, res);
    });
    application.get('/encarregados/carteira-criada', function(req, res) {
        application.app.controllers.controllerCarteira.Carteira_criadaEn(application, req, res);
    });

    //////////////////////////////////////fim processo/////////////////////////////////////////////////////////////////
    application.get('/encarregados/carteira/minhacarteira', function(req, res) {
        application.app.controllers.controllerCarteira.CarteiraDoEncarregado(application, req, res);
    });



    application.get('/encarregados/carteira/pagar', function(req, res) {
        application.app.controllers.controllerPagamento.fazerPagamento(application, req, res);
    });
    /////////////////////////////Verificação dos dados a pagar /////////////////////////////
    application.get('/encarregados/carteira/fazerpagamento', (req, res) => {
            application.app.controllers.controllerPagamento.VerificarTrans(application, req, res);
        })
        /////////////////////////////Começar o processo de pagamento/////////////////////////////

    application.post('/encarregados/carteira/fazerpagamento', function(req, res) {
        application.app.controllers.controllerPagamento.VerificarDadosAluno(application, req, res);
    });

    application.post('/encarregados/carteira/entraremprocessoapagar', function(req, res) {
        application.app.controllers.controllerPagamento.VerificarTransferencia(application, req, res);
    });

    application.get('/encarregados/carteira/finalizartransferencia', function(req, res) {
        application.app.controllers.controllerPagamento.FizalizarTransferencia(application, req, res);
    });
    //////////////////////////////////////fim processo//////////////////////////////////////////////////////////
    application.get('/encarregados/carteira/verpagamentos', function(req, res) {
        application.app.controllers.controllerPagamento.verpagamentosFeito(application, req, res);
    });
    application.get('/encarregados/carteira/addmulticaixa', function(req, res) {
        application.app.controllers.controllerPagamento.ddMulticaixa(application, req, res);
    });

    application.post('/encarregados/confirmarconta_bancaria', function(req, res) {
        application.app.controllers.controllerPagamento.SolicitarCarteiraEncarregado(application, req, res);
    });



    /* ........................................confirmação da carteira do colégio..................................................*/
    application.get('/encarregados/confirmaremail', function(req, res) {
        application.app.controllers.controllerPagamento.confirmacao_data_carteira(application, req, res);
    });

    /* ........................................Carteira do colegio ..................................................*/

    application.get('/colegios/carteira/minhacarteira', function(req, res) {
        application.app.controllers.controllerCarteira.CarteiraDoColegio(application, req, res);
    });

    application.post('/colegios/confirmarcarteira', function(req, res) {
        application.app.controllers.controllerCarteira.AcessarCarteiraColegio(application, req, res);
    });

    //////////////////////////////////////fim processo//////////////////////////////////////////////////////////
    application.get('/colegios/carteira/verpagamentos', function(req, res) {
        application.app.controllers.controllerPagamento.verpagamentosFeitocolegio(application, req, res);
    });

    application.get('/colegios/carteira/verpagamentos', function(req, res) {
        application.app.controllers.controllerPagamento.verpagamentosFeito(application, req, res);
    });
    application.get('/colegios/carteira/addmulticaixa', function(req, res) {
        application.app.controllers.controllerPagamento.ddMulticaixac(application, req, res);
    });


    /*....................................confirmação da carteira do colégio..................................................*/

    application.get('/colegios/confirmaremail', function(req, res) {
        application.app.controllers.controllerPagamento.confirmacao_data_carteira(application, req, res);
    });








    //*************************************Deslogar carteira */
    application.get('/sair', function(req, res) {
        application.app.controllers.controllerCarteira.sairdaCarteiraEn(application, req, res);
    });

    //*************************************Deslogar carteira */
    application.get('/colegio/sair', function(req, res) {
        application.app.controllers.controllerCarteira.sairdaCarteiraCole(application, req, res);
    });
}