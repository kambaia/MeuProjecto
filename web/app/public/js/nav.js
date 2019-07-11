 
$(document).ready(function()
    { 
     var botao = $('.bt-click1'); 
     var dropDown = $('.ul-sobreNos'); 
     botao.on('click', function(event){
         dropDown.stop(true,true).slideToggle();
         event.stopPropagation(); 
     }); 
})
$(document).ready(function()
    {
    var botao = $('.bt-click2'); 
     var dropDown = $('.ul-encarregado'); 
     botao.on('click', function(event){
         dropDown.stop(true,true).slideToggle();
         event.stopPropagation(); 
     }); 
    
})
$(document).ready(function() {
    var botao = $('.bt-click3'); 
     var dropDown = $('.ul-aluno'); 
     botao.on('click', function(event){
         dropDown.stop(true,true).slideToggle();
         event.stopPropagation(); 
     }); 
})
$(document).ready(function(){
    var botao = $('.bt-click4'); 
     var dropDown = $('.ul-pagar'); 
     botao.on('click', function(event){
         dropDown.stop(true,true).slideToggle();
         event.stopPropagation(); 
     });
})
$(document).ready(function(){
    var botao = $('.bt-click5'); 
     var dropDown = $('.ul-sair'); 
     botao.on('click', function(event){
         dropDown.stop(true,true).slideToggle();
         event.stopPropagation(); 
     });
 });