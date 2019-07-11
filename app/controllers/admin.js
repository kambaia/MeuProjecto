
module.exports.admin = function(application, req, res){
	if(req.session.autorizado  && req.session.nivelAcesso==0){
		res.render('admin',  {nome: req.session.nome});
	}
	else{
		res.render("erro");
	}
}

module.exports.perfil = function(application, req, res){
	if(req.session.autorizado){
		res.render('admin/perfilcompleto')
	}
	else{
		res.send("TU NÃO TENS AUTORIZAÇÃO PARA ACESSAR ESTÁ PAGINA")
	}
}



module.exports.VerTodosVisitantes = function(application, req, res){
	if(req.session.autorizado !==true  && req.session.nivelAcesso !==0){
		res.render("erro"); 
	}
	res.render('admin/listarvizitantes', {nome: req.session.nome})
}