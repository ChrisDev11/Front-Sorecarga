<template>
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
            {{ Brand.id }}
          </td>
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
</template>

<script>
import axios from "axios";

export default {
  name: "CadastroMarca",
  
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
      document.getElementById("name").value = Brand.name;
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
