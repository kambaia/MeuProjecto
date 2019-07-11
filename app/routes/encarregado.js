module.exports = function(application) {
    application.get('/encarregados', function(req, res) {
        application.app.controllers.controllerEncarregado.AcessoEncarregado(application, req, res);
    });

    application.get('/encarregados/addperfil', function(req, res) {
        application.app.controllers.encarregado.AcessoPerfilencarregado(application, req, res);
    });
    application.post('/encarregados/addperfil', function(req, res) {
        application.app.controllers.encarregado.AtribuirDadosEncarregado(application, req, res);
    });

    application.get('/encarregados/carteira', function(req, res) {
        application.app.controllers.controllerEncarregado.AcessoaCarteira(application, req, res);
    });
    application.get('/encarregados/todasconvocatorias', function(req, res) {
        application.app.controllers.controllerConvocatoria.verTodasasConvocatoriasEnc(application, req, res);
    });
    application.get('/encarregados/convocatorias_atual', function(req, res) {
        application.app.controllers.controllerConvocatoria.verConvocatorias_Atul_Enc(application, req, res);
    });
}