

$(document).ready(function() {
	$('.nav-trigger').click(function() {
		$('.side-nav').toggleClass('visible');
	});
    $('#usuario').click(function(){
        $('#main_content').hide();
    });

    $('#btn_sair').click(()=>{
        alert("Você desligou. Volte sempre!")
        window.location.href = "/sair";
    })

    $('#chec').click(function(){
        $('#side-nav').hide();
    })


    ////////////////////////Tela modal hide e show////////////////////////////
    $('.sobreMim').click(function(){
        $('.modal-sobre').show();
        $('.modal-editar').hide();
    })
    
    $('.btn_editar').click(function(){
        $('.modal-editar').hide();
    })
    $('.btn_sobre').click(function(){
        $('.modal-editar').hide();
    })
    $('.editarColegio').click(function(){
        $('.modal-editar').show();
        $('.modal-sobre').hide();
    })

    $('#btn_terminar').click(function(){
        $('.modal-editar').hide();
        alert("Salvo com sucesso");
    })

  
});