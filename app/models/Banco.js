const url = require("../../config/dbConnection");

var MongoClient = require("mongodb").MongoClient;

function Banco() {

}
/*
Banco.prototype.SolicitarUmaConta = (cliente, email, numeroBI, res) => {

    res.send(cliente);
    /*
    if (dados.email == email && dados.numeroBI == numeroBI) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            console.log(email, numeroBI);
            var conexao = db.db("SistemaPCO");
            conexao.collection("usuarios").find({
                $or: [
                    { nome: dados.nome },
                    { email: dados.email },
                    { numeroBI: dados.numeroBI }
                ]
            }).toArray((err, data) => {
                if (data[0] != undefined) {
                    console.log("Estes são os dados encontrados!")
                    console.log(data);


                    if (data[0].email == dados.email && data[0].numeroBI == dados.numeroBI) {
                        console.log(data);
                        MongoClient.connect(url, function(err, db) {
                            if (err) throw err;
                            var conexao = db.db("SistemaPCO");
                            conexao.collection("carteira").find({
                                $or: [{
                                        email: dados.email
                                    },
                                    { numeroBI: dados.numeroBI },
                                    { codigoAcesso: dados.codigoAcesso }
                                ]
                            }).toArray((err, data) => {

                                ///////////////////////Resultados dos dados da carteira 
                                if (data[0] != undefined) {
                                    /*  toda linha de código que permite enviar o email

    const output = `
        <p>Tu tens uma nova mensagem</p>
        <h3>Contacta Agora ao pco para receber mais informações sobre os nossos serviços</h3>
        <h3>Seu código: </h3>
        <h2>${data[0].codigoAcesso}</h2>
        <h5>Caro usuário  por motivo de segurança solicitamos que apois o conhecimento do seu código apaguio, e limpa a reciclagem!</h5>
        `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kambaiaalberto@gmail.com', // generated ethereal user
        pass: '2212dejunho' // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
    });
    console.log(dados.email);
    // setup email data with unicode symbols
    let mailOptions = {
    from: '"Olá este é o seu codigo de confirmação!"', // sender address
    to: dados.email, // list of receivers
    subject: 'código de acesso a sua carteira', // Subject line
    text: '', // plain text body
    html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.render("encarregados/confirmacao_data_carteira");
    });
    }
    });
    })
    }
    //////////////////fim da condição do usuario encontrado////////////////////
    }
    else {
        res.send("Não foi possível enviar os dados, o email e o número do seu bilhete não coecidem")
    }

    })

    })
    } else {
        res.send("Erro, Os dados entroduzido não pertecem ao usúario logado")
            /******************************Fim do mongoose ******************************************* */
/* }
     
}



/*
Banco.prototype.SolicitarUmaConta = (dados, res) => {

    console.log(dados);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var conexao = db.db("SistemaPCO");

        conexao.collection("usuarios").find({
            $or: [
                { nome: dados.nome },
                { email: dados.email },
                { numeroIB: dados.numeroBI }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {
                /* condição que verifica a abertura da conta 

                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var conexao = db.db("SistemaPCO");
                    conexao.collection("carteira").find({
                        $or: [{
                                email: dados.email
                            },
                            { codigoAcesso: dados.codigoAcesso }
                        ]
                    }).toArray((err, data) => {
                        if (data[0] != undefined) {
                            console.log("Os dados já se encontra Cadstrado");
                            console.log(data);
                            res.send("Os dados já se encontram cadastrado")
                        } else {
                            MongoClient.connect(url, function(err, db) {
                                if (err) throw err;
                                var conexao = db.db("SistemaPCO");
                                conexao.collection("carteira").insert(dados);
                                res.redirect("/bancos");
                            });

                        }
                    })

                })

            } else {
                res.send("O usuario não foi encontrado")
            }

            /////////////////////////////////////////////////////Fim da contição da existencia de conta///////////
        })
    })


}
*/

Banco.prototype.confirmarConta_cliente = (dados, req, res) => {
    var conta = parseInt(dados.numeroConta);
    console.log(dados);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("carteira").find({
            $or: [
                { nome: dados.nome },
                { numeroConta: conta }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {
                req.session.nome = data[0].nome;
                req.session.valor = data[0].valor;
                req.session.numeroConta = data[0].numeroConta;

                res.render('bancos/fazerDeposito', { data, nome: req.session.nome });
            } else {
                res.send("O cliente não existe. Certifique os dados e tente novamente");
            }
        });
    });
}

Banco.prototype.Depositar = (deposito, req, res) => {
    var nome = req.session.nome;
    var conta = req.session.numeroConta;
    var valorVindoDoBanco = req.session.valor;
    deposito = parseInt(deposito);
    valorVindoDoBanco = valorVindoDoBanco.replace(/[\.,]/g, '') * 1 / 100;
    valorVindoDoBanco = parseInt(valorVindoDoBanco);


    console.log(valorVindoDoBanco)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("carteira").find({
            $or: [
                { nome: nome },
                { numeroConta: conta }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {

                function numeroParaMoeda(n, c, d, t) {
                    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                }
                console.log(deposito);
                let novoValor = deposito + valorVindoDoBanco
                console.log(novoValor);
                saldoAtual = numeroParaMoeda(novoValor);
                console.log(saldoAtual);
                var conexao = db.db("SistemaPCO");
                conexao.collection("carteira").update({
                    numeroConta: conta
                }, {
                    $set: {
                        valor: saldoAtual
                    }
                })
                res.render('bancos/fazerDeposito', { data, nome: req.session.nome });
            } else {
                res.send("O cliente não existe. Certifique os dados e tente novamente");
            }
        });
    });

}




/* -----------------------consultar conta do cliente ------------------*/

Banco.prototype.Consultar_conta = (numeroConta, req, res) => {
    var conta = parseInt(numeroConta);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("carteira").find({
            $or: [
                { numeroConta: conta }
            ]
        }).toArray((err, data) => {
            if (data[0] != undefined) {
                res.render('bancos/cliente', { data, nome: req.session.nome });
            } else {
                res.send("O cliente não existe. Certifique os dados e tente novamente");
            }
        });
    });

}


/* -----------------------consultar contaTodos os clientes ------------------*/

Banco.prototype.Consultar_contaTodos = (res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("carteira").find().toArray((err, data) => {
            if (data[0] != undefined) {
                res.render('bancos/todosclientes', { data });
            }
        });
    });

}






module.exports = function() {
    return Banco;
}