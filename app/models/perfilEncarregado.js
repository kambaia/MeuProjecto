


const url = require("./../../config/dbConnection");
var MongoClient = require("mongodb").MongoClient;
function perfilEncarregado(){

}
perfilEncarregado.prototype.InserirDadosEncarregado = function(encarregado){
	
	console.log(aluno);
	console.log("FORMA PASSADOS OS SEUINTES DADOS:");
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			var conexao = db.db("SistemaPCO");
			conexao.collection("usuarios").insert(encarregado);
		});
/*
perfilEncarregadoDAO.prototype.AcessoDadosColegio = function(req, res,  usuarioLogin){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("colegio", function(err, collection){
			collection.find({Admin_registrado: usuarioLogin}).toArray((err, result)=>{
				if(result[0] !==undefined){
					req.session.result = result[0];
					res.render('colegios/perfilcolegio', {dadosColegio: result[0],  nome: usuarioLogin});
				}
				else{
					res.render('colegios/perfilcolegio', {dadosColegio:{},  nome: usuarioLogin});
					}
			});
			mongoclient.close();
		});
    });

}
*/
}
module.exports = function(){
	return perfilEncarregado;
	}
	