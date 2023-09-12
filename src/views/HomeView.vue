<template>
  <div>
    <div class="banner">
      <!-- Conteúdo do banner -->
      <h1>Bem-vindo à nossa loja!</h1>
      <p>Encontre os melhores produtos aqui.</p>
      <button 
      class="btn btn-success" @click="changeCartVisibility()">
      <i class="fa-solid fa-cart-shopping"></i>
      <span class="badge text-bg-success">{{ cart.length }}</span>
      </button>
      
      <SlidePanel
        title = "Cart"
        :visible="cartVisible"
        @update:visible="changeCartVisibility"
        :cart="cart"
      ></SlidePanel>

    </div>

    <div class="container">
</div>

    <div class="container">
      <h2>Nossos Produtos</h2>
      
      <div class="product-list">
        <!-- Loop para exibir a lista de produtos -->
        <div
          v-for="product in products"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="product-card"
        >
          <img :src="product.imageUrl" :alt="product.name" class="product-image" />
          
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">R$ {{ product.price }}</p>
          <div class="product-buttons">
            <button @click.stop="buyProduct(product)" 
            class="buy-button">
              Comprar
            </button>
            <button
              @click.stop="addToCart(product)"
              class="add-to-cart-button"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import SlidePanel from "@/components/SlidePanel.vue"
import { ref } from "vue";
import Cookies from 'js-cookie';

export default {
  components: {
    SlidePanel
  },
  data() {
    return {
      endereco:"https://rechargeapi.azurewebsites.net/",
      products: [],
      cart: [],
    };
  },
  setup() {
    const cartVisible = ref(false); // Variável de controle da visibilidade do carrinho

    const changeCartVisibility = () => {
      cartVisible.value = !cartVisible.value; // Função para alternar a visibilidade do carrinho
      console.log(cartVisible.value);
    };

    return {
      cartVisible,
      changeCartVisibility,
    };
  },

  mounted() {
    this.fetchProducts(); // Chama a função para buscar os produtos quando a página é carregada
    this.fetchBrands();
    // Recupere o carrinho do cookie quando a página é carregada
    const savedCart = Cookies.get('cart'); // Corrija a chamada para Cookies.get
    if (savedCart) {
      this.cart = Array.isArray(savedCart) ? savedCart : JSON.parse(savedCart); // Converta o JSON do cookie de volta para um objeto
    }
    
    
  },

  methods: {
    // Adicionar produto ao carrinho
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }

      // Salve o carrinho em cookies com expiração de 1 hora
      Cookies.set('cart', JSON.stringify(this.cart), { expires: 1 / 24 }); // 1/24 representa 1 hora

      console.log(this.cart); // Exibe o carrinho atualizado no console
    },

    fetchProducts() {
      axios
        .get(`${this.endereco}/Product`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchBrands() {
    axios
      .get(`${this.endereco}/Brand`) // Rota para buscar marcas
      .then((response) => {
        this.brands = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  },
};
</script>


<style>
.banner {
  background-color: #f5f5f5;
  text-align: center;
  padding: 20px;
}

.container {
  margin-top:20px;
  
}

.product-card {
  text-decoration: none;
  display: inline-block;
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  background-color: #fff;
  
}

.product-card:hover {
  transform: translateY(-5px);
}

/* Estilo para a imagem do produto */
.product-image {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
}

/* Estilo para o nome do produto */
.product-card h3 {
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
}

/* Estilo para a descrição do produto */
.product-description {
  font-size: 16px;
  color: #555;
  margin-top: 8px;
  text-align: center;
}

/* Estilo para o preço do produto */
.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #090a09;
  margin-top: 10px;
  text-align: center;
}

/* Estilo para os botões de ação */
.product-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.buy-button,
.add-to-cart-button {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  width: 120px;
  text-align: center;
}

.buy-button {
  background-color: #e67e22;
  color: #fff;
  margin-right: 10px;
  transition: background-color 0.2s ease-in-out;
}

.buy-button:hover {
  background-color: #d35400;
}

.add-to-cart-button {
  background-color: #3498db;
  color: #fff;
  transition: background-color 0.2s ease-in-out;
}

.add-to-cart-button:hover {
  background-color: #2980b9;
}
</style>
