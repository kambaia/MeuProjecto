const url = require("./../../config/dbConnection");
const ObjectID = require('mongodb').ObjectId;

var MongoClient = require("mongodb").MongoClient;

function Convocatoria() {

}
Convocatoria.prototype.Enviarconvocatoria = (convocatoria) => {

    console.log("FORMA PASSADOS OS SEUINTES DADOS:");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("convocatorias").insert(convocatoria);
    });
}

////////////////////////////exibição das convocatorias /////////////////////////////
Convocatoria.prototype.ExiberConvocatorias = function(usuarioLogin, req, res, ) {
    var foto = req.session.logo;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("convocatorias").find({ usuarioLogin: usuarioLogin }, {
            sort: [
                ['_id', -1]
            ]
        }).toArray((err, data) => {
            res.render('colegios/convocatorias', { convocatoria: data, nome: req.session.nome, foto });
        });
    });
    console.log("Passei aqui")
}


////////////////////////////exibição das convocatorias para o recentes para encarregados /////////////////////////////
Convocatoria.prototype.ExiberConvocatoriasparaEnca = function(nome, foto, nome_completo, datanas, provic, munic, bairro, rua, tel_mov, tel_uni, id, req, res, ) {
    console.log("Passei aqui")
    console.log(id);
    var foto = req.session.foto_perfil;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("convocatorias").find({ codigo_identificacaoC: id }, {
            sort: [
                ['_id', -1]
            ]
        }).toArray((err, data) => {
            res.render('encarregados', { nome, foto, nome_completo, datanas, provic, munic, bairro, rua, tel_mov, tel_uni, convocatoria: data });

        });
    });
}


////////////////////////////exibição das convocatorias para o encarregado /////////////////////////////
Convocatoria.prototype.ExiberTodas_Convocatorias = function(id, req, res, ) {
        console.log("Passei aqui")
        console.log(id);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            conexao.collection("convocatorias").find({ codigo_identificacaoC: id }, {
                sort: [
                    ['_id', -1]
                ]
            }).toArray((err, data) => {
                res.render("encarregados/todas_convocatorias", { convocatoria: data });
            });
        });
    }
    ////////////////////////////exibição das convocatorias para o encarregado /////////////////////////////
Convocatoria.prototype.ExiberConvocatoriasAtul = function(id, req, res, ) {
    console.log("Passei aqui")
    console.log(id);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("convocatorias").find({ codigo_identificacaoC: id }, {
            sort: [
                ['_id', -1]
            ]
        }).toArray((err, data) => {
            console.log(data);
            res.render("encarregados/convocatorias_atual", { convocatoria: data });
        });
    });
}



/////////////////////////////////////////////////Editar as convocatorias /////////////////////////////////
Convocatoria.prototype.Editar = function(id, req, res, ) {

        var foto = req.session.foto_perfil;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            console.log(id)
            conexao.collection('convocatorias').find({ _id: ObjectID(id) }).toArray((err, data) => {
                var foto = req.session.logo;
                res.render("colegios/edit-convocatoria", { convocatoria: data, foto });
            });
        })
    }
    /////////////////////////////////////////////////Atualizar /////////////////////////////////
Convocatoria.prototype.Atualizar = (convocatorias, id, req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection('convocatorias').updateOne({ "_id": ObjectID(id) }, { $set: convocatorias }, function(err, result) {
            console.log(result)
            res.redirect('/colegios/verconvocatoria');
        })
    });

}

module.exports = function() {
    return Convocatoria;
}