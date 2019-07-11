module.exports = function(application) {
    application.get('/bancos', function(req, res) {
        application.app.controllers.controllerBancos.banco(application, req, res);
    });
    application.get('/bancos/perfil', function(req, res) {
        application.app.controllers.controllerBancos.PerfilUsuario(application, req, res);
    });


    /*------------------------confirmar o propietario da conta -----------------*/
    application.get('/bancos/confirmarconta', function(req, res) {
        application.app.controllers.controllerBancos.Acesso_confirmarConta(application, req, res);
    });
    application.post('/bancos/confirmarconta', function(req, res) {
        application.app.controllers.controllerBancos.confirmarconta(application, req, res);
    })

    /*------------------------Fazer deposito na  conta -----------------*/
    application.get('/bancos/fazerdeposito', function(req, res) {
        application.app.controllers.controllerBancos.acesso_ao_deposito(application, req, res);
    });

    application.post('/bancos/fazerdeposito', function(req, res) {
        application.app.controllers.controllerBancos.FazerDeposito(application, req, res);
    });

    /*------------------------Consultar conta do cliente -----------------*/
    application.get('/bancos/consultarconta', function(req, res) {
        application.app.controllers.controllerBancos.acesso_ao_consultarconta(application, req, res);
    });

    application.post('/bancos/consultarconta', function(req, res) {
        application.app.controllers.controllerBancos.fazerconsulta(application, req, res);
    });


    /*------------------------Visualizar todos os clientes -----------------*/
    application.get('/bancos/cliente', function(req, res) {
        application.app.controllers.controllerBancos.acesso_ao_todosCliente(application, req, res);
    });
}