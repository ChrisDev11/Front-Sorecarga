import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";

// Importe os componentes
import HomeView from "../views/HomeView.vue";
const Dashboard = () => import("../views/PainelAdm/Dashboard.vue");
const NotFound = () => import("../components/404.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/CadastroProduto",
    name: "CadastroProduto",
    component: () => import("../views/PainelAdm/CadastroProduto.vue"),
  },
  {
    path: "/CadastroCategoria",
    name: "CadastroCategoria",
    component: () => import("../views/PainelAdm/CadastroCategoria.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Produtos",
    name: "Produtos",
    component: () => import("../views/Produto.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("../components/Register.vue"),
  },
  {
    path: "/CadastroMarca",
    name: "CadastroMarca",
    component: () => import("../views/PainelAdm/CadastroMarca.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Indica que essa rota requer autenticação
  },
  {
    path: "/TermsPolitic",
    name: "TermsPolitic",
    component: () => import("../views/TermsPolitic.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Defina o guarda de navegação global
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      // Se não houver token de autenticação, redirecione o usuário para a página de login
      next("/login");
    } else {
      // O usuário possui um token de autenticação, permita o acesso à rota
      next();
    }
  } else {
    // Se a rota não requer autenticação, permita o acesso à rota
    next();
  }
});

export default router;
