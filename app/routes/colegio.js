module.exports = function(application) {
    application.get('/colegios', function(req, res) {
        application.app.controllers.controllerColegio.AcessoColegio(application, req, res);
    });


    application.get('/colegios/perfilcolegio', function(req, res) {
        application.app.controllers.controllerColegio.AcessoPerfilColegio(application, req, res);
    });
    application.get('/colegios/editColegio', function(req, res) {
        application.app.controllers.controllerColegio.AcessoEddColegio(application, req, res);
    });
    application.post('/colegios/perfilcolegio', function(req, res) {
        application.app.controllers.controllerColegio.ReceberDadosColegio(application, req, res);
    });

    /*-------------------------------rota da configuração-----------------------------*/
    application.get('/colegios/configuracoes', function(req, res) {
        application.app.controllers.controllerColegio.Acesso_configuracoes(application, req, res);
    });

    /*-------------------------------rota da configuração-----------------------------*/
    application.get('/colegios/definicao', function(req, res) {
        application.app.controllers.controllerColegio.Acesso_definicao(application, req, res);
    });



    /*    ****************Rota da convocatórias ************************************************ */
    application.get('/colegios/enviarconvocatoria', function(req, res) {
        application.app.controllers.controllerConvocatoria.Enviarconvocatoria(application, req, res);
    });
    application.post('/colegios/addconvocatoria', function(req, res) {
        application.app.controllers.controllerConvocatoria.Receberconvocatoria(application, req, res);
    });
    application.get('/colegios/verconvocatoria', function(req, res) {
        application.app.controllers.controllerConvocatoria.MostrarConvocatorias(application, req, res);
    });
    application.get('/colegios/verconvocatoria/edit/:id', function(req, res) {
        application.app.controllers.controllerConvocatoria.Editar_convocatorio(application, req, res);
    });
    application.post('/colegios/verconvocatoria/edit', function(req, res) {
        application.app.controllers.controllerConvocatoria.Updateconvocatoria(application, req, res);
    });


    /****************Rota dos pagamentos ************************************************ */
    application.get('/colegios/pagamentos', function(req, res) {
        application.app.controllers.controllerColegio.Pagamentos_recentes(application, req, res);
    });


    /****************Rota dos ALunos  ************************************************ */
    application.get('/colegios/addalunos', function(req, res) {
        application.app.controllers.controlleralunos.AdicionarAluno(application, req, res);
    });

    application.post('/colegios/addalunos', function(req, res) {
        application.app.controllers.controlleralunos.ReceberDadosAluno(application, req, res);
    });

    application.get('/colegios/alunos/listaralunos', function(req, res) {
        application.app.controllers.controlleralunos.ListarTodosAlunos(application, req, res);
    });
    application.get('/colegios/alunos/adicionar', function(req, res) {
        application.app.controllers.controlleralunos.AdicionarAluno(application, req, res);
    });




    /*......................nformações da conta  da conta do colegios ...................*/



    application.get('/colegios/alunos/informacao-conta', function(req, res) {
        application.app.controllers.controllerColegio.Informa_Conta(application, req, res);
    });


    application.get('/colegios/alunos/centro-ajuda', function(req, res) {
        application.app.controllers.controllerColegio.centro_ajuda(application, req, res);
    });
}