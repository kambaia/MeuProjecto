
<link rel="stylesheet" href="css/login-style.css">
  <header>
      <div class="infor">
          <div class="dialog1">
            <h3>PCO DIRECTO EM SUA CASA</h3>
              <h2>ASSIM FICA MAIS FÁCIL!</h2>
          </div>
          <div class="dialog">
              <span>O PCO NO TELEMÓVEL OU NO COMPUTADOR</span>
               <li>Faça já a escrição e começa a pagar as propinas dos seus Candengues</li>
          </div>
              
      </div>
     </header>
<div class="caixa-main">
            
     <div class="caixa-op">
         <div class="cab-login">
             <h2>PCO DIREITO AO SEU PC</h2>
             <button class="btn btn1">Escrever-se</button>
             <button class="btn btn2" id="btn-login">Logar</button>
          </div>
    
    <section class="login">
        <form id="logar" action="classe/apresentacao/validacacaologin.php" method="post" enctype="multipart/form-data">
        <input class="form-control " type="text" name="email" placeholder="E-mail:">
		<span class="help-block"></span>
        

        <input class="form-control" type="password" name="senha" placeholder="Senha">
		<span class="help-block"></span>
        
       <button class="form-control bt2" type="submit" name="login">Acessar</button>
        <h4><a href="">Esqueceu a sua palavra-passe?</a></h4>
        </form>

         
    </section >
    <section class="cadastrar">
		
      <form id="cadastrar" action="login.php" method="post" enctype="multipart/form-data">
		  
        <input class="form-control" type="text" id="nome" name="nome" placeholder="Nome usúario:">
		  
        <input class="form-control" type="email" id="email" name="email" placeholder="Email:">
		  
        <input class="form-control" type="text"  id="codigopco" name="codigo" placeholder="Código PCO:">
		  
        <input class="form-control"  type="password" id="senha" name="senha" placeholder="Senha:">
	
        <input class="form-control"  type="password" id="confirmaSenha" name="confirmaSenha" placeholder="confirmar senha:">
		 
       <button class="form-control bt2" type="submint" id="enviar" name="envair-formulario">Acessar</button>

        </form>

         
    </section >
   </div>
</div>
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/additional-methods.min.js"></script>
<script src="js/jquery.validate.min.js"></script>
<script src="js/localization/messages_pt_PT.js"></script>
 <script src="js/menu.js"></script>
<script src="js/verificacao.js"></script>

