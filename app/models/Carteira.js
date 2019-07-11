const url = require("./../../config/dbConnection");
const nodemailer = require('nodemailer');

var MongoClient = require("mongodb").MongoClient;

function Carteira() {

}

Carteira.prototype.AcessarMinha_conta = (codigo, bi, req, res) => {
    let email = req.session.email;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        console.log(bi, codigo)
        conexao.collection("carteira").find({ codigoAcesso: codigo, numeroBI: bi, email: email }).toArray((err, data) => {
            if (data[0] != undefined) {

                req.session.logado = true;
                req.session.saldo = data[0].valor;
                req.session.encarregado = data[0].nome;
                req.session.contaEncaregado = data[0].numeroConta;
                req.session.colegio = data[0].numeroConta;

                if (req.session.logado && codigo == data[0].codigoAcesso && req.session.autorizado) {
                    req.session.logado = true;
                    var saldo = req.session.saldo;
                    var nome = req.session.encarregado;
                    console.log(nome)
                    saldo.toLocaleString();
                    let numconta = req.session.contaEncaregado;
                    console.log(numconta);

                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var conexao = db.db("SistemaPCO");
                        conexao.collection("transferencias").find({ numconta_encarregado: numconta },

                            {
                                sort: [
                                    ['_id', -1]
                                ]
                            }).limit(2).toArray((err, data) => {
                            res.render('encarregados/carteira/minhacarteira', { saldo, pagamento: data });

                        })
                    })
                } else {

                    res.redirect('/encarregados/carteira');
                }
            } else {
                res.redirect('/encarregados/carteira');
                console.log("O código digitado está incorreto. Tente novamente por favor!")
                    /******************************Fim do mongoose ******************************************* */
            }
        })
    })
}



Carteira.prototype.TransfererenciaRecentes_conta = (numeroconta, foto, saldo, req, res) => {
        var foto = req.session.foto_perfil;
        console.log(numeroconta);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            conexao.collection("transferencias").find({ numconta_encarregado: numeroconta }, {
                sort: [
                    ['_id', -1]
                ]
            }).toArray((err, data) => {
                res.render('encarregados/carteira/minhacarteira', { saldo, pagamento: data, foto });
            })
        })
    }
    /******************************colegios******************************************* */

Carteira.prototype.TransfererenciaRecentes_deumaluno = (numeroconta, saldo, req, res) => {


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        conexao.collection("transferencias").find({ numeroContaDestinatario: numeroconta }, {
            sort: [
                ['_id', -1]
            ]
        }).limit(3).toArray((err, data) => {

            res.render('colegios/carteira/minhacarteira', { nome: req.session.nome, saldo, pagamento: data });
        })
    })
}

Carteira.prototype.AcessarMinha_contaC = (codigo, req, res) => {
    var foto = req.session.foto_perfil;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        let numconta = req.session.numeroBI;
        let email = req.session.email;
        console.log(email);
        conexao.collection("carteira").find({ codigoAcesso: codigo, numeroBI: numconta, email: email }).toArray((err, data) => {
            console.log("Passei pelo erro Agora");
            if (data[0] != undefined) {
                req.session.logado = true;
                req.session.saldo = data[0].valor;

                req.session.encarregado = data[0].nome;
                if (req.session.logado && codigo == data[0].codigoAcesso && req.session.autorizado) {
                    req.session.logado = true;
                    req.session.colegio = data[0].numeroConta;
                    var saldo = req.session.saldo;
                    saldo.toLocaleString();

                    var numeroconta = req.session.colegio;

                    MongoClient.connect(url, function(err, db) {
                        if (err) throw err;
                        var conexao = db.db("SistemaPCO");
                        conexao.collection("transferencias").find({ numeroContaDestinatario: numeroconta },

                            {
                                sort: [
                                    ['_id', -1]
                                ]
                            }).limit(3).toArray((err, data) => {
                            console.log(data)
                            res.render('colegios/carteira/minhacarteira', { conta: data, saldo, pagamento: data, foto });
                        })
                    })
                } else {
                    res.redirect('/colegios/carteira');
                }
            } else {
                res.redirect('/colegios/carteira');
                /******************************Fim do mongoose ******************************************* */
            }
        })
    })
}


///////////////////////////////////////////////////SOLICITAÇÃO DA ABERTURA DA CARTEIRA VIRTUAL DO ENCARREGADO /////////////////////////////////////////////////////

Carteira.prototype.SolicitarConta = (cliente, email, numeroBI, res) => {
    console.log(email, numeroBI);
    console.log(cliente.numeroBI);
    if (cliente.email == email && cliente.numeroBI == numeroBI) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            conexao.collection("carteira").find({
                $or: [{
                        email: cliente.email
                    },
                    { numeroBI: cliente.numeroBI },
                    { codigoAcesso: cliente.codigoAcesso },
                    { numeroConta: cliente.numeroConta }
                ]
            }).toArray((err, data) => {

                ///////////////////////Resultados dos dados da carteira 
                if (data[0] != undefined) {
                    /*  toda linha de código que permite enviar o email*/

                    res.send("<h2>Ouve um erro na abertura da sua carteira! Verificou-se que o cliente que solicitou a abertura da conta já possui uma conta.Para mais informaçoes entre em contacto com a nossa equipe de suporte tecnico na pagina inicial do site.<a href='/encarregados/criar_carteira'>Voltar</a></a></h2>");
                } else {
                    const output = `
                                <p>Tu tens uma nova mensagem</p>
                                <h2>"Olá ${cliente.nome}  Obrigado por juntar-se ao pco. Abaixo está os seus dados de confirmação!</h2>
                                <h3>Código de acesso a sua carteira: ${cliente.codigoAcesso} </h3>
                                <h3>Número de conta da sua carteira: ${cliente.numeroConta}</h3>
                                <h5>Caro Cliente por motivos de segurança solicitamos que apois o conhecimento do seu código e o número da sua carteira apaguio, e limpa a reciclagem do email google!</h5>
                                <h5>Caso contrario não nos responsabilizamos</h5>
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

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Contacta Agora ao pco para receber mais informações sobre os nossos serviços"', // sender address
                        to: cliente.email, // list of receivers
                        subject: 'Código de acesso a sua carteira e seu número de conta', // Subject line
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
                        var conexao = db.db("SistemaPCO");
                        conexao.collection("carteira").insert(cliente);
                    });
                }


                //////////////////fim da condição do usuario encontrado////////////////////
            });
        })
    } else {
        res.send("<h2>Não foi possível enviar os dados, o email e o número do seu bilhete não coecidem com o usuário logado!<a href='/encarregados/criar_carteira'> Voltar</a> </h2>")
    }
}

//////////////////////////////////////////////////////////////////////////FIM ///////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////SOLICITAÇÃO DA ABERTURA DA CARTEIRA VIRTUAL DO COLEIO/////////////////////////////////////////////////////

Carteira.prototype.SolicitarContaC = (cliente, email, numeroBI, res) => {
    console.log(cliente);
    console.log(email, numeroBI);
    console.log("Estes são os dados achados")
    console.log(cliente.numeroBI);
    if (cliente.email == email && cliente.numeroBI == numeroBI) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            conexao.collection("carteira").find({
                $or: [{
                        email: cliente.email
                    },
                    { numeroBI: cliente.numeroBI },
                    { codigoAcesso: cliente.codigoAcesso },
                    { numeroConta: cliente.numeroConta }
                ]
            }).toArray((err, data) => {

                ///////////////////////Resultados dos dados da carteira 
                if (data[0] != undefined) {
                    /*  toda linha de código que permite enviar o email*/

                    res.send("<h2>Ouve um erro na abertura da sua carteira! Verificou-se que o cliente que solicitou a abertura da conta já possui uma conta.Para mais informaçoes entre em contacto com a nossa equipe de suporte tecnico na pagina inicial do site.<a href='/colegios/criar_carteira'>Voltar</a></a></h2>");
                } else {
                    const output = `
                                <p>Tu tens uma nova mensagem</p>
                                <h2>"Olá ${cliente.nome}  Obrigado por juntar-se ao pco. Abaixo está os seus dados de confirmação!</h2>
                                <h3>Código de acesso a sua carteira: ${cliente.codigoAcesso} </h3>
                                <h3>Número de conta da sua carteira: ${cliente.numeroConta}</h3>
                                <h5>Caro Cliente por motivos de segurança solicitamos que apois o conhecimento do seu código e o número da sua carteira apaguio, e limpa a reciclagem do email google!</h5>
                                <h5>Caso contrario não nos responsabilizamos</h5>
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

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Contacta Agora ao pco para receber mais informações sobre os nossos serviços"', // sender address
                        to: cliente.email, // list of receivers
                        subject: 'Código de acesso a sua carteira e seu número de conta', // Subject line
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
                        var conexao = db.db("SistemaPCO");
                        conexao.collection("carteira").insert(cliente);
                    });
                }


                //////////////////fim da condição do usuario encontrado////////////////////
            });
        })
    } else {
        res.send("<h2>Não foi possível enviar os dados, o email e o número do seu bilhete não coecidem com o usuário logado!<a href='/colegios/criar_carteira'> Voltar</a> </h2>")
    }
}



module.exports = function() {
    return Carteira;
}