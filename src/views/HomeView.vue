<template>
  <div>
    <div class="banner">
      <!-- Conteúdo do banner -->
      <h1>Bem-vindo à nossa loja!</h1>
      <p>Encontre os melhores produtos aqui.</p>
    </div>

    <div class="container">
      <h2>Nossos Produtos</h2>
      <div class="product-list">
        <!-- Loop para exibir a lista de produtos -->
        <router-link v-for="product in products" :key="product.id" :to="`/product/${product.id}`" class="product-card">
  <div class="product-card-content">
    <img :src="product.image" :alt="product.name" class="product-image">
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">R$ {{ product.price }}</p>
    <div class="product-buttons">
      <button class="buy-button">Comprar</button>
      <button class="add-to-cart-button">Adicionar ao Carrinho</button>
    </div>
  </div>
</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("https://localhost:3000/Product")
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
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

.product-list {
  display: flex;
  flex-wrap: wrap;
}

.product-card {
  text-decoration: none;
  display: block;
  width: 300px;
  margin: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: translateY(-5px);
}

/* Estilo para o conteúdo do card de produto */
.product-card-content {
  padding: 20px;
}

/* Estilo para a imagem do produto */
.product-image {
  max-width: 100%;
  height: auto;
}

/* Estilo para o nome do produto */
.product-name {
  font-size: 18px;
  margin-top: 10px;
}

/* Estilo para a descrição do produto */
.product-description {
  font-size: 14px;
  color: #555;
  margin-top: 8px;
}

/* Estilo para o preço do produto */
.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #e67e22;
  margin-top: 10px;
}

/* Estilo para os botões de ação */
.product-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.buy-button,
.add-to-cart-button {
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
}

.buy-button {
  background-color: #e67e22;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

.buy-button:hover {
  background-color: #d35400;
}

.add-to-cart-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

.add-to-cart-button:hover {
  background-color: #2980b9;
}
</style>
