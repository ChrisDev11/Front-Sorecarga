<template>
  
    <div class="d-flex">

<SideBarDash class="flex-shrink-0" />
<div class="container">
<h1>Painel de Acompanhamento de Vendas</h1>

    <!-- Tabela de Vendas -->
    <table class="table">
      <thead>
        <tr>
          <th>Número da Venda</th>
          <th>Nome do Cliente</th>
          <th>Data da Compra</th>
          <th>Processo</th>
          <th>Confirmar Pagamento</th>
          <!-- <th>Valor Total</th> -->
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="purchase in purchases" :key="purchase.id">
          <td>{{ purchase.id }}</td>
          <td>{{ purchase.userName }}</td>
          <td>{{ purchase.buyDate }}</td>
          <td>{{ purchase.status }}</td>
          <td>
            <button>Confirmar</button>
          </td>
          <!-- <td>{{ purchase.payment }}</td> -->
          
          <td>
            <button @click="viewDetails(purchase.id)" class="btn btn-primary">Detalhes</button>
          </td>
        </tr>
      </tbody>
    </table>

</div>
</div>


</template>

<script>
import SideBarDash from "@/components/SideBarDash.vue";
import axios from "axios";

export default {
  name: "Neworder",
  components: {
    SideBarDash,
  },
  data() {
    return {
      endereco:"https://rechargeapi.azurewebsites.net/",
      purchases: [],
    };
  },
  created() {
    this.fetchPurchaseData();
  },
  methods: {
    async fetchPurchaseData() {
      try {
        const response = await axios.get(`${this.endereco}/Purchase`);
        const purchases = response.data;

        // Criar uma lista de promessas para buscar os detalhes do usuário
        const userDetailPromises = purchases.map((purchase) => {
          return axios.get(`${this.endereco}/Users/${purchase.userId}`)
            .then((userResponse) => {
              // Adicionar o nome do usuário à compra
              purchase.userName = userResponse.data.name;
            });
        });

        // Esperar todas as promessas de detalhes do usuário serem resolvidas
        await Promise.all(userDetailPromises);

        // Atualize os dados de compra com os detalhes do usuário
        this.purchases = purchases;
      } catch (error) {
        console.error('Erro ao buscar dados de compra:', error);
      }
    },
  },
};
</script>

<style>

</style>
