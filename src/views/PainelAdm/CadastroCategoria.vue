<template>
  <div class="container mt-3">
    <h3>Cadastro de Categoria</h3>
    <form class="row g-3">

<div class="col-md-4">
 <label  class="form-label">Categoria</label>
 <input type="text" class="form-control" id="name" name="name" placeholder="Digite o nome da Categoria" aria-label="Digite o nome da Categoria">
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
            Categoria
          </th>
          <th colspan="2"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="Categorys in Category" v-bind:key="Categorys.Id">
          <td>
            {{Categorys.name}}
          </td>
          <td>
            <button class="btn btn-primary" v-on:click="editar(Categorys)">Editar</button>
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="excluir(Categorys.id)">Excluir</button>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "CadastroCategoria",
    props: {
    msg: String
  }, 
  data:() => {
  return {
    Category:[],
      Categorys: undefined,
      category: "",
      
    }
  },
  methods:{
    lista () {
      axios.get('https://localhost:3000/Category').then((res)=>{
       
       this.Category = res.data
       console.log(res) 
      })
    },
    salvar () {
      if(this.Categorys){
        this.alterar()
        return
      }
      axios.post('https://localhost:3000/Category',
      {
        name:document.getElementById("name").value,
      }).then(()=>{
        this.lista()
        console.log(res) 
      })
    },
//Auto preencher dados para a edição Category
    editar(Categorys) {
      document.getElementById("name").value = Categorys.name
      this.Categorys = Categorys
    },
    //Atualizar dados que ja estao gravados
    alterar() {
      this.Categorys.name = document.getElementById("name").value 
      
      axios.put(`https://localhost:3000/Category/${this.Categorys.id}`, this.Categorys).then(()=>{
        this.lista()
        this.Categorys = undefined
        document.getElementById("name").value = ""
      })
    },
    //Metodo EXCLUIR 
    excluir(id) {
      if(confirm("🚫Deseja realmente excluir a Categoria?🚫")){
      axios.delete(`https://localhost:3000/Category/${id}`).then(()=>{
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