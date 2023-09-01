<!-- <template>
  <footer class="footer">
    <div class="container align-items">
      <div class="row">
        <div class="col">
          <h4>company</h4>
          <ul>
            <li><a href="#">about us</a></li>
            <li><a href="#">our services</a></li>
            <li><a href="#">privacy policy</a></li>
            <li><a href="#">affiliate program</a></li>
          </ul>
        </div>
        <div class="col">
          <h4>get help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">shipping</a></li>
            <li><a href="#">returns</a></li>
            <li><a href="#">order status</a></li>
            <li><a href="#">payment options</a></li>
          </ul>
        </div>
        <div class="col">
          <h4>online shop</h4>
          <ul>
            <li><a href="#">watch</a></li>
            <li><a href="#">bag</a></li>
            <li><a href="#">shoes</a></li>
            <li><a href="#">dress</a></li>
          </ul>
        </div>
        <div class="col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
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
    background-color: #24262b;
    position: absolute;
    width: 100%;
    bottom: 0;
       
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
  
   -->