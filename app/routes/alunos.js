module.exports = function(application) {


    /////////////////////////************************************ */
    application.get('/colegios/alunos/filtrosdepesuisa', function(req, res) {
        application.app.controllers.controlleralunos.listarPesquisa(application, req, res);
    });
    application.post('/colegios/alunos/filtrosdepesuisa', function(req, res) {
        application.app.controllers.controlleralunos.ListarAlunosporFiltro1(application, req, res);
    });

    application.get('/colegios/alunos/1clico', function(req, res) {
        application.app.controllers.controlleralunos.ListarTodos_1ciclo(application, req, res);
    });
    application.get('/colegios/alunos/2clico', function(req, res) {
        application.app.controllers.controlleralunos.ListarTodos_2ciclo(application, req, res);
    });

    application.get('/colegios/alunos/editar', function(req, res) {
        application.app.controllers.controlleralunos.Editar(application, req, res);
    });

    application.get('/colegios/alunos/deletar/al/:id', function(req, res) {
        application.app.controllers.controlleralunos.deletarAl(application, req, res);
    });
    application.get('/colegios/alunos/editar/al/:id', function(req, res) {
        application.app.controllers.controlleralunos.editarAl(application, req, res);
    });

    application.post('/colegios/alunos/editar', function(req, res) {
        application.app.controllers.controlleralunos.editarAluno(application, req, res);
    });

}