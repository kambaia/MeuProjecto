
module.exports = function(application){
	
	application.get('/admin', function(req, res){
		application.app.controllers.admin.admin(application, req, res);
	});
		
	application.get('/admin/carteira', function(req, res){
		application.app.controllers.controllerPagamento.criarCarteira(application, req, res);
    });



	application.get('/admin/colegios', function(req, res){
		application.app.controllers.controllerColegio.AcessoColegio(application, req, res);
	});
	
	application.get('/admin/encarregados', function(req, res){
		application.app.controllers.controllerEncarregado.AcessoEncarregado(application, req, res);
	});

	application.get('/admin/visitantes', function(req, res){
		application.app.controllers.admin.VerTodosVisitantes(application, req, res);
	});
}