module.exports = function(application) {
    application.get('/login', function(req, res) {
        application.app.controllers.login.login(application, req, res);
    });

    application.post('/auth', function(req, res) {
        application.app.controllers.login.autenticar(application, req, res);
    });

    application.get('/sair', function(req, res) {
        application.app.controllers.login.Sair(application, req, res);
    });
    application.get('/erro', function(req, res) {
        application.app.controllers.login.Erro(application, req, res);
    });
}