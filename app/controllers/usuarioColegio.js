//var  multer   = require ('multer') 
var fs = require('fs');


module.exports.cadastro = function(application, req, res) {
    res.render('usuarioColegio', { validacao: {} });
}
module.exports.CadastrarColegio = function(application, req, res) {
        var dadosColegio = req.body;

        req.assert('nome', 'Nome não pode ser vazio').notEmpty();
        req.assert('email', 'Email não pode ser vazio').notEmpty();
        //req.assert('tipoUsuario', 'Seleciona um  tipo de usúario, não pode ser vazio').notEmpty();
        req.assert('senha', 'Senha não pode ser vazio').notEmpty();
        req.assert('confirmaSenha', 'Senha não pode ser vazio').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.render('usuarioencarregado', { validacao: erros, dadosForm: dadosForm });
            return;
        }
        if (req.body.confirmaSenha != req.body.senha) {
            console.log("As senhas não não iguais")
            return;
        }


        var data = new Date();

        tmp = data.getTime();

        var url_img = tmp + '_' + req.files.logocolegio.originalFilename;
        var path_origem = req.files.logocolegio.path;
        var path_destino = './app/public/uploads/img_colegios/' + url_img;
        fs.rename(path_origem, path_destino, function(err) {
            if (err) {
                console.log(err)
                res.send("erro")
                return;
            }
            var dt = new Date();
            var dt = new Date();
            var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro');

            console.log(req.files.logocolegio)

            console.log(url_img)

            data = new Date();
            dataCadastro = data.toUTCString();
            var dadosColegio = {
                logo: url_img,
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                nivelAcesso: 1,

                Nome_Colegio: req.body.Nome_Colegio,
                data_fundacao: new Date(req.body.data_fundacao),
                numeroBI: req.body.numeroBI,
                endereco: {
                    provincia: req.body.provincia,
                    municipio: req.body.municipio,
                    bairro: req.body.bairro,
                    rua: req.body.rua
                },
                contacto: {
                    tel_movicel: req.body.tel_movicel,
                    tel_unitel: req.body.tel_unitel
                },
                codigo_identificacao: Math.floor(Math.random() * 1000000),
                ano_cadastrado: {
                    dia: dt.getDate(),
                    mes: meses[dt.getMonth()],
                    ano: dt.getFullYear(),
                    hora: dt.toLocaleTimeString()
                },
                ano: dt.getFullYear(),
                dataCadastro: dataCadastro
            }


            var Usuarios = new application.app.models.Usuarios();
            Usuarios.inserirUsuario(dadosColegio, res);

        })
    }
    /*--------------------------------FIM DO METOD DE CADASTRO DOS COLÉGIOS-----------------*/

module.exports.formacaoDeCadastro = function(application, req, res) {
    res.render("form_confirmacao");
}