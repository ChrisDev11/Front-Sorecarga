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
      <button @click="createPurchase()">Prosseguir Compra</button>
    </div>
    <div v-else-if="step === 2">
      <!-- Etapa 2: Dados do Cliente -->
      <h3>Dados do Cliente</h3>
      <form>
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="cliente.name" />
        </div>
        <div class="form-group">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="cliente.cpf" />
        </div>
        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input type="text" id="telefone" v-model="cliente.phone" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="cliente.email" />
        </div>
        <div class="form-group">
          <label for="formaPagamento">Forma de Pagamento:</label>
          <select id="formaPagamento" required>
            <option value="pix">PIX</option>
          </select>
        </div>
      </form>
      <button @click="prevStep">Voltar</button>
      <button @click="generatePayloadAndProceedToNextStep">
        Gerar Pagamento
      </button>
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
import jwtDecode from "jwt-decode";
import axios from "axios";

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
      jwtDecoded: null,
    };
  },
  created() {
    // Recupere os dados do carrinho dos cookies
    const cartData = Cookies.get("cart");
    if (cartData) {
      this.cart = JSON.parse(cartData); // Converta o valor do cookie em um objeto JSON
    }

    const cartDataJSON = Cookies.get("cart");
    
  if (cartDataJSON) {
    const cartData = JSON.parse(cartDataJSON);

    // Extrai apenas os campos desejados e cria um novo array
    const cartBuyData = cartData.map(item => {
      return {
        productId: item.id,
        priceUn: item.price,
        amount: item.quantity,
       };
    });

    

    // Salva os dados do carrinho de compra no cookie "cartbuy"
    Cookies.set("cartbuy", JSON.stringify(cartBuyData));
  } else {
    // Se não houver dados no cookie "cart", crie um cookie "cartbuy" vazio
    Cookies.set("cartbuy", "[]");
  }


  
    const jwtCookie = this.getCookie('authToken');

// Decode JWT token
    if (jwtCookie) {
      try {
        const decodedToken = jwtDecode(jwtCookie);

        if (decodedToken) {
          this.jwtDecoded = decodedToken;
          // Acesse o campo correto do JWT para obter o ID do usuário
          const userId = decodedToken.Id; // Substitua 'sub' pelo campo correto em seu JWT
          console.log("Token decodificado:", decodedToken);
          // Faça uma solicitação Axios para buscar os dados do usuário
          axios
            .get(`https://localhost:3000/Users/${userId}`)
            .then((response) => {
              // Preencha os dados do usuário no formulário com base na resposta
              this.cliente = response.data;
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
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },



    generatePayloadAndProceedToNextStep() {
// Função para obter um cookie pelo nome
function getCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

const cartBuyDataEncoded = getCookie('cartbuy');

// Certifique-se de que os cookies cartBuyData estejam presentes
if (cartBuyDataEncoded) {
  try {
    // Decodifique a string URL-encoded e, em seguida, analise-a como JSON
    const cartData = JSON.parse(decodeURIComponent(cartBuyDataEncoded));

    // Certifique-se de que a estrutura dos dados está correta
    if (Array.isArray(cartData)) {
      // Combine todos os dados do carrinho em um único objeto
      const combinedCartData = {};

      cartData.forEach(item => {
        Object.assign(combinedCartData, item);
      });

      // Reorganize os campos como desejado em um objeto individual
      const reorderedCartData = {
        productId: combinedCartData.productId,
        purchaseId: combinedCartData.purchaseId,
        amount: combinedCartData.amount,
        priceUn: combinedCartData.priceUn,
      };

      // Transforme cada item do carrinho em um objeto individual
      const individualItems = cartData.map(item => ({
        productId: item.productId,
        purchaseId: combinedCartData.purchaseId,
        amount: item.amount,
        priceUn: item.priceUn,
      }));

      console.log('Objeto combinado:', reorderedCartData);
      console.log('Itens individuais:', individualItems);

      


      

      // Faça a solicitação POST com os dados combinados do carrinho
      axios.post('https://localhost:3000/Cart', individualItems, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // A solicitação foi bem-sucedida, você pode lidar com a resposta (opcional)
        console.log('Dados do carrinho enviados com sucesso:', response.data);

        // Avance para a próxima etapa, se necessário
        this.step = 3;
      })
      .catch(error => {
        console.error('Erro ao enviar dados do carrinho:', error);
        // Lidar com erros de forma apropriada (exibindo uma mensagem de erro, revertendo alterações, etc.)
      });






        // Chame o gerador de payload com os dados do cliente
  const payloadGenerator = new PayloadGenerator();
  payloadGenerator.setAmount(this.calculateTotal()); // Defina o valor de amount corretamente
  // Configure os dados do cliente aqui
  const payload = payloadGenerator.generatePayload(); // Use o método do gerador

  // Exiba a payload gerada
  this.payloadGenerated = payload;

  // Em seguida, faça a solicitação PUT para salvar os dados do cliente no banco de dados
  axios.put(`https://localhost:3000/Users/${this.jwtDecoded.Id}`, this.cliente)
    .then(response => {
      // A solicitação foi bem-sucedida, você pode lidar com a resposta (opcional)
      console.log('Dados do cliente salvos com sucesso:', response.data);
      
      // Avance para a etapa 3 (Dados de Pagamento)
      this.step = 3;
    })
    .catch(error => {
      console.error('Erro ao salvar os dados do cliente:', error);
      // Lidar com erros de forma apropriada (exibindo uma mensagem de erro, revertendo alterações, etc.)
    });
      } else {
        console.error('A estrutura dos dados do carrinho é inválida.');
      }
    } catch (error) {
      console.error('Erro ao analisar os dados do carrinho:', error);
    }
  } else {
    console.error('Cookies cartBuyData não encontrados ou vazios.');
  }

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


    prevStep() {
      this.step--;
    },



   async createPurchase() {
  try {
    // Decodifique o token JWT para obter o ID do usuário
    const jwtDecoded = jwtDecode(this.getCookie("authToken"));
    const userId = jwtDecoded.Id;

    // Construa o objeto de compra com os dados fornecidos
    const purchaseData = {
      buyDate: "", // Use a data atual
      payment: "", // Substitua pelo método de pagamento desejado
      status: "Iniciado",
      userId: userId, // Use o ID do usuário obtido do JWT
      cartItems: [],
    };

    // Faça uma solicitação POST para criar a compra
    const response = await axios.post(
      "https://localhost:3000/Purchase",
      purchaseData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Verifique se a resposta contém o ID da compra
    const purchaseId = response.data.id; // Substitua 'Id' pelo campo correto em sua resposta JSON
    

    // Avance para a próxima etapa após o sucesso
    this.nextStep();

// Agora, adicione o purchaseId a todos os objetos nas cookies 'cartbuy'
const existingData = Cookies.get("cartbuy");

// Verifique se já há dados nos cookies 'cartbuy'
let cartBuyData = existingData ? JSON.parse(existingData) : [];

// Adicione o purchaseId a todos os objetos na matriz
cartBuyData.forEach(item => {
  item.purchaseId = purchaseId;
});

// Salve os dados atualizados nos cookies 'cartbuy'
Cookies.set("cartbuy", JSON.stringify(cartBuyData));
console.log('cartBuyData:', cartBuyData);



  } catch (error) {
    console.error("Erro ao registrar:", error);
    // Trate o erro adequadamente aqui, você pode exibir uma mensagem de erro para o usuário ou fazer outras ações necessárias.
  }

  
},




    nextStep() {
      this.step++;
    },
    finalizeOrder() {
      // Limpar os dados do carrinho (cart) dos cookies
      Cookies.remove("cart");

      // Redirecionar para a página "/home"
      this.$router.push("/");
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
