$(document).ready(function() {


    $("#Botao").click(() => {
        var tipoUsuario = $("input[name='opcao']:checked").val();
        console.log(tipoUsuario);
        if (tipoUsuario == 1) {
            window.location.href = "/acesso-colegio";
            var valor = $("#nivelacesso").val(tipoUsuario);
            console.log(valor)
        } else if (tipoUsuario == 2) {
            console.log("SEJA BEM-VINDO ENCARREGADO");
            window.location.href = "/acesso-encarregado";
            var valor = $("#nivelacesso").val(tipoUsuario);
            console.log(valor)

        } else {
            console.log("deves selecionar uma das opção");
        }
    })


    function load() {
        $(".painel").css(
            "display", "block"
        )
        setInterval(load, 10000);


    }

    function parar() {
        clearInterval(load);
    }

    $('#enviar').click(() => {
        load();
        parar();
        window.location.href = "/auth";
    });
    /*           aqui é onde estou a colocar o codigo que tem a funcionalidade que esquero.................*/
    $("#s1").click(function() {
        console.log("mostrei")
        $("#descipcao1").show();
        $("#s1").hide();
    });
    $("#descipcao1").click(function() {
        console.log("mostrei")
        $("#s1").show();
        $("#descipcao1").hide();
    });
    /////////////////////
    $("#s2").click(function() {
        console.log("mostrei")
        $("#descipcao2").show();
        $("#s2").hide();
    });
    $("#descipcao2").click(function() {
        console.log("mostrei")
        $("#s2").show();
        $("#descipcao2").hide();
    });
    ////////////////////////////////////////////
    $("#s3").click(function() {
        console.log("mostrei")
        $("#descipcao3").show();
        $("#s3").hide();
    });
    $("#descipcao3").click(function() {
        console.log("mostrei")
        $("#s3").show();
        $("#descipcao3").hide();
    });
    ///////////////////////////////////
    $("#s4").click(function() {
        console.log("mostrei")
        $("#descipcao4").show();
        $("#s4").hide();
    });
    $("#descipcao4").click(function() {
        console.log("mostrei")
        $("#s4").show();
        $("#descipcao4").hide();
    });
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////
    $("#s5").click(function() {
        console.log("mostrei")
        $("#descipcao5").show();
        $("#s5").hide();
    });
    $("#descipcao5").click(function() {
        console.log("mostrei")
        $("#s5").show();
        $("#descipcao5").hide();
    });

    ///////////////////////////////////
    $("#s6").click(function() {
        console.log("mostrei")
        $("#descipcao6").show();
        $("#s6").hide();
    });
    $("#descipcao6").click(function() {
        console.log("mostrei")
        $("#s6").show();
        $("#descipcao6").hide();
    });

    ///////////////////////////////////
    $("#s7").click(function() {
        console.log("mostrei")
        $("#descipcao7").show();
        $("#s7").hide();
    });
    $("#escipcao7").click(function() {
        console.log("mostrei")
        $("#s7").show();
        $("#descipcao7").hide();
    });
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////
    $("#s8").click(function() {
        console.log("mostrei")
        $("#descipcao8").show();
        $("#s8").hide();
    });
    $("#descipcao8").click(function() {
        console.log("mostrei")
        $("#s8").show();
        $("#descipcao8").hide();
    });

    $('#upload').change(function() {
        const arquivo = $(this)[0].files[0];

        const fileReader = new FileReader();
        fileReader.onloadend = function() {
            $('#imagem').attr('src', fileReader.result)
        }
        fileReader.readAsDataURL(arquivo);
    })




    $('#sexo').change(function() {
        alert("Seleciona um foto de perfil para Aluno")
        if (this.value == "Femenino") {

            $('#upload').change(function() {
                const arquivo = $(this)[0].files[0];

                const fileReader = new FileReader();
                fileReader.onloadend = function() {
                    $('#femenino').attr('src', fileReader.result);
                }
                fileReader.readAsDataURL(arquivo);
            })
        } else {

            $('#upload').change(function() {
                const arquivo = $(this)[0].files[0];

                const fileReader = new FileReader();
                fileReader.onloadend = function() {
                    $('#masculino').attr('src', fileReader.result);
                }
                fileReader.readAsDataURL(arquivo);
            })
        }
    })
})