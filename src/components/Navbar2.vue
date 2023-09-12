<template>
<nav class="navbar navbar-expand-lg bg-dark" aria-label="Thirteenth navbar example">
  <div class="container-fluid">

    <!-- Botão de colapso para dispositivos móveis -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Itens de navegação -->
    <div class="collapse navbar-collapse " id="navbarNav">
      <ul class="navbar-nav d-flex justify-content-center">
        <li class="nav-item" style="background-color: red;">
          <router-link class="nav-link active" aria-current="page" to="/">Todos os Produtos</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">Marcas</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
            <li><router-link class="dropdown-item" to="#">Marca 1</router-link></li>
            <li><router-link class="dropdown-item" to="#">Marca 2</router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">Prensas</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
            <li><router-link class="dropdown-item" to="#">Prensa 1</router-link></li>
            <li><router-link class="dropdown-item" to="#">Prensa 2</router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">Acessorios</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown2">
            <li><router-link class="dropdown-item" to="#">Acessorios 1</router-link></li>
            <li><router-link class="dropdown-item" to="#">Acessorios 2</router-link></li>
          </ul>
        </li>
        <li class="nav-item" >
          <router-link class="nav-link active" aria-current="page" to="#">Documentos</router-link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar2',
}
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