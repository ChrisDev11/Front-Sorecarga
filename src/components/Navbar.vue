<template>
    <!-- Navbar da logo, barra de pesquisa e Logins -->
    <nav class="navbar navbar-expand-lg bg-dark" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
  
  
        <div class="navbar-collapse  d-lg-flex d-flex" id="navbarsExample11">
          <!-- Logo -->
          <router-link class="navbar-brand justify-content-center" to="/">
            <img src="/img/logo.png" alt="Home" id="navbar-logo">
          </router-link>
  
          <!-- Barra de Pesquisa / Falta Por Função -->
          <div class="container-fluid  justify-content-center col-lg-5 me-5">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="O que você procura?" aria-label="Search">
        
            </form>
          </div>
  
  
          
          <!-- Botão de Login / Logout -->
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <!-- Verifica se o usuário está logado -->
            <template v-if="!loggedIn.valueOf()">
              <!-- Link para a página de Login -->
              <router-link to="/Login" class="nav-link" style="font-weight: bold; color: white;">Entrar / Cadastrar</router-link>
            </template>
            <template v-else-if="loggedIn.valueOf()">
              <!-- Botão para efetuar o logout -->
              <a href="/Login" class="link-danger" @click="logout" style="font-weight: bold; ">Sair</a>
            </template>
          </div>
        </div>
      </div>
    
  </nav>
  
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';


export default {
  
  name: 'Navbar',
  
  setup() {
    const loggedIn = ref(false); // Supondo que o usuário não está logado inicialmente
    const router = useRouter();

    // Verifica se o usuário está logado
    // console.log("teste"+loggedIn.value)

    

    // Função para efetuar o logout
    const logout = () => {
      // Lógica para efetuar o logout (por exemplo, limpar o token e redirecionar)
      Cookies.remove('authToken');
      loggedIn.value = false;
      router.push('/login'); // Redireciona para a página de login após o logout
    };

    const toggleMenu =()=>{

      if (Cookies.get('authToken')) {
      
      loggedIn.value = true;
      //  console.log("Authent")
      
    } 

    }
   const teste = setInterval(toggleMenu, 250)
   //console.log("Session")
   watch(loggedIn, (newValue) => {
      if (newValue) {
        clearInterval(teste);
       // console.log("Interval stopped");
      }
    });
    
    

    return {
      loggedIn,
      logout,
    };
  },
};
</script>



<style>

.navbar {
    background-color: #333;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    height: 60px;
  }
  #navbar-logo{
    width: 100px;
    height: auto;
    margin-right: 10px;
    
  }
  #navbar-logo:hover{
    transition: all 0.3s ease;
    color: #ffffff;
    padding-left:8px;
  }
  
  .dropdown-toggle {
    color: #fff;
  }
  
  .nav-link.disabled {
    color: #6c757d;
  }
  
  .dropdown-item{
    background: #262223;
  
  
  }
  .nav-item{
    background: #F3F9FB;
    border-radius: 18px;
    font-family: Poppins;
    font-size: 14px;
    font-style: italic;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: right;
    margin-right: 30px;
    display: flex;
  }





</style>