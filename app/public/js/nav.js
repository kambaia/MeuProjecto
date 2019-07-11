 $(document).ready(function() {
     var botao = $('.bt-click1');
     var dropDown = $('.ul-sobreNos');
     botao.on('click', function(event) {
         dropDown.stop(true, true).slideToggle();
         event.stopPropagation();
     });
 })
 $(document).ready(function() {
     var botao = $('.bt-click2');
     var dropDown = $('.ul-encarregado');
     botao.on('click', function(event) {
         dropDown.stop(true, true).slideToggle();
         event.stopPropagation();
     });

 })
 $(document).ready(function() {
     var botao = $('.bt-click3');
     var dropDown = $('.ul-aluno');
     botao.on('click', function(event) {
         dropDown.stop(true, true).slideToggle();
         event.stopPropagation();
     });
 })
 $(document).ready(function() {
     var botao = $('.bt-click4');
     var dropDown = $('.ul-pagar');
     botao.on('click', function(event) {
         dropDown.stop(true, true).slideToggle();
         event.stopPropagation();
     });
 })




 $("#menu-close").css({
     display: 'none'
 });


 $("#menu-sub").click(() => {
     $("#menu-colegios").css({
         display: 'block'
     });

     $("#menu-close").css({
         display: 'block'
     });
     $("#menu-sub").css({
         display: 'none'
     });

 })

 $("#menu-close").click(() => {
     $("#menu-colegios").css({
         display: 'none'
     });

     $("#menu-close").css({
         display: 'none'
     });
     $("#menu-sub").css({
         display: 'block'
     });

 })