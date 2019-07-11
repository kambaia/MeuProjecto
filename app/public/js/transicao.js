$(function() {

    /************************************Deslogar da carteira do encarregado ***************************** */
    $('#deslogaEn').click(() => {
            alert("Você desligou. Volte sempre!")
            window.location.href = "/sair";
        })
        //////////////////////////////////fim da saida da carteira/////////////////////////////////////////////////////////

    /************************************Deslogar da carteira d encarregado ***************************** */
    $('#deslogaCo').click(() => {
        alert("Você desligou. Volte sempre!")
        window.location.href = "/sair";
    })

    /************************************Deslogar da carteira do colegio***************************** */

    $('form')
        .hide()
        .fadeIn(2000);
    $("#codigo_secreto").bind('focus, keyup', function() {
        const codigo = this.value;
        let tamanho = codigo.length;
        if (tamanho <= 5) {
            console.log("errooooo");
            $("#codigo_secreto").css({
                border: '2px solid rgb(255, 0, 0)'
            });
        } else {
            $("#codigo_secreto").css({
                border: 'none'
            });
        }
    })


    /*Validação do pagamento///////////////*/


    $("#nuConta_encarregado").bind('focus, keyup', function() {
        const codigo = this.value;
        let tamanho = codigo.length;
        if (tamanho <= 7) {
            console.log("errooooo");
            $("#nuConta_encarregado").css({
                border: '2px solid rgb(255, 0, 0)'
            });
        } else {
            $("#nuConta_encarregado").css({
                border: 'none'
            });
        }
    })



    $("#codigoPessoal").bind('focus, keyup', function() {
        const codigo = this.value;
        let tamanho = codigo.length;
        if (tamanho <= 5) {
            console.log("errooooo");
            $("#codigoPessoal").css({
                border: '2px solid rgb(255, 0, 0)'
            });
        } else {
            $("#codigoPessoal").css({
                border: 'none'
            });
        }
    })




    /*Verificação e validaçãp dos dados de pagamento da propina */



    $("#mesesapagar").change(function() {

        const mes = this.value;
        if (mes == "Escolha as opções") {
            console.log("errooooo");
            $("#codigoPessoal").css({
                border: '2px solid rgb(255, 0, 0)'
            });
        } else {
            $(".div-parapagar").css({ "display": " block", "font-size": "100%" });
        }
    })


    $("#numContacolegio").bind('focus, keyup', function() {
        const codigo = this.value;
        let tamanho = codigo.length;
        if (tamanho <= 7) {
            console.log("errooooo");
            $("#numContacolegio").css({
                border: '2px solid rgb(255, 0, 0)'
            });
        } else {
            $("#numContacolegio").css({
                border: 'none'
            });
        }
    })



    $("#valor_apagar").bind('focus, keyup', function() {
        const valor = this.value;
        let tamanho = valor.length;
        if (tamanho <= 3 || valor < 2000) {
            console.log("errooooo");
            $("#valor_apagar").css({
                border: '2px solid rgb(255, 0, 0)'
            });
        } else {
            $("#valor_apagar").css({
                border: 'none'
            });

            $('#aviso').fadeOut(1000);
        }
    })

})