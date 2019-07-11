const url = require("./../../config/dbConnection");
var MongoClient = require("mongodb").MongoClient;

function Perfilcolegio() {

}






////////////////////////////metodos que faz a inserção dos dados do colegio/////////////
Perfilcolegio.prototype.EntrarPerfilColegio = (dado_colegio, req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        var id_colegio = dado_colegio.codigo
        console.log(typeof(id_colegio))
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log("..........................................................");
        conexao.collection("alunos").find({ id_escola: dado_colegio.codigo }).toArray((err, alunos) => {
            req.session.estudantes = alunos;
            var al = req.session.estudantes;
            var foto = req.session.logo;
            conexao.collection("convocatorias").find({ codigo_identificacaoC: dado_colegio.codigo }).toArray((err, informacao) => {
                console.log(dado_colegio.numeroBI)
                conexao.collection("transferencias").find({ codigo_colegio: dado_colegio.codigo }, {
                    sort: [
                        ['_id', -1]
                    ]
                }).limit(4).toArray((err, transferencias) => {
                    res.render('colegios', {
                        dado_colegio,
                        al,
                        informacao,
                        foto,
                        transferencias,
                        dadosColegio: {}
                    })
                })

            })


        })



    })
}



////////////////////////////metodos que faz a inserção dos dados do colegio/////////////
Perfilcolegio.prototype.InserirDadosColegio = (colegio, usuarioLogin) => {
        console.log(usuarioLogin)
        console.log("Tod os dados passaram por aqui");
        console.log(colegio);

        console.log("FORMA PASSADOS OS SEUINTES DADOS: " + usuario);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            conexao.collection("usuarios").update(colegio)

        })
    }
    //////////////////////////////metodos que faz o upload dos dados do colegio/////////////
Perfilcolegio.prototype.InserirDadosColegio = (colegio, usuarioLogin) => {
    console.log(usuarioLogin)
    console.log("Tod os dados passaram por aqui");
    console.log(colegio);

    console.log("FORMA PASSADOS OS SEUINTES DADOS: " + usuario);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("usuarios").update({})

    })
}

//////////////////////////////metodos que faz a exibição dos dados do colegio/////////////
Perfilcolegio.prototype.AcessoDadosColegio = (req, res, usuarioLogin, colegio) => {

    console.log("++++++++++++++++++++++++++++++Psei aqui..................................");

    var nome = colegio.Nome_Colegio;
    var data = colegio.data_fundacao;
    var provincia = colegio.provincia;
    var municipio = colegio.municipio;
    var bairro = colegio.bairro;
    var rua = colegio.rua;
    var tel_colegio = colegio.tel_colegio;
    var tel_movicel = colegio.tel_movicel;
    var tel_unitel = colegio.tel_unitel


    res.render('colegios/perfilcolegio', {
        Nome_Colegio: nome,
        nome: usuarioLogin,
        data,
        provincia,
        municipio,
        bairro,
        rua,
        tel_colegio,
        tel_movicel,
        tel_unitel
    });
}


//////////////////////////////metodos megar os ultimos pagamentos feitos/////////////
Perfilcolegio.prototype.PamentosRecentes = (id, req, res) => {
    var foto = req.session.logo;
    var id = parseInt(id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("transferencias").find({ codigo_colegio: id }, {
            sort: [
                ['_id', -1]
            ]
        }).limit(4).toArray((err, transferencias) => {
            res.render('colegios/pagamentos', {
                foto,
                transferencias
            })
        });
    });
}
module.exports = function() {
    return Perfilcolegio;
}