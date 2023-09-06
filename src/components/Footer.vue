<template>
  <footer class="footer">
    <div class="container align-items">
      <div class="row">
        <div class="col">
          <h4>Empresa</h4>
          <ul>
            <li><a href="#">Sobre nós</a></li>
            <li><a href="#">Nossos serviços</a></li>
            <li><a href="#">Política de privacidade</a></li>
            <li><a href="#">LGPD</a></li>
          </ul>
        </div>
        <div class="col">
          <h4>Ajuda</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Devoluções</a></li>
            <li><a href="#">Status do pedido</a></li>
            <li><a href="#">Opções de pagamento</a></li>
          </ul>
        </div>
        <div class="col">
          <h4>Departamentos</h4>
          <ul>
            <li><a href="#">Prensas</a></li>
            <li><a href="#">Marcas</a></li>
            <li><a href="#">Acessórios</a></li>
            <li><a href="#">Insumos</a></li>
          </ul>
        </div>
        <div class="col">
          <h4>Mídia sociais</h4>
          <div class="social-links">
            <div class="linkedin-container">
            <a href="https://www.linkedin.com/in/bryan-jauri-7004b0235/"><img src="img/bryan.jpeg" class="linkedin-image"></a>
            <a href="https://www.linkedin.com/in/christian-pedro-8904b2235/"><img src="img/chris.jpeg" class="linkedin-image"></a>
            <a href="https://www.linkedin.com/in/dev-higor-pereira/"><img src="img/higor.jpeg" class="linkedin-image"></a>
            <i class="fab fa-linkedin-in linkedin-icon"></i>
          </div>
          </div>
        </div>
      </div>
  
      
    </div>
  </footer>
  </template>
  
  <script>
  export default {
      name:"Footer"
  }
  </script>
  
  
  <style>
  *{
    margin: 0;
    padding: 0;
    
  }
    
  
  .container{
    max-width: 1170px;
    margin: auto;
    
  }
  /* .row{
    display:flex;
    flex-wrap: wrap;
  } */
  ul{
    list-style: none;
   
  }
  .footer{
    /* position: fixed; */
    background-color: #24262b;
    /* position: absolute; */
    width: 100%;
    bottom: 0;
    padding: 10px 0;   
  }
  .col{
    /* width:25%;
    padding: 0 15px; */
    text-align: start;
  }
  .col h4{
    font-size: 18px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 25px;
    font-weight: 500;
    position: relative;
  }
  .col h4::before{
    content:'';
    position: absolute;
    bottom: -10px;
    background-color: #e91e63;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
    
  }
  .col ul li:not(:last-child){
    margin-bottom: 10px;
  }
  .col ul li a{
    font-size: 16px;
    text-transform:capitalize;
    color: #ffffff;
    text-decoration: none;
    font-weight: 300;
    color: #bbbbbb;
    transition: all 0.3s ease;
     flex-direction: column;
  }
  .col ul li a:hover{
    color: #ffffff;
    padding-left: 8px;
  }
  .linkedin-container{
    position: relative;
    display: inline-block;
    
  }
  .linkedin-image{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .col .social-links a{
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin:0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color:#ffffff;
    transition: all 0.5s ease;
  }
  .col .social-links a:hover{
    color:#24262b;
    background-color: #ffffff;
  }
 
  /* @media(max-width: 767px){
    .col{
      width:50%;
      margin-bottom: 30px;
    }
  } */
  </style>
  
  