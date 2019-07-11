module.exports = function(application) {

    application.get('/acesso-encarregado', function(req, res) {
        application.app.controllers.usuarioEncarregado.cadastro(application, req, res);
    });

    application.post('/cadastrarencarregado', function(req, res) {
        application.app.controllers.usuarioEncarregado.CadastrarEncarregado(application, req, res);
    });

    application.get('/form_confirmacao', function(req, res) {
        application.app.controllers.usuarioEncarregado.formacaoDeCadastro(application, req, res);
    });
}