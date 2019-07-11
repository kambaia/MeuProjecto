const url = require("./../../config/dbConnection");

var MongoClient = require("mongodb").MongoClient;

function Pagamentos() {

}
//////////////////////fim da solicitação de conta ////////////////////////////////////////////////////////////

Pagamentos.prototype.VerificarAluno = (dadostransferidos, colegio, req, res) => {
        let numeroestudante = parseInt(dadostransferidos.codigoPessoal);

        req.session.codigoPessoal = numeroestudante;

        let numeroConta = parseInt(dadostransferidos.nuConta_encarregado);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var conexao = db.db("SistemaPCO");
            /////procurando Encarregado pelo seu número de conta ////////
            conexao.collection("carteira").find({ numeroConta: numeroConta }).toArray((err, data) => {
                if (data[0] != undefined) {
                    /////procurando estudante ////////
                    conexao.collection("alunos").find({ codigoPessoal: numeroestudante, id_escola: colegio }).toArray((err, data) => {
                        if (data[0] != undefined) {
                            req.session.id_escola = data[0].id_escola;
                            req.session.nomedoestudante = data[0].nome_Estudante;
                            req.session.foto = data[0].foto_perfil;
                            req.session.classe = data[0].classe;
                            req.session.Colegio = data[0].Colegio;
                            req.session.numeroDoEstudante = data[0].numemeroEstudante;

                            req.session.aluno = data;

                            console.log("///////////////////////Multa//////////////////////////////");
                            req.session.id = data[0].codigoPessoal;

                            res.render('encarregados/carteira/verificar_aluno', { aluno: data, validacao: {}, dadosForm: {} });
                        } else {
                            res.send("<br><h3>O código de estudante não não foi reconhecido. Tente novamente! e se não acessar por favor dirija-se a instituição e peça código do estudante ou nº <a href='/encarregados/carteira/pagar'> Voltar</a>");

                            /******************************Fim do mongoose ******************************************* */
                        }
                    });
                } else {
                    res.send("<h3>O número de conta inserido não foi encontrado<h3><br>tentenovamente<a href='/encarregados/carteira/pagar'> Voltar</a>");
                    /******************************Fim do mongoose ******************************************* */
                }
            });
        });

    }
    ////////////////////////////////////////////////////////////////////Metodo que faz todo processo de pagamento///////////////////////////////////////////

Pagamentos.prototype.pagar = (dadosatrasnferir, saldo, req, res) => {

    var dt = new Date();
    let ano = dt.getFullYear();
    let dia = dt.getDate();

    let numeroContaDestinatario = parseInt(dadosatrasnferir.numeroContaDestinatario);
    let contaEnc = parseInt(req.session.contaEncaregado);
    let saldEncaregado = saldo.replace(/[\.,]/g, '') * 1 / 100;
    let valorapagar = parseInt(dadosatrasnferir.valor_apagar);


    console.log(contaEnc);

    if (saldEncaregado >= valorapagar) {
        console.log("Disconto do valor do encarregado");


        /////////////////////////////Fazendo o pagamento sem multa//////////////////////////////////////////////////////////////////////////////////////////////        
        if (ano == ano && dia > 0 && dia <= 15) {
            const saldoAtualenc = saldEncaregado - valorapagar;


            let contaEnc = parseInt(req.session.contaEncaregado);


            function numeroParaMoeda(n, c, d, t) {
                c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            }
            let saldoconvertido = numeroParaMoeda(saldoAtualenc);
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var conexao = db.db("SistemaPCO");
                conexao.collection("carteira").update({
                    numeroConta: contaEnc
                }, {
                    $set: {
                        valor: saldoconvertido
                    }
                });

                var conexao = db.db("SistemaPCO");
                /////procurando Encarregado pelo seu número de conta ////////
                conexao.collection("carteira").find({ numeroConta: numeroContaDestinatario }).toArray((err, data) => {
                    if (data[0] != undefined) {
                        /////Criando a logica de pagamento////////
                        const conta = data[0].numeroConta;
                        let SaldodoColegio = data[0].valor;
                        SaldodoColegio = SaldodoColegio.replace(/[\.,]/g, '') * 1 / 100;

                        const totalnaConta = SaldodoColegio + valorapagar;
                        let multaApar = 0;

                        function numeroParaMoeda(n, c, d, t) {
                            c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                        }
                        //let novoValor =  deposito+valorVindoDoBanco

                        const valortransferido = numeroParaMoeda(valorapagar);
                        const novoValor = numeroParaMoeda(totalnaConta);

                        var conexao = db.db("SistemaPCO");
                        conexao.collection("carteira").update({
                            numeroConta: conta
                        }, {
                            $set: {
                                valor: novoValor
                            }
                        });
                        ////////////////////////////////////Valores que seram inseridos ///////////////////////////////////////////////////
                        var dt = new Date();
                        let codigo = req.session.codigoPessoal

                        var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro');
                        var diassemana = new Array('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta--Feira', 'Sexta-Feira', 'Sábado');
                        let dat = dt.getDate() + '/' + meses[dt.getMonth()] + '/' + dt.getFullYear();
                        const dados_da_transferencia = {
                            codigo_colegio: req.session.id_escola,
                            nomeEncarregado: req.session.encarregado,
                            numconta_encarregado: contaEnc,
                            foto: req.session.foto,
                            estudante: req.session.nomedoestudante,
                            classe: req.session.classe,
                            numerode_estudante: req.session.numeroDoEstudante,
                            colegio: req.session.Colegio,
                            numeroContaDestinatario: numeroContaDestinatario,

                            mese: dadosatrasnferir.mese,
                            numerodemeses: dadosatrasnferir.numerodemeses,
                            valortransferido: valortransferido,
                            multa: multaApar,
                            data: dat,
                            diaSemana: diassemana[dt.getDay()],
                            mes: meses[dt.getMonth()],
                            Anoletivo: {
                                dia: dt.getDate(),
                                mes: meses[dt.getMonth()],
                                ano: dt.getFullYear(),
                                hora: dt.toLocaleTimeString()
                            },
                            date: Date()

                        }
                        console.log("Aqui passamos na transferencia");

                        ////////////////////////////////FAzendo a transferencia do valor ///////////////////////////////////////////////// 
                        var conexao = db.db("SistemaPCO");
                        conexao.collection("transferencias").insert(dados_da_transferencia);
                        res.render('encarregados/carteira/confirmacao_pagamento');
                    } else {
                        res.send("<br><h2>Erro! Não foi possivel fazer a transfêrencia o número de conta pela qual deseja </h2>");
                    }
                })
            })


            //////////////////////////fim do pagamento sem multas ///////////////////////////////////////////
        } else if (ano == ano && dia >= 16 && dia <= 30) {

            ////////////////////////////Pagamento com multa de 15% ///////////////////////////////////////
            console.log('//////////////////////////////////////////////////////////////////Pagamento com multa de 15% ')
            const saldoAtualenc = (saldEncaregado - valorapagar) - (valorapagar * 15 / 100);

            let contaEnc = parseInt(req.session.contaEncaregado);

            function numeroParaMoeda(n, c, d, t) {
                c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            }
            let saldoconvertido = numeroParaMoeda(saldoAtualenc);
            MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var conexao = db.db("SistemaPCO");
                    conexao.collection("carteira").update({
                        numeroConta: contaEnc
                    }, {
                        $set: {
                            valor: saldoconvertido
                        }
                    });

                    var conexao = db.db("SistemaPCO");
                    /////procurando Encarregado pelo seu número de conta ////////
                    conexao.collection("carteira").find({ numeroConta: numeroContaDestinatario }).toArray((err, data) => {
                        if (data[0] != undefined) {
                            /////Criando a logica de pagamento////////

                            const conta = data[0].numeroConta;
                            let SaldodoColegio = data[0].valor;
                            SaldodoColegio = SaldodoColegio.replace(/[\.,]/g, '') * 1 / 100;

                            /////////////////////////Logica para achar  pagamento com multa em percentagem/////////////////////////////////
                            const totalnaConta = (SaldodoColegio + valorapagar) + (valorapagar * 15 / 100);
                            //////////////
                            const multa = valorapagar * (15 / 100);
                            const valortransferidoComMulta = valorapagar + multa;



                            function numeroParaMoeda(n, c, d, t) {
                                c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                            }
                            //let novoValor =  deposito+valorVindoDoBanco


                            const novoValor = numeroParaMoeda(totalnaConta);
                            const valoratransferir = numeroParaMoeda(valortransferidoComMulta);
                            const multaApar = numeroParaMoeda(multa);


                            var conexao = db.db("SistemaPCO");
                            conexao.collection("carteira").update({
                                numeroConta: conta
                            }, {
                                $set: {
                                    valor: novoValor
                                }
                            });
                            ////////////////////////////////////Valores que são inseridos ///////////////////////////////////////////////////
                            var dt = new Date();
                            let codigo = req.session.codigoPessoal


                            var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro');
                            var diassemana = new Array('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado');
                            let dat = dt.getDate() + '/' + meses[dt.getMonth()] + '/' + dt.getFullYear();
                            const dados_da_transferencia = {
                                codigoPessoal: codigo,
                                nomeEncarregado: req.session.encarregado,
                                numconta_encarregado: contaEnc,
                                foto: req.session.foto,
                                estudante: req.session.nomedoestudante,
                                classe: req.session.classe,
                                numerode_estudante: req.session.numeroDoEstudante,
                                colegio: req.session.Colegio,
                                numeroContaDestinatario: numeroContaDestinatario,

                                mese: dadosatrasnferir.mese,
                                numerodemeses: dadosatrasnferir.numerodemeses,
                                valortransferido: valoratransferir,
                                multa: multaApar,
                                data: dat,
                                diaSemana: diassemana[dt.getDay()],
                                mes: meses[dt.getMonth()],
                                Anoletivo: {
                                    dia: dt.getDate(),
                                    mes: meses[dt.getMonth()],
                                    ano: dt.getFullYear(),
                                    hora: dt.toLocaleTimeString()
                                },
                                date: Date()
                            }

                            console.log("Aqui passamos na transferencia");

                            ////////////////////////////////FAzendo a transferencia do valor ///////////////////////////////////////////////// 
                            var conexao = db.db("SistemaPCO");
                            conexao.collection("transferencias").insert(dados_da_transferencia);
                            res.render('encarregados/carteira/confirmacao_pagamento');
                        } else {
                            res.send("<br><h2>Erro! Não foi possivel fazer a transfêrencia o número de conta pela qual deseja </h2>");
                        }
                    })
                })
                ///////////////////////////////////////////////////////////////////Fim do pagamento com Multas 15% /////////////////
        } else {

            ////////////////////////////Pagamento com multa de 25% ///////////////////////////////////////
            console.log('//////////////////////////////////////////////////////////////////Pagamento com multa de 25% ')
            const saldoAtualenc = (saldEncaregado - valorapagar) - (valorapagar * 25 / 100);

            let contaEnc = parseInt(req.session.contaEncaregado);


            function numeroParaMoeda(n, c, d, t) {
                c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
            }
            let saldoconvertido = numeroParaMoeda(saldoAtualenc);
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var conexao = db.db("SistemaPCO");
                conexao.collection("carteira").update({
                    numeroConta: contaEnc
                }, {
                    $set: {
                        valor: saldoconvertido
                    }
                });

                var conexao = db.db("SistemaPCO");
                /////procurando Encarregado pelo seu número de conta ////////
                conexao.collection("carteira").find({ numeroConta: numeroContaDestinatario }).toArray((err, data) => {
                    if (data[0] != undefined) {
                        /////Criando a logica de pagamento////////
                        const conta = data[0].numeroConta;
                        let SaldodoColegio = data[0].valor;
                        SaldodoColegio = SaldodoColegio.replace(/[\.,]/g, '') * 1 / 100;

                        const totalnaConta = (SaldodoColegio + valorapagar) + (valorapagar * 25 / 100);
                        const multa = valorapagar * (25 / 100);
                        const valortransferidoComMulta = valorapagar + multa;

                        function numeroParaMoeda(n, c, d, t) {
                            c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
                            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                        }
                        //let novoValor =  deposito+valorVindoDoBanco
                        const novoValor = numeroParaMoeda(totalnaConta);
                        const valorAtransferir = numeroParaMoeda(valortransferidoComMulta);
                        const multaApar = numeroParaMoeda(multa);


                        var conexao = db.db("SistemaPCO");
                        conexao.collection("carteira").update({
                            numeroConta: conta
                        }, {
                            $set: {
                                valor: novoValor
                            }
                        });
                        ////////////////////////////////////Valores que são inseridos ///////////////////////////////////////////////////
                        var dt = new Date();
                        let codigo = req.session.codigoPessoal

                        var meses = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Desembro');
                        var diassemana = new Array('Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado');
                        let dat = dt.getDate() + '/' + meses[dt.getMonth()] + '/' + dt.getFullYear();
                        const dados_da_transferencia = {
                                codigoPessoal: codigo,
                                nomeEncarregado: req.session.encarregado,
                                numconta_encarregado: contaEnc,
                                foto: req.session.foto,
                                estudante: req.session.nomedoestudante,
                                classe: req.session.classe,
                                numerode_estudante: req.session.numeroDoEstudante,
                                colegio: req.session.Colegio,
                                numeroContaDestinatario: numeroContaDestinatario,

                                mese: dadosatrasnferir.mese,
                                numerodemeses: dadosatrasnferir.numerodemeses,
                                valortransferido: valorAtransferir,
                                multa: multaApar,
                                data: dat,
                                diaSemana: diassemana[dt.getDay()],
                                mes: meses[dt.getMonth()],
                                Anoletivo: {
                                    dia: dt.getDate(),
                                    mes: meses[dt.getMonth()],
                                    ano: dt.getFullYear(),
                                    hora: dt.toLocaleTimeString()
                                },
                                date: Date()
                            }
                            ////////////////////////////////FAzendo a transferencia do valor ///////////////////////////////////////////////// 
                        var conexao = db.db("SistemaPCO");
                        conexao.collection("transferencias").insert(dados_da_transferencia);
                        res.render('encarregados/carteira/confirmacao_pagamento');
                    } else {
                        res.send("<br><h2>Erro! Não foi possivel fazer a transfêrencia o número de conta pela qual deseja </h2>");
                    }
                })
            })

            ///////////////////////////////////////////////////////////////////Fim do pagamento com Multas 15% /////////////////

        }
    } else {
        res.send("<h3>infelimente não tens dinheiro suficiente para fazeres o</h2></a>");
    }
}


Pagamentos.prototype.faturadospagameto = (numeroconta, req, res) => {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            var conexao = db.db("SistemaPCO");
            conexao.collection("transferencias").find({ numconta_encarregado: numeroconta }, {
                sort: [
                    ['_id', -1]
                ]
            }).toArray(function(err, data) {
                res.render('encarregados/carteira/listarpagamentos', { nome: req.session.nome, pagamento: data });
            });
        })
    }
    /*******************************************Pegado todos os pagaemtos de todos os alunos************************************************** */
Pagamentos.prototype.faturadospagametoAlunos = (numeroconta, req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var conexao = db.db("SistemaPCO");
        /////procurando Encarregado pelo seu número de conta ////////
        conexao.collection("transferencias").find({ numeroContaDestinatario: numeroconta }, {
            sort: [
                ['_id', -1]
            ]
        }).toArray((err, data) => {
            console.log(numeroconta);
            if (data[0] != undefined) {
                console.log(data);
                res.render('colegios/carteira/listarpagamentos', { nome: req.session.nome, pagamento: data });
            } else {
                console.log(data);
                res.render('colegios/carteira/listarpagamentos', { nome: req.session.nome, pagamento: {} });
            }
        })
    })
}



module.exports = function() {
    return Pagamentos;
}