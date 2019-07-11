module.exports = function(application) {


    application.get('/acesso-colegio', function(req, res) {
        application.app.controllers.usuarioColegio.cadastro(application, req, res);
    });

    application.post('/usuarios-cadastrarColegios', function(req, res) {
        application.app.controllers.usuarioColegio.CadastrarColegio(application, req, res);
    });

    application.get('/form_confirmacao', function(req, res) {
        application.app.controllers.usuarioEncarregado.formacaoDeCadastro(application, req, res);
    });
}