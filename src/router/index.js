import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Checkout from "../components/CheckOut.vue";

// Importe os componentes
import HomeView from "../views/HomeView.vue";
const Dashboard = () => import("../components/Dashboard.vue");
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
    meta: { requiresAuth: true }, // Indica que essa rota requer autenticação
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
    component: () => import("../components/Produto.vue"),
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
    path: "/Accont",
    name: "Accont",
    component: () => import("../components/Accont.vue"),
    
  },
  {
    path: "/CadastroMarca",
    name: "CadastroMarca",
    component: () => import("../views/PainelAdm/CadastroMarca.vue"),
    meta: { requiresAuth: true }, // Indica que essa rota requer autenticação
  },
  {
    path: "/neworders",
    name: "NewOrders",
    component: () => import("../views/PainelAdm/Neworder.vue"),
    meta: { requiresAuth: true }, // Indica que essa rota requer autenticação
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
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout, // Use o componente Checkout.vue para esta rota
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      console.log("Sem token de autenticação. Redirecionando para /login");
      next("/login");
    } else {
      try {
        // Decodifique o token JWT para obter a ID do usuário
        const decodedToken = jwtDecode(authToken);

        const userIdFromToken = decodedToken.Id;

        // console.log(decodedToken);
        // console.log("ID do usuário do token JWT:", userIdFromToken);
        // Realize uma verificação para permitir o acesso apenas ao usuário administrador
        if (userIdFromToken === "6942ed19-8dfe-4bb4-b17a-cdaedee00ac4") {
          console.log("Usuário autenticado com permissão. Permitindo acesso.");
          next();
        } else {
          // Se o ID do usuário do token JWT não corresponder ao ID do administrador, redirecione o usuário para a página inicial ou outra página apropriada
          next("/");
        }
      } catch (error) {
        // console.error("Erro ao decodificar o token JWT:", error);
        // console.log("Erro ao decodificar o token JWT. Redirecionando para /login");
        next("/login");
      }
    }
  } else {
    console.log("Acesso permitido a rota sem autenticação.");
    next();
  }
});

export default router;