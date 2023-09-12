<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h2 class="mb-0">Sua Conta</h2>
          </div>
          <div class="card-body">
            <form>
              <!-- Informações Pessoais -->
              <h4 class="mb-3">Informações Pessoais</h4>
              <div class="form-group">
                <label for="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  v-model="cliente.name"
                  class="form-control"
                  placeholder="Seu Nome"
                />
              </div>

              <div class="form-group">
                <label for="cpf">CPF:</label>
                <input
                  type="text"
                  id="cpf"
                  v-model="cliente.cpf"
                  class="form-control"
                  placeholder="Seu CPF"
                />
              </div>

              <div class="form-group">
                <label for="telefone">Telefone:</label>
                <input
                  type="text"
                  id="telefone"
                  v-model="cliente.phone"
                  class="form-control"
                  placeholder="Seu Telefone"
                />
              </div>

              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  v-model="cliente.email"
                  class="form-control"
                  placeholder="Seu Email"
                />
              </div>

              <!-- Campos de Endereço -->
              <h4 class="mb-3">Endereço</h4>
              <div class="form-group">
                <label for="cep">CEP:</label>
                <div class="input-group">
                  <input
                    type="text"
                    id="cep"
                    v-model="endereco.cep"
                    class="form-control"
                    placeholder="Seu CEP"
                  />
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="buscarCep"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="logradouro">Logradouro:</label>
                <input
                  type="text"
                  id="logradouro"
                  v-model="endereco.logradouro"
                  class="form-control"
                  placeholder="Seu Logradouro"
                />
              </div>

              <div class="form-group">
                <label for="complemento">Complemento:</label>
                <input
                  type="text"
                  id="complemento"
                  v-model="endereco.complemento"
                  class="form-control"
                  placeholder="Seu Complemento"
                />
              </div>

              <div class="form-group">
                <label for="bairro">Bairro:</label>
                <input
                  type="text"
                  id="bairro"
                  v-model="endereco.bairro"
                  class="form-control"
                  placeholder="Seu Bairro"
                />
              </div>

              <div class="form-group">
                <label for="localidade">Localidade:</label>
                <input
                  type="text"
                  id="localidade"
                  v-model="endereco.localidade"
                  class="form-control"
                  placeholder="Sua Localidade"
                />
              </div>

              <div class="form-group">
                <label for="uf">UF:</label>
                <input
                  type="text"
                  id="uf"
                  v-model="endereco.uf"
                  class="form-control"
                  placeholder="Sua UF"
                />
              </div>

              <button type="submit" class="btn btn-primary btn-block" @click="salvar">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export default {
  name: "accont",
  data() {
    return {
      endurl: "https://rechargeapi.azurewebsites.net/",
      userId: null,
      jwtDecoded: null,

      cliente: {
        name: "",
        cpf: "",
        email: "",
        phone: "",
      },
      endereco: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        uf: "",
      },
    };
  },
  created() {
    const jwtCookie = Cookies.get("authToken");

    // Decode JWT token
    if (jwtCookie) {
      try {
        const decodedToken = jwtDecode(jwtCookie);

        if (decodedToken) {
          this.jwtDecoded = decodedToken;
          // Acesse o campo correto do JWT para obter o ID do usuário
          const userId = decodedToken.Id; // Substitua 'sub' pelo campo correto em seu JWT
          console.log("Token decodificado:", userId);
          // Faça uma solicitação Axios para buscar os dados do usuário
          axios
            .get(`${this.endurl}/Users/${userId}`)
            .then((response) => {
              // Preencha os dados do usuário no formulário com base na resposta
              this.cliente = response.data;
              //console.log("Cliente:", this.cliente);
            })
            .catch((error) => {
              console.error("Erro ao buscar os dados do usuário:", error);
            });
        }
      } catch (error) {
        console.error("Erro ao decodificar o JWT:", error);
      }
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(
          `${this.endurl}/Users/${this.userId}`
        );
        // Manipule os dados do usuário aqui e preencha o formulário
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    },
    async buscarCep() {
      try {
        const response = await axios.get(`${this.endurl}/Address/viacep/${this.endereco.cep}`);
        const data = response.data;

        // Atualize os campos do endereço com os dados obtidos
        this.endereco.logradouro = data.logradouro || "";
        this.endereco.complemento = data.complemento || "";
        this.endereco.bairro = data.bairro || "";
        this.endereco.localidade = data.localidade || "";
        this.endereco.uf = data.uf || "";
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        // Trate os erros de acordo com as necessidades do seu projeto
      }
    },
    async salvar() {
      try {
        // Construa um objeto com os dados do cliente e do endereço
        const dadosParaSalvar = {
          cliente: this.cliente,
          endereco: this.endereco,
        };

        // Faça uma solicitação Put para salvar os dados no servidor
        const response = await axios.put(
          `${this.endurl}/Users/${this.jwtDecoded.Id}`, // Substitua pela URL correta de salvamento no servidor
          dadosParaSalvar
        );

        if (response.status === 200) {
          console.log("Dados salvos com sucesso!");
          // Redirecione ou faça outra ação após o salvamento bem-sucedido
        } else {
          console.error("Erro ao salvar os dados:", response.statusText);
          // Trate erros de acordo com as necessidades do seu projeto
        }
      } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        // Trate erros de rede ou outros erros
      }
    },
  },
};
</script>

<style></style>
