<template>
  <div class="sidebar">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <svg class="bi me-2" width="30" height="24">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-5 fw-semibold">Página Inicial</span>
    </a>
    <ul class="menu">
      <!-- HOME -->
      <!-- <li class="mb-1">
        <button
          class="btn btn-toggle align-items-center rounded collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#home-collapse"
          aria-expanded="false"
        >
          Home
        </button>
        <div class="collapse" id="home-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">Overview</a></li>
            <li><a href="#" class="link-dark rounded">Updates</a></li>
            <li><a href="#" class="link-dark rounded">Reports</a></li>
          </ul>
        </div>
      </li> -->
      <div class="mb-1">
       
        
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link class="dropdown-item" to="/CadastroCategoria">Cadastro de Categorias</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/CadastroMarca">Cadastro de Marca</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/CadastroProduto">Cadastro de Produtos</router-link>
            </li>
            <li>
              <router-link class="dropdown-item disabled" to="#">Cadastro de Ficha Técnica</router-link>
            </li>
          </ul>
        
      </div>
      <div class="mb-1">
        
            <li>
              <router-link to="/neworders" class="link-dark rounded">Novas Vendas</router-link>
            </li>
    
      </div>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
          data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse" style="">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New...</a></li>
            <li><a href="#" class="link-dark rounded">Profile</a></li>
            <li><a href="#" class="link-dark rounded">Settings</a></li>
            <li><a href="#" class="link-dark rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBarDash",
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #ffffff;
  padding: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333333;
  margin-bottom: 20px;
}

.logo-icon {
  fill: #333333;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 600;
}

.menu {
  list-style: none;
  padding-left: 0;
}

.menu li {
  margin-bottom: 10px;
}

.btn-toggle {
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  cursor: pointer;
  outline: none;
}

.btn-toggle:focus {
  color: #007bff;
}

.btn-toggle::after {
  content: "▼";
  float: right;
  transition: transform 0.2s ease-in-out;
}

.btn-toggle[aria-expanded="true"]::after {
  transform: rotate(180deg);
}

.collapse {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
}

.collapse.show {
  max-height: 500px;
  /* Defina uma altura adequada para o conteúdo expandido */
}

@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    position: fixed;
    top: 0;
    left: -100%;
    /* Inicialmente oculta a barra lateral */
    transition: left 0.3s ease-in-out;
  }

  /* Exibir a barra lateral quando o menu for ativado */
  .sidebar.active {
    left: 0;
  }

  /* Estilos para o restante do conteúdo quando a barra lateral está ativa */
  .content {
    margin-left: 200px;
    /* Espaço para a barra lateral */
    transition: margin-left 0.3s ease-in-out;
  }

  /* Estilos para o conteúdo quando a barra lateral está oculta */
  .content.sidebar-hidden {
    margin-left: 0;
  }
}
</style>
