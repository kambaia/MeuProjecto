

module.exports.login = function(application, req, res){
	res.render('login', {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
    var dadosform = req.body;
   
    var sms = 'Verificamos que há um campo vazio';
	req.assert('email', sms +'. Preencha com  seu email por favor').notEmpty();
	req.assert('senha',   sms +'Preencha com  a sua esenha por favor').notEmpty();
	

	var erros = req.validationErrors();
	if(erros){
		res.render("login", {validacao: erros})
		return;
	}
	 var usuario = new application.app.models.Usuarios();
     usuario.autenticar(dadosform, req, res);
}

module.exports.Sair = function(application, req, res){
	req.session.destroy(function (err){
		  res.render('login', {validacao: {}});
	})
}

module.exports.Erro = function(application, req, res){
		  res.render('erro');
}