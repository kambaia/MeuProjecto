const url = require("./../../config/dbConnection");
const ObjectID = require('mongodb').ObjectId;

var MongoClient = require("mongodb").MongoClient;

function Alunos() {

}
//////////////////////////////metodos que faz a inserção dos dados do aluno/////////////
Alunos.prototype.InserirAlunos = (aluno, req, res) => {

    console.log(aluno);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("alunos").find({

            $or: [{
                    codigoPessoal: aluno.codigoPessoal
                },
                { tel_mae: aluno.tel_mae },
                { tel_pai: aluno.tel_pai }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {
                var foto = req.session.logo;
                let erro = 'O estudante na qual deseja cadastar já se encontra cadastrado';

                res.render('colegios/alunos/adicionaralunos', { nome: req.session.nome, foto, erro: erro })
            } else {

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var conexao = db.db("SistemaPCO");
                    conexao.collection('alunos').insert(aluno);
                    res.redirect('/colegios/alunos/listaralunos');
                });
                /******************************Fim do mongoose ******************************************* */
            }
        })
    })

}

///----------------------exibir os dados --------------------
Alunos.prototype.ListarTodos = (id_codigo, req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        console.log(id_codigo)
        console.log("Passei por aqui");
        conexao.collection('alunos').find({ id_escola: id_codigo }).toArray((err, data) => {
            var foto = req.session.logo;
            res.render('colegios/alunos/listarTodosAlunos', { alunos: data, nome: req.session.nome, foto });
        });
    })
}


///----------------------Filtrar dos dados do aluno os dados para serem deletados--------------------
Alunos.prototype.pesquisarAluno = (aluno, req, res) => {
    console.log(aluno);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("alunos").find({


            $or: [{
                    nome_Estudante: aluno.busca
                },

                { ciclo: aluno.ciclo },
                { curso: aluno.curso },
                { classe: aluno.classe },

                {
                    ano: aluno.ano
                }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {
                var foto = req.session.logo;
                res.render('colegios/alunos/dadosachado', { alunos: data, foto });
            } else {
                res.send("<h2>Nenhum dado foi encontrado <a href='/colegios/alunos/listaralunos'> Voltar</a> </h2>")
            }
        })
    })

}

/*----------------------exibir os dados para serem editados--------------------*/
Alunos.prototype.ListardadosparaEditar = (id_codigo, req, res) => {
    var foto = req.session.logo;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        console.log(id_codigo)
        console.log("Passei por aqui");
        conexao.collection('alunos').find({ id_escola: id_codigo }).toArray((err, data) => {

            res.render("colegios/alunos/editar_aluno", { alunos: data, nome: req.session.nome, foto });
        });
    })
}


///----------------------exibir os dados para serem deletados--------------------
Alunos.prototype.Deletar = (id, req, res) => {
        console.log(id);

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            conexao.collection('alunos').remove({ _id: ObjectID(id) }, function(err, data) {
                res.redirect("/colegios/alunos/deletar");
                console.log("Tudo feito");
            })
        })
    }
    ///----------------------exibir os dados para EDITAR --------------------
Alunos.prototype.Editar = (id, req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");

        console.log(id)
        console.log("Passei Agora mesmo aqui");
        conexao.collection('alunos').find({ _id: ObjectID(id) }).toArray((err, data) => {
            var foto = req.session.logo;
            res.render("colegios/alunos/edit_aluno", { alunos: data, nome: req.session.nome, foto });

        });
    })
}
Alunos.prototype.Updatealuno = (id, dadosal, res) => {
    console.log("Estes são os dados do Aluno");
    console.log(id)
    console.log("Estes são os dados do Aluno");

    console.log(dadosal);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection('alunos').updateOne({ "_id": ObjectID(id) }, { $set: dadosal }, function(err, result) {
            console.log(result)
            res.redirect('/colegios/alunos/listaralunos');
        })
    });

}

module.exports = function() {
    return Alunos;
}