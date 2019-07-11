var fs = require('fs');

module.exports.cadastro = function(application, req, res) {
    res.render('usuarioencarregado', { validacao: {}, dadosForm: {} });
}


module.exports.CadastrarEncarregado = function(application, req, res) {
    var dadosForm = req.body;
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('email', 'O campo deve ser do tipo email').isEmail();
    req.assert('senha', 'O campo da Senha não pode ser vazio').notEmpty();
    req.assert('senha', 'A senha teve ter no maximo 6 caracter').isLength({ min: 5 });
    req.assert('confirmaSenha', 'Senha não pode ser vazio').notEmpty();
    req.assert('confirmaSenha', 'A palavara passe não coincidem').equals(req.body.senha);
    req.assert('data_nascimento', 'A Data de Nascimento é obrigatória').notEmpty();
    req.assert('data_nascimento', 'Data de Nascimento inválida').isDate({ format: 'YYYY-MM-DD' });

    req.assert('Nome_encarregado', 'O nome deve ter mais de 15 caracter').isLength({ min: 8 }).notEmpty();
    req.assert('genero', 'seleciona o genero').notEmpty();
    req.assert('numeroBI', 'O número do bilhete de identidade naõ é válido! Verifica e tente novamente').isLength({ min: 13, max: 14 })
    req.assert('id_colegio', 'O código é inválido! digite o código dado pela escola do seu educando').isLength({ min: 4 }).notEmpty();
    req.assert('provincia', 'seleciona a província ').notEmpty();
    req.assert('municipio', 'O município não pode ser vazio e deve ter no minimo 4 caracteres').isLength({ min: 4 }).notEmpty();
    req.assert('bairro', 'O bairro não pode ser vazio e deve ter no minimo 4 caracteres').isLength({ min: 4 }).notEmpty();


    var erros = req.validationErrors();

    if (erros) {
        res.render('usuarioencarregado', { validacao: erros, dadosForm });
        return;
    }
    if (req.body.confirmaSenha != req.body.senha) {
        console.log("As senhas não não iguais")
        return;
    }
    console.log(req.body);
    var data = new Date();

    tmp = data.getTime();

    var url_img = tmp + '_' + req.files.foto_perfil.originalFilename;
    var path_origem = req.files.foto_perfil.path;
    var path_destino = './app/public/uploads/img_encarregados/' + url_img;
    fs.rename(path_origem, path_destino, function(err) {
        if (err) {
            console.log(err)
            res.send("erro")
            return;
        }

        console.log(url_img)

        data = new Date();
        dataCadastro = data.toUTCString();

        var encarredado = {
            codigo_identificacao: Math.floor(Math.random() * 1000000),
            foto_perfil: url_img,
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            nome_encarregado: req.body.Nome_encarregado,
            data_nascimento: req.body.data_nascimento,
            genero: req.body.genero,
            numeroBI: req.body.numeroBI,
            nivelAcesso: 2,
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
            id_colegio: req.body.id_colegio,
        }
        console.log(encarredado);
        var Usuarios = new application.app.models.Usuarios();
        Usuarios.inserirUsuario(encarredado, res);
    })


}


module.exports.formacaoDeCadastro = function(application, req, res) {
    res.render("form_confirmacao");
}