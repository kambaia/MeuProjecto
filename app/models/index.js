
const url = require("./../../config/dbConnection");
var MongoClient = require("mongodb").MongoClient;
function Index(){

}
Index.prototype.inserirVisitante = (visitante)=>{
    console.log("Passei aqui");
	console.log(visitante);
    
		MongoClient.connect(url, function(err, db){
			if (err) throw err;
			var conexao = db.db("SistemaPCO");
			conexao.collection("visitantes").insert(visitante);
		});
}

module.exports = function(){
return Index;
}

	