

$(document).ready(function() {

    $("#home").children('div').hide();
    $("#tipoUsuario").on('change', function(){
        var valorUsuario= '#'+ $(this).val();

        $("#home").children('div').hide();

        $("#home").children(valorUsuario).show();
    })
})