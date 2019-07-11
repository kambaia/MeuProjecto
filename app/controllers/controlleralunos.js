//var  multer   = require ('multer') 
var fs = require('fs');




/////////////////////****CONTROLLERS ALUNOS  */
module.exports.AdicionarAluno = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        var foto = req.session.logo;
        res.render('colegios/alunos/adicionaralunos', {
            erro: {},
            foto,
        });
    } else {

        res.render("erro");
    }
}

module.exports.ReceberDadosAluno = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {


        var data = new Date();

        tmp = data.getTime();

        var url_img = tmp + '_' + req.files.foto_perfil.originalFilename;

        var path_origem = req.files.foto_perfil.path;
        var path_destino = './app/public/uploads/alunos/' + url_img;
        fs.rename(path_origem, path_destino, function(err) {
            if (err) {
                console.log(err)
                res.send("erro")
                return;
            }
            var dt = new Date();
            var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro');

            function numberToReal(numero) {
                var numero = numero.toFixed(2).split('.');
                numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
                return numero.join(',');
            }

            var x = numberToReal(parseFloat(req.body.propina));
            console.log(x);

            var propina = x;


            var dadosAlunos = {
                codigoPessoal: Math.floor(Math.random() * 1000000),
                propina: propina,
                ciclo: req.body.ciclo,
                genero: req.body.genero,
                nome_Estudante: req.body.nome_Estudante,
                data_nascimento: req.body.data_nascimento,
                propina: req.body.propina,
                curso: req.body.curso,
                numemeroEstudante: req.body.numemeroEstudante,
                classe: req.body.classe,
                turma: req.body.turma,
                tel_mae: req.body.movicel,
                tel_pai: req.body.unitel,
                foto_perfil: url_img,
                usuarioLogin: req.session.nome,
                Colegio: req.session.Nome_Colegio,
                id_escola: req.session._id_colegio,
                anoLetvo: {
                    dia: dt.getDate(),
                    mes: meses[dt.getMonth()],
                    ano: dt.getFullYear(),
                    hora: dt.toLocaleTimeString()
                },
                ano: dt.getFullYear(),
            }
            var Alunos = new application.app.models.Alunos();
            Alunos.InserirAlunos(dadosAlunos, req, res)
        })
    } else {
        res.render("erro");
    }

}

module.exports.ListarTodosAlunos = function(application, req, res) {
    if (req.session.autorizado != true && req.session.nivelAcesso !== 1) {
        res.render("erro");
        return;
    }
    var Alunos = new application.app.models.Alunos();
    var id_colegio = req.session._id_colegio;
    Alunos.ListarTodos(id_colegio, req, res);
}



module.exports.listarPesquisa = function(application, req, res) {
    if (req.session.autorizado && req.session.nivelAcesso == 1) {
        res.render('colegios/alunos/dadosachado');
    } else {
        res.render("erro");
    }
}

module.exports.ListarAlunosporFiltro1 = function(application, req, res) {
        if (req.session.autorizado && req.session.nivelAcesso == 1) {
            var alunos = req.body;
            var Alunos = new application.app.models.Alunos();
            Alunos.pesquisarAluno(alunos, req, res);
        } else {
            res.render("erro");
        }
    }
    /*.................................deletar e editar alunos ...............*/
module.exports.Editar = function(application, req, res) {
    if (req.session.autorizado !== true && req.session.nivelAcesso !== 1) {
        res.render("erro");
        return;
    }

    var Alunos = new application.app.models.Alunos();
    var id_colegio = req.session._id_colegio;
    Alunos.ListardadosparaEditar(id_colegio, req, res);

}

module.exports.deletarAl = function(application, req, res) {
    if (req.session.autorizado != true && req.session.nivelAcesso !== 1) {
        res.render("erro");
        return;
    }

    var id = req.params.id;
    var Alunos = new application.app.models.Alunos();
    Alunos.Deletar(id, req, res);
}
module.exports.editarAl = function(application, req, res) {
    if (req.session.autorizado !== true && req.session.nivelAcesso !== 1) {
        res.render("erro");
        return;
    }
    var id = req.params.id;
    var Alunos = new application.app.models.Alunos();
    Alunos.Editar(id, req, res);

}
module.exports.editarAluno = function(application, req, res) {
    if (req.session.autorizado != true && req.session.nivelAcesso !== 1) {
        res.render("erro");
        return;
    }
    var id = req.body.id;

    var dt = new Date();
    var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro');

    var data = new Date();

    tmp = data.getTime();

    var url_img = tmp + '_' + req.files.foto_perfil.originalFilename;

    var path_origem = req.files.foto_perfil.path;
    var path_destino = './app/public/uploads/alunos/' + url_img;
    fs.rename(path_origem, path_destino, function(err) {
        if (err) {
            console.log(err)
            res.send("erro")
            return;
        }
        data = new Date();
        dataCadastro = data.toUTCString();

        function numberToReal(numero) {
            var numero = numero.toFixed(2).split('.');
            numero[0] = "" + numero[0].split(/(?=(?:...)*$)/).join('.');
            return numero.join(',');
        }

        var x = numberToReal(parseFloat(req.body.propina));
        console.log(x);

        let propina = x;
        const aluno = {
            propina: propina,
            ciclo: req.body.ciclo,
            genero: req.body.genero,
            nome_Estudante: req.body.nome_Estudante,
            data_nascimento: req.body.data_nascimento,
            propina: req.body.propina,
            curso: req.body.curso,
            numemeroEstudante: req.body.numemeroEstudante,
            classe: req.body.classe,
            turma: req.body.turma,
            tel_mae: req.body.movicel,
            tel_pai: req.body.unitel,
            foto_perfil: url_img,
            usuarioLogin: req.session.nome,
            Colegio: req.session.Nome_Colegio,
            id_escola: req.session._id_colegio,
            anoLetvo: {
                dia: dt.getDate(),
                mes: meses[dt.getMonth()],
                ano: dt.getFullYear(),
                hora: dt.toLocaleTimeString()
            },
            ano: dt.getFullYear(),
        }



        var Alunos = new application.app.models.Alunos();

        Alunos.Updatealuno(id, aluno, res);

    });

}