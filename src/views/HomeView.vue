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
          <img :src="product.image" :alt="product.name" class="product-image">
          <h3>{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p>R$  {{ product.price }}</p>
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
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  text-decoration: none;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-description {
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
