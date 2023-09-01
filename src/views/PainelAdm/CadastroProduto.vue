<template>
  <div class="d-flex">
    <!-- Use a classe "d-flex" para criar um layout flexível -->
    <SideBarDash class="flex-shrink-0" />
    <!-- Adicione a classe "flex-shrink-0" para evitar que a barra lateral cresça -->
    <div class="flex-grow-1">
      <!-- Use a classe "flex-grow-1" para que o conteúdo ocupe o espaço restante -->
      <div class="container mt-3">
        <h3>Cadastro de Produtos</h3>

        <form class="row g-3">
          <div class="col-md-2">
            <label class="form-label">Sku</label>
            <input
              type="text"
              class="form-control"
              id="sku"
              name="sku"
              placeholder="Digite o Sku"
            />
          </div>

          <div class="col-md-4">
            <label class="form-label">Produto</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              placeholder="Digite o nome do Produto"
            />
          </div>

          <div class="col-md-2">
            <label class="form-label">Preço</label>
            <input
              type="number"
              class="form-control"
              id="price"
              name="price"
              placeholder="Digite o Valor do Produto"
            />
          </div>

          <div class="col-md-2">
            <label class="form-label">Quantidade</label>
            <input
              type="number"
              class="form-control"
              id="amount"
              name="amount"
              placeholder="Qtd"
              aria-label="Qtd"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label">Código de Barras</label>
            <input
              type="number"
              class="form-control"
              id="barCode"
              name="barCode"
              placeholder="Código de Barras"
              aria-label="Código de Barras"
            />
          </div>
          <!-- Recente Dropdowns -->
          <div class="col-md-2">
            <label class="form-label">Categoria</label>
            <select v-model="selectedCategory" class="form-select">
              <option
                v-for="Categorys in Category"
                :value="Categorys.id"
                :key="Categorys.Id"
              >
                {{ Categorys.name }}
              </option>
            </select>
          </div>

          <div class="col-md-2">
            <label class="form-label">Marca</label>
            <select v-model="selectedBrand" class="form-select">
              <option
                v-for="Brands in Brand"
                :value="Brands.id"
                :key="Brands.id"
              >
                {{ Brands.name }}
              </option>
            </select>
          </div>
          <!-- ????????? -->

          <div class="col-12">
            <label class="form-label">Descrição</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              name="description"
              placeholder="Descrição do Produto"
            ></textarea>
          </div>

          <div class="col-12">
            <button v-on:click="salvar()" type="submit" class="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
        <hr />

        <table class="table">
          <thead>
            <tr>
              <th>Sku</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Códico de barras</th>
              <!-- <th colspan="2"></th> -->
            </tr>
          </thead>

          <tbody>
            <tr v-for="Products in Product" :key="Products.id">
              <td>
                {{ Products.sku }}
              </td>
              <td>
                {{ Products.name }}
              </td>
              <td>
                {{ Products.price }}
              </td>
              <td>
                {{ Products.amount }}
              </td>
              <td>
                {{ Products.description }}
              </td>
              <td>
                {{ brandNames[Products.brandId] || "N/A" }}
              </td>
              <td>
                {{ categoryNames[Products.categoryId] || "N/A" }}
              </td>
              <td>
                {{ Products.barCode }}
              </td>
              <td>
                <button class="btn btn-primary" v-on:click="editar(Products)">
                  Editar
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  v-on:click="excluir(Products.id)"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SideBarDash from "@/components/SideBarDash.vue";
import axios from "axios";

export default {
  name: "CadastroProduto",
  components: {
    SideBarDash,
  },

  props: {
    msg: String,
  },

  data: () => {
    return {
      Product: [],
      Products: undefined,
      Product: "",
      //Recente Dropdowns
      Category: [],
      Brand: [],
      brandNames: {},
      categoryNames: {},
      selectedCategory: null,
      selectedBrand: null,
      /////
    };
  },
  //Recente Dropdowns

  ////
  methods: {
    

    // DROPDOWN SCRIPT
    async fetchCategoriesAndBrands() {
      try {
        const categoryResponse = await axios.get(
          "https://localhost:3000/Category"
        );
        const brandResponse = await axios.get("https://localhost:3000/Brand");

        this.Category = categoryResponse.data;
        this.Brand = brandResponse.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    //Lista os Produtos na tela
    lista() {
      axios.get("https://localhost:3000/Product").then((res) => {
        this.Product = res.data;
        // console.log(res);
      });
    },
    salvar() {
      if (this.Products) {
        this.alterar();
        return;
      }

      // Obtenha os valores selecionados dos menus dropdown
      const categoryId = this.selectedCategory;
      const brandId = this.selectedBrand;

      console.log("categoryId:", categoryId); // Verifica categoryId no console
      console.log("brandId:", brandId); // Verifica brandId no console
      axios
        .post("https://localhost:3000/Product", {
          sku: document.getElementById("sku").value,
          name: document.getElementById("name").value,
          brandId: brandId, // Envie o CategoryId
          categoryId: categoryId, // Envie o BrandId
          description: document.getElementById("description").value,
          price: document.getElementById("price").value,
          barCode: document.getElementById("barCode").value,
          amount: document.getElementById("amount").value,
        })
        .then(() => {
          this.lista();
        });
    },
    //Auto preencher dados para a edição Products
    editar(Products) {
      document.getElementById("sku").value = Products.sku;
      document.getElementById("name").value = Products.name;
      document.getElementById("brandId").value = Products.brandId; // Defina o valor do campo de texto da marca (se necessário)
      document.getElementById("categoryId").value = Products.categoryId; // Defina o valor do campo de texto da categoria (se necessário)
      document.getElementById("description").value = Products.description;
      document.getElementById("price").value = Products.price;
      document.getElementById("barCode").value = Products.barCode;
      document.getElementById("amount").value = Products.amount;

      // Defina os valores dos menus dropdown (categorias e marcas)
      this.selectedCategory = Products.categoryId; // Defina o ID da categoria selecionada
      this.selectedBrand = Products.brandId; // Defina o ID da marca selecionada

      this.Products = Products;
    },
    //Atualizar dados que ja estao gravados
    alterar() {
      this.Products.sku = document.getElementById("sku").value;
      this.Products.name = document.getElementById("name").value;
      this.Products.brandId = document.getElementById("brandId").value;
      this.Products.categoryId = document.getElementById("categoryId").value;
      this.Products.description = document.getElementById("description").value;
      this.Products.price = document.getElementById("price").value;
      this.Products.barCode = document.getElementById("barCode").value;
      this.Products.amount = document.getElementById("amount").value;

      axios
        .put(
          `https://localhost:3000/Product/${this.Products.id}`,
          this.Products
        )
        .then(() => {
          this.lista();
          this.Products = undefined;
          document.getElementById("sku").value = "";
          document.getElementById("name").value = "";
          document.getElementById("brandId").value = "";
          document.getElementById("categoryId").value = "";
          document.getElementById("description").value = "";
          document.getElementById("price").value = "";
          document.getElementById("barcode").value = "";
          document.getElementById("amount").value = "";
        });
    },
    //Metodo EXCLUIR
    excluir(id) {
      if (confirm("🚫Deseja realmente excluir o Produto?🚫")) {
        axios.delete(`https://localhost:3000/Product/${id}`).then(() => {
          this.lista();
        });
      }
    },
  },
  created() {
    this.fetchCategoriesAndBrands();
    this.lista();

    // TROCA DE ID FOR NAME
    // Fazer uma chamada para buscar todos os produtos
    axios
      .get("https://localhost:3000/Product")
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos: ", error);
      });

    // Fazer chamadas para buscar os nomes das marcas e categorias e armazená-los em brandNames e categoryNames
    axios
      .get("https://localhost:3000/Brand")
      .then((response) => {
        response.data.forEach((brand) => {
          this.brandNames[brand.id] = brand.name;
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar nomes das marcas: ", error);
      });

    axios
      .get("https://localhost:3000/Category")
      .then((response) => {
        response.data.forEach((category) => {
          this.categoryNames[category.id] = category.name;
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar nomes das categorias: ", error);
      });
  },
};
</script>

<style></style>
