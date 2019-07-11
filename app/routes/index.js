module.exports = function(application) {
    application.get('/', function(req, res) {
        application.app.controllers.index.index(application, req, res);
    });
    application.get('/servicos', function(req, res) {
        application.app.controllers.index.servicos(application, req, res);
    });
    application.get('/contato', function(req, res) {
        application.app.controllers.index.contato(application, req, res);
    });
    application.post('/enviarcontato', function(req, res) {
        application.app.controllers.index.enviarcontato(application, req, res);
    });
    application.get('/usuario', function(req, res) {
        application.app.controllers.escolhaUsuario.EscolherUsuario(application, req, res);
    });

    application.get('/sobre', function(req, res) {
        application.app.controllers.index.sobre(application, req, res);
    });
    application.get('/equipa', function(req, res) {
        application.app.controllers.index.equipa(application, req, res);
    });


    application.get('/ajuda', function(req, res) {
        application.app.controllers.index.ajuda(application, req, res);
    });





}