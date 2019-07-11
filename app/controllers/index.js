module.exports.index = function(application, req, res) {
    var dados = [{
            nome: 'Kambaia',
            sobrenome: 'Alberto',
            idade: 20,
            telefone: {
                unitel: '944969865',
                movice: '992735637'
            }
        },
        {
            nome: 'Peter',
            sobrenome: 'Amanix',
            idade: 20,
            telefone: {
                unitel: '944969864',
                movice: '992735637'
            }
        },
        {
            nome: 'Adolin',
            sobrenome: 'Fabio',
            idade: 20,
            telefone: {
                unitel: '944969865',
                movice: '992735637'
            }
        },
        {
            nome: 'Fatinico',
            sobrenome: 'Pedro',
            idade: 20,
            telefone: {
                unitel: '944969864',
                movice: '992735637'
            }
        },

        {
            nome: 'Mamaia',
            sobrenome: 'Alberto',
            idade: 20,
            telefone: {
                unitel: '944969865',
                movice: '992735637'
            }
        },
        {
            nome: 'Kambaia',
            sobrenome: 'Alberto',
            idade: 20,
            telefone: {
                unitel: '944969864',
                movice: '992735637'
            }
        }

    ]

    res.render('index', { validacao: {}, alunos: dados });
}
module.exports.servicos = function(application, req, res) {
    res.render('servicos', { validacao: {} });
}

module.exports.contato = function(application, req, res) {
    res.render('contato', { validacao: {} });
}
module.exports.enviarcontato = function(application, req, res) {

    var vizitante = req.body;
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('email', 'Email não pode ser vazio').notEmpty();
    req.assert('telefone', 'digite o seu telefone o campo não pode ser vazio').notEmpty();
    req.assert('mensagem', 'Digite alguma mensagem útil, o campo não pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render('contato', { validacao: erros });
        return;
    }
    data = new Date();
    dataCadastro = data.toUTCString();
    var vizitante = {
        nome: req.body.nome + " " + req.body.subrenome,
        email: req.body.email,
        telefone: req.body.telefone,
        mensagem: req.body.mensagem,
        data: dataCadastro,
        codigo: Math.floor(Math.random() * 1000000)
    }

    var index = new application.app.models.index();
    index.inserirVisitante(vizitante);
    res.render("confirmacao_mesagem");
}


module.exports.sobre = function(application, req, res) {
    res.render('sobre', { validacao: {} });
}
module.exports.equipa = function(application, req, res) {
    res.render('equipa', { validacao: {} });
}


module.exports.ajuda = function(application, req, res) {
    res.render('ajuda', { validacao: {} });
}