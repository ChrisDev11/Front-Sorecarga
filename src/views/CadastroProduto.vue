<template>
  <div class="container mt-3">
    <h3>Cadastro de Produtos</h3>

  <form class="row g-3">

    <div class="col-md-2">
     <label  class="form-label">Sku</label>
     <input type="text" class="form-control" id="sku" name="sku" placeholder="Digite o Sku" >
    </div>

   <div class="col-md-4">
     <label  class="form-label">Produto</label>
     <input type="text" class="form-control" id="name" name="name" placeholder="Digite o nome do Produto" >
    </div>

    <div class="col-md-2">
     <label  class="form-label">Marca</label>
     <input type="text" class="form-control" id="brand" name="brand" placeholder="Marca">
   </div>

    <div class="col-md-2">
     <label  class="form-label">Preço</label>
      <input type="number" class="form-control" id="price" name="price" placeholder="Digite o Valor do Produto" >
    </div>

    <!-- <div class="col-md-2">
     <label  class="form-label">Quantidade</label>
      <input type="number" class="form-control" id="stock" name="stock" placeholder="Qtd" aria-label="Qtd">
    </div> -->

    <div class="col-12">
      <label class="form-label">Descrição</label>
      <!-- <input type="text" class="form-control" id="description" name="description" placeholder="Descrição do Produto"> -->
      <textarea type="text" class="form-control" id="description" name="description" placeholder="Descrição do Produto"></textarea>
    </div>
    
    <div class="col-12">
      <button v-on:click="salvar()" type="submit" class="btn btn-primary">Salvar</button>
    </div>
  </form>
<hr>

<table class="table">
      <thead>
        <tr>
          <th>
            Sku
          </th>
          <th>
            Produto
          </th>
          <th>
            Preço
          </th>
          <th>
            Descrição
          </th>
          <th>
            Marca
          </th>
          <!-- <th colspan="2"></th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="Products in Product" v-bind:key="Products.id">
          <td>
            {{Products.sku}}
          </td>
          <td>
            {{Products.name}}
          </td> 
          <td>
            {{Products.price}}
          </td>
          <td>
            {{Products.description}}
          </td>
          <td>
            {{Products.brand}}
          </td>
          <td>
            <button class="btn btn-primary" v-on:click="editar(Products)">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="excluir(Products.id)">Excluir</button>
          </td>
        </tr>
      </tbody>

    </table>


  </div>

</template>

<script>
import axios from 'axios';


export default {
  name: 'CadastroProduto',
  props: {
    msg: String
  },

  data:() => {
    return {
      Product:[],
      Products: undefined,
      Product: "",
    }
  },
  methods:{
    //Lista os Produtos na tela
    lista () {
      axios.get('https://localhost:3000/Product').then((res)=>{
       
       this.Product = res.data
       console.log(res) 
      })
    },
    salvar () {
      if(this.Products){
        this.alterar()
        return
      }
      axios.post('https://localhost:3000/Product',
      {
        sku:document.getElementById("sku").value,
        name:document.getElementById("name").value,
        brand:document.getElementById("brand").value,
        description:document.getElementById("description").value,
        price:document.getElementById("price").value
      }).then(()=>{
        this.lista()
        
        console.log(this.salvar)
      })
    },
    //Auto preencher dados para a edição Products
    editar(Products) {
      document.getElementById("sku").value = Products.sku
      document.getElementById("name").value = Products.name
      document.getElementById("brand").value = Products.brand
      document.getElementById("description").value = Products.description
      document.getElementById("price").value = Products.price
      this.Products = Products
    },
    //Atualizar dados que ja estao gravados
    alterar() {
      this.Products.sku = document.getElementById("sku").value 
      this.Products.name = document.getElementById("name").value 
      this.Products.brand = document.getElementById("brand").value 
      this.Products.description = document.getElementById("description").value
      this.Products.price = document.getElementById("price").value
      
      axios.put(`https://localhost:3000/Product/${this.Products.id}`, this.Products).then(()=>{
        this.lista()
        this.Products = undefined
        document.getElementById("sku").value = ""
        document.getElementById("name").value = ""
        document.getElementById("brand").value = ""
        document.getElementById("description").value = ""
        document.getElementById("price").value = "" 
      })
    },
    //Metodo EXCLUIR 
    excluir(id) {
      if(confirm("🚫Deseja realmente excluir o Produto?🚫")){
      axios.delete(`https://localhost:3000/Product/${id}`).then(()=>{
        this.lista()
        })
      }
    }
  },
  created(){
    this.lista()
  }
    
}
</script>



<style>

</style>
