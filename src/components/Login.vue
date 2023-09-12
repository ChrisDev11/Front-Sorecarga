<template>
  <div class="login-form">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal " style="font-family:Verdana, Geneva, Tahoma, sans-serif;">Fazer login</h1>

      <div class="mb-3">
        <label for="email" class="form-label">E-mail:</label>
        <input v-model="credentials.email" type="email" class="form-control" id="email" required>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <input v-model="credentials.hashPassword" type="password" class="form-control" id="hashPassword" required>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
      <button class="w-100 btn btn-lg btn-secondary mt-2" type="button" @click="goToRegister">Cadastre-se</button>
      
    </form>
  </div>
</template>
  
<script>

import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";
import Cookies from 'js-cookie'; 

export default {
  name: "Login",
  data() {
    return {
      endereco:"https://rechargeapi.azurewebsites.net/",
      credentials: {
        email: '',
        hashPassword: '',
      },
    };
  },
  methods: {
    

    async submit() {
      if (!this.checkValidation()) {
        return;
      }

      try {
        const response = await axios.post(`${this.endereco}/Users/Login`, this.credentials, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Success Logins")
        // Assuming the API returns a token upon successful login
        const authToken = response.data;

        // Store the token in a cookie
        console.log(response.data);
        Cookies.set('authToken', authToken);

        // Redirect to appropriate route after successful login
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        Swal.fire("Login failed. Please check your credentials.");
      }
    },
    checkValidation() {
      if (!this.credentials.email) {
        Swal.fire("Please enter your email.");
        return false;
      }
      
      if (!this.credentials.hashPassword) {
        Swal.fire("Please enter your password.");
        return false;
      }

      return true;
    },
    goToRegister() {
      this.$router.push('/register'); // Adjust this to your registration route
    },
  },
  setup() {
    const router = useRouter();

    return {
      router
    };
  }
};
</script>


<style>
.login-form {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  margin-top: 135px;
  margin-bottom: 180px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  padding: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}
.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>