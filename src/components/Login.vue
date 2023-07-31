<template>
    <div class="col-md-12">
  <div class="container">
    <h3 class="e-shop-front">Página de Login</h3>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="username">Usuário</label>
          <input v-model="user.username" ref="username" type="text" class="form-control" placeholder="Usuário" name="username">
        </div>
        <div class="form-group">
          <label for="pwd">Senha</label>
          <input v-model="user.password" ref="psw" type="password" class="form-control" placeholder="Senha" name="pwd">
        </div>
        <div class="form-group form-check">
          <input class="form-check-input" type="checkbox" id="remember" name="remember">
          <label class="form-check-label" for="remember">Lembrar-me</label>
        </div>
        <div class="clearfix">
          <button type="button" class="btn btn-primary" v-on:click="login">Entrar</button>
          <button type="button" class="btn btn-secondary" v-on:click="signup">Registrar-se</button>
        </div>
      </div>               
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    name: 'Login',

    data(){
        return{
            user:{
                username:"",
                password:""
            }
        }
    },

    methods:{
        signup(){
            this.$router.push({name: 'Register'})
        },
        login(){
            if(this.checkValidation()){
                axios.get(this.hostname + "/api/user/login/"+thisuser.username+"/"+this.user.password)
                    .then(response =>{
                        if(response.data.userId > 0){
                            console.log(response.data.token); // LOG tested user
                            localStorage.setItem('token', JSON.stringify(response.data.token));
                            response.data.token ="";
                            localStorage.setItem('user', JSON.stringify(response.data));
                            this.$router.push({name:"Dashboard"});

                        }
                    })
                    
                    .catch(error =>{
                        if(error.response){
                            Swal.fire(error.response.data);
                        }

                    });
            }
        },
        checkValidation(){
            if(!this.user.username){
                this.$refs.username.focus();
                Swal.fire("Coloque o Usuario");
                return;
            }
            if(!this.user.password){
                this.$refs.password.focus();
                Swal.fire("Coloque a Senha");
                return;
            }
            return true;
        }
    }
}
</script>

<style scoped>
.container{
    max-width: 360px;
    }

</style>