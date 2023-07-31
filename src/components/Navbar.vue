<template>
<nav class="navbar navbar-expand-lg bg-dark" aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex " id="navbarsExample11">
          <router-link class="navbar-brand col-lg-3 me-0" to="/">
            <img src="/img/logo.png" alt="Home" id="navbar-logo">
          </router-link>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">

            <li class="nav-item" style="background-color: red;">
              <router-link class="nav-link active" aria-current="page" to="/" >Home</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/Produtos">Produtos</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Em breve</a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Cadastros</a>
              <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/CadastroProduto">Cadastro de Produtos</router-link></li>
            <li><router-link class="dropdown-item" to="/CadastroCategoria">Cadastro de Categorias</router-link></li>
            <li><a class="dropdown-item disabled" href="#">Em breve</a></li>
          </ul>
            </li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <router-link to="/Login" class="btn btn-primary">Login</router-link>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style>

.navbar {
  background-color: #333;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}


.navbar-brand {
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff;
}


.nav-link,
.dropdown-toggle {
  color: #fff;
}

.nav-link.disabled {
  color: #6c757d;
}

.dropdown-item {
  color: #212529;
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