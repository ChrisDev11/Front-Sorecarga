<template>
  <div class="register-form">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal" style="font-family:Verdana, Geneva, Tahoma, sans-serif;">Criar conta</h1>

      <div class="mb-3">
        <label for="name" class="form-label">Nome:</label>
        <input v-model="user.Name" type="text" class="form-control" id="name" ref="Name" required>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">E-mail:</label>
        <input v-model="user.Email" type="email" class="form-control" id="email" ref="Email" required>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Senha:</label>
        <input v-model="user.hashPassword" type="password" class="form-control" id="hashPassword" ref="Password" required>
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirme sua senha:</label>
        <input v-model="user.ConfirmPassword" type="password" class="form-control" id="confirm-password" ref="psw" required>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Continuar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from "vue-router";

export default {
  name: "Register",
  data() {
    return {
        endereco:"https://rechargeapi.azurewebsites.net/",
        user: {
        Name: '',
        Email: '',
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
        await axios.post(`${this.endereco}/Users/register`, this.user, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Assuming router is globally available (e.g., imported from Vue Router)
        this.$router.push('/login');
      } catch (error) {
        console.error('Erro ao registrar:', error);
      }
    },
    checkValidation() {
      if (!this.user.Name) {
        this.$refs.Name.focus();
        Swal.fire("Give username !");
        return false;
      }
      if (!this.user.Email) {
        this.$refs.Email.focus();
        Swal.fire("Give Email !");
        return false;
      }
      
      if (!this.user.hashPassword) {
        this.$refs.hashPassword.focus();
        Swal.fire("Give Password !");
        return false;
      }
      if (this.user.hashPassword !== this.user.ConfirmPassword) {
        this.$refs.psw.focus();
        Swal.fire("Password and repeat password mismatched !");
        return false;
      }

      return true;
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
.register-form {
  max-width: 40%;
  padding: 16px;
  margin: 0 auto;
  margin-top: 90px;
  margin-bottom: 108px;
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
</style>
