<template>
  <div>
    <div class="banner">
      <!-- Conteúdo do banner -->
      <h1>Bem-vindo à nossa loja!</h1>
      <p>Encontre os melhores produtos aqui.</p>
      <button class="btn btn-primary" @click="changeCartVisibility()">Exibir Carrinho</button>

      <SlidePanel
        title = "Cart"
        :visible="cartVisible"
        @update:visible="changeCartVisibility"
      ></SlidePanel>

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
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p>R$ {{ product.price }}</p>
          <div class="product-buttons">
            <button @click.stop="buyProduct(product.id)" class="buy-button">
              Comprar
            </button>
            <button
              @click.stop="addToCart(product.id)"
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
// TEste Carrinho






////////////////////////////////////////////////////////////////

export default {
  components:{
    SlidePanel
  },

// Exibir Carinho teste
  setup(){
    const cartVisible = ref(false);

    const changeCartVisibility = () => {
      cartVisible.value = !cartVisible.value;
      console.log(cartVisible.value);
    };

    return {
      cartVisible,
      changeCartVisibility,
    };
  },
////////////////////////////////
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
  
    fetchProducts() {
      axios
        .get("https://localhost:3000/Product")
        .then((response) => {
          this.products = response.data;
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
  margin-top: 20px;
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
  font-size: 14px;
  color: #555;
  margin-top: 8px;
  text-align: center;
}

/* Estilo para o preço do produto */
.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #e67e22;
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
