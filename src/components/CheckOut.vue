<template>
  <div>
    <h2>Check-out</h2>
    <div v-if="step === 1">
      <!-- Etapa 1: Conferência de produtos -->
      <h3>Conferência de Produtos</h3>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço Unitário</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.name }}</td>
            <td>R$:{{ item.price.toFixed(2) }}</td>
            <td>{{ item.quantity }}</td>
            <td>R$:{{ item.quantity * item.price }}</td>
            <td>
              <button @click="decrementQuantity(item)">-</button>
              <button @click="incrementQuantity(item)">+</button>
              <button @click="removeItemFromCart(index)">X</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total">
        Total:
        <span class="green-text">R$ {{ calculateTotal().toFixed(2) }}</span>
      </div>
      <button @click="nextStep">Prosseguir Compra</button>
    </div>
    <div v-else-if="step === 2">
      <!-- Etapa 2: Dados do Cliente -->
      <h3>Dados do Cliente</h3>
      <form>
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="cliente.nome" />
        </div>
        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="cliente.cpf" />
        </div>
        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input type="text" id="telefone" v-model="cliente.telefone" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="cliente.email" />
        </div>
        <div class="form-group">
          <label for="formaPagamento">Forma de Pagamento:</label>
          <select id="formaPagamento" v-model="cliente.formaPagamento">
            <option value="pix">PIX</option>
          </select>
        </div>
      </form>
      <button @click="prevStep">Voltar</button>
      <button @click="generatePayloadAndProceedToNextStep">Gerar Pagamento</button>
    </div>
    <div v-else-if="step === 3">
      <!-- Etapa 3: Dados de Pagamento -->
      <h3>Dados de Pagamento</h3>
      <!-- Exibir a payload gerada aqui -->
      <div v-if="payloadGenerated">
        <h4>Payload Pix Gerada:</h4>
        <tr></tr>
        <h3>Prazo para confirmação de pagamento de no Máximo 24 horas</h3>
        <pre>{{ payloadGenerated }}</pre>
        <div>
          <h4>QR Code Pix:</h4>
          <QRCode :value="payloadGenerated" />
          

        </div>
      </div>
      <button @click="finalizeOrder">Finalizar</button>
    </div>
  </div>
</template>

<script>
import PayloadGenerator from "./Pix/PayloadGenerator";
import QRCode from "./Qrcode/QRCode.vue";
import Cookies from "js-cookie";

export default {
  nome: "CheckOut",
  components: {
    QRCode,
  },
 

  data() {
    return {
      step: 1,
      cart: [],
      payloadGenerated: null,

      cliente: {
        nome: "",
        cpf: "",
        telefone: "",
        email: "",
        formaPagamento: "",
      },
    };
  },
  created() {
    // Recupere os dados do carrinho dos cookies
    const cartData = Cookies.get("cart");
    if (cartData) {
      this.cart = JSON.parse(cartData); // Converta o valor do cookie em um objeto JSON
    }
  },
  methods: {
    generatePayloadAndProceedToNextStep() {
      // Chame o gerador de payload com os dados do cliente
      const payloadGenerator = new PayloadGenerator();
      payloadGenerator.setAmount(this.calculateTotal()); // Defina o valor de amount corretamente
      // Configure os dados do cliente aqui
      const payload = payloadGenerator.generatePayload(); // Use o método do gerador

      // Exiba a payload gerada
      this.payloadGenerated = payload;

      // Avance para a etapa 3 (Dados de Pagamento)
      this.step = 3;
    },
    // Decrementa a quantidade de um item no carrinho
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCartCookie();
      } else {
        this.removeItemFromCart(this.cart.indexOf(item));
      }
    },
    // Incrementa a quantidade de um item no carrinho
    incrementQuantity(item) {
      item.quantity++;
      this.updateCartCookie();
    },
    // Remove um item específico do carrinho com base no índice
    removeItemFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCartCookie();
    },
    getCartCookieName() {
      return Cookies.get("cart");
    },
    updateCartCookie() {
      const cartData = JSON.stringify(this.cart);
      Cookies.set("cart", cartData);
    },
    created() {
      this.getCartProductsFromCookies();
    },
    // Calcula o valor total do carrinho
    calculateTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    nextStep() {
      this.step++;
    },
    finalizeOrder() {
      // Limpar os dados do carrinho (cart) dos cookies
      Cookies.remove('cart');

      // Redirecionar para a página "/home"
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="scss">
div {
  text-align: center;
  padding: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
}

/* Estilo das etapas */
h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

/* Botões */
button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Formulário de cliente */
form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

// Lista de produtos
.cart-table {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f2f2f2;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 6px 10px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #0056b3;
  }
}

/* Estilo do valor total */
.total {
  text-align: right;
  margin-top: 10px;
  font-size: 18px;
}
.green-text {
  color: #4caf50;
}

/* Etapas ocultas */
[v-cloak] {
  display: none;
}
</style>
