<template>
   <div class="d-flex"> <!-- Use a classe "d-flex" para criar um layout flexível -->
      <SideBarDash class="flex-shrink-0" /> <!-- Adicione a classe "flex-shrink-0" para evitar que a barra lateral cresça -->
      <div class="flex-grow-1"> <!-- Use a classe "flex-grow-1" para que o conteúdo ocupe o espaço restante -->
  <div class="container mt-3">
    <h3>Cadastro da Marca</h3>
    <form class="row g-3">
      <div class="col-md-4">
        <label class="form-label">Marca</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          placeholder="Digite o nome da Marca"
          aria-label="Digite o nome da Marca"
        />
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
          <th>Marca</th>
          <th colspan="2"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="Brand in Brands" v-bind:key="Brand.id">
          <td>
            {{ Brand.name }}
          </td>
          <td>
            <button class="btn btn-primary" v-on:click="editar(Brand)">
              Editar
            </button>
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="excluir(Brand.id)">
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
  name: "CadastroMarca",
  components:{
    SideBarDash
  },
  
  data: () => {
    return {
      Brands: [],
      
    }
  },
  methods: {
    lista() {
      axios.get("https://localhost:3000/Brand").then((res) => {
        this.Brands = res.data;
        console.log(res);
      });
    },
    salvar() {
      if (this.Brand) {
        this.alterar();
        return;
      }
      axios
        .post("https://localhost:3000/Brand", {
          name: document.getElementById("name").value,
        })
        .then(() => {
          this.lista();
          
        });
    },
    //Auto preencher dados para a edição Brand
    editar(Brand) {
      document.getElementById("name").value = Brand.id;
      this.Brand = Brand;
    },
    //Atualizar dados que ja estao gravados
    alterar() {
      this.Brand.name = document.getElementById("name").value;

      axios
        .put(`https://localhost:3000/Brand/${this.Brand.id}`, this.Brand)
        .then(() => {
          this.lista();
          this.Brand = undefined;
          document.getElementById("name").value = "";
        });
    },
    //Metodo EXCLUIR
    excluir(id) {
      if (confirm("🚫Deseja realmente excluir a Marca?🚫")) {
        axios.delete(`https://localhost:3000/Brand/${id}`).then(() => {
            console.log(this.excluir)
          this.lista();
        });
      }
    },
  },
  created() {
    this.lista();
  },
};
</script>

<style>
h3.mb-4 {
  font-size: 24px;
}

/* Estilo para os botões */
.btn {
  font-size: 14px;
  padding: 6px 12px;
}

/* Estilo para a tabela */
.table {
  font-size: 14px;
}

/* Estilo para a barra lateral */
.flex-shrink-0 {
  width: 280px; /* Ajuste conforme necessário */
  background-color: #f8f9fa; /* Cor de fundo da barra lateral */
}

/* Estilo para o conteúdo principal */
.flex-grow-1 {
  padding: 20px;
  background-color: #ffffff; /* Cor de fundo do conteúdo */
}
</style>
