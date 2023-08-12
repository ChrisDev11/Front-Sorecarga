<template>
  <div class="register-form">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Register</h1>

      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input v-model="user.Name" type="text" class="form-control" id="name" ref="Name" required>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input v-model="user.Email" type="email" class="form-control" id="email" ref="Email" required>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input v-model="user.Password" type="password" class="form-control" id="password" ref="Password" required>
      </div>

      <div class="mb-3">
        <label for="confirm-password" class="form-label">Confirm Password:</label>
        <input v-model="user.ConfirmPassword" type="password" class="form-control" id="confirm-password" ref="psw" required>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
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
      user: {
        Name: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
      },
    };
  },
  methods: {
    async submit() {
      if (!this.checkValidation()) {
        return;
      }

      try {
        await axios.post('https://localhost:3000/Users/Register', this.user, {
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
      
      if (!this.user.Password) {
        this.$refs.Password.focus();
        Swal.fire("Give Password !");
        return false;
      }
      if (this.user.Password !== this.user.ConfirmPassword) {
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
