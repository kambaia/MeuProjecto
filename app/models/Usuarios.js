/* Importação do modulo da conexão..............*/
const url = require("./../../config/dbConnection");

/* importação do modulo bcript para criptografia das senhas */
var crypto = require('crypto');



var MongoClient = require("mongodb").MongoClient;

function Usuario() {

}
Usuario.prototype.inserirUsuario = (usuario, res) => {
    console.log("O dados do mongoose começaram aqui");
    console.log(usuario);
    console.log("Este são os dados abistraidos do usuario")

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("usuarios").find({
            $or: [{
                    email: usuario.email
                },
                { numeroBI: usuario.numeroBI },
                {
                    contacto: {
                        tel_movicel: usuario.contacto.tel_movicel,
                        tel_unitel: usuario.contacto.tel_unitel
                    }
                }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {
                res.render('usuarioColegio', { erro: "Os dados já se encontra Cadastrado", validacao: {} });
                console.log(data);
            } else {

                var nova_senha = crypto.createHash("md5").update(usuario.senha).digest("hex");
                usuario.senha = nova_senha;
                console.log(usuario.senha);

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var conexao = db.db("SistemaPCO");
                    conexao.collection("usuarios").insert(usuario);
                    res.redirect('/form_confirmacao');
                });
                /******************************Fim do mongoose ******************************************* */
            }
        })
    })

}


Usuario.prototype.autenticar = (use, req, res) => {
    console.log(use)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");

        var nova_senha = crypto.createHash("md5").update(use.senha).digest("hex");
        use.senha = nova_senha;

        conexao.collection("usuarios").find(use).toArray((err, data) => {
            if (data[0] !== undefined) {
                req.session.autorizado = true;

            } else {
                res.redirect("login");
            }
            if (req.session.autorizado) {


                if (data[0] !== undefined) {

                    req.session.autorizado = true;
                    req.session.logo = data[0].logo;
                    req.session.foto_perfil = data[0].foto_perfil;
                    req.session.nome = data[0].nome;
                    req.session.email = data[0].email;
                    req.session.senha = data[0].senha;
                    req.session.numeroBI = data[0].numeroBI;
                    req.session.data_fundacao = data[0].data_fundacao;
                    req.session.data_nascimento = data[0].data_nascimento,
                        req.session.provincia = data[0].endereco.provincia;
                    req.session.municipio = data[0].endereco.municipio;
                    req.session.bairro = data[0].endereco.bairro;
                    req.session.rua = data[0].endereco.rua;
                    req.session.dataCadastro = data[0].dataCadastro;
                    req.session.tel_movicel = data[0].contacto.tel_movicel,
                        req.session.tel_unitel = data[0].contacto.tel_unitel
                    req.session.Nome_Colegio = data[0].Nome_Colegio,
                        req.session.nome_encarregado = data[0].nome_encarregado,
                        req.session._id_colegio = data[0].codigo_identificacao,
                        req.session.nivelAcesso = data[0].nivelAcesso;
                    var senha = use.senha;

                }

                if (req.session.autorizado && req.session.nivelAcesso == 1 && req.session.senha == senha) {

                    res.redirect("colegios");
                }
                if (req.session.autorizado && req.session.nivelAcesso == 2 && req.session.senha == senha) {
                    res.redirect("encarregados");
                }

                if (req.session.autorizado && req.session.nivelAcesso == 0 && req.session.senha == senha) {
                    res.redirect("admin");
                }
                if (req.session.autorizado && req.session.nivelAcesso == 5 && req.session.senha == senha) {
                    res.redirect("bancos");
                }
            }
        })
    })
}

module.exports = function() {
    return Usuario;
}