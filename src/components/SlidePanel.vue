<template>
  <div class="panel-wrap" :class="{ visible: visible }">
    <div class="panel">
      <div class="slide-panel">
        <div class="close-button" @click="closePanel()">X</div>
        <div>
          <h3>Carrinho</h3>
          <ul>
            <li v-for="item in cart" :key="item.id" class="cart-item">
              <div class="item-info">
                <img :src="item.image" alt="Imagem do Produto" />
                {{ item.name }} - R$ {{ item.price * item.quantity }}
              </div>
              <div class="item-actions">
                <div class="quantity">
                  <button
                    class="quantity-button"
                    @click="decrementQuantity(item)"
                  >
                    -
                  </button>
                  <span>{{ item.quantity }}</span>
                  <button
                    class="quantity-button"
                    @click="incrementQuantity(item)"
                  >
                    +
                  </button>
                </div>
                <div class="clear-item-button" @click="clearItem(item)">X</div>
              </div>
            </li>
          </ul>
          <div class="cart-total">Total: R$ {{ calculateTotal() }}</div>
          <button class="btn btn-danger" @click="clearCart">Limpar</button>
          <button class="checkout-button" @click="checkout">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { addNotification } from '@/components/Notification/notifyService';


export default {
  name: "SlidePanel",
  

  props: {
    title: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:visible", "update:cart"],

  methods: {
    closePanel() {
      this.$emit("update:visible", false);
    },
    // Função para remover um item do carrinho
    removeFromCart(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);

      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--; // Se a quantidade for maior que 1, diminui a quantidade
        } else {
          this.cart.splice(index, 1); // Caso contrário, remove o item do carrinho
        }

        this.saveCartToCookies(); // Salva o carrinho nos cookies após a alteração
      }
    },

    // Função para salvar o carrinho nos cookies
    saveCartToCookies() {
      Cookies.set("cart", JSON.stringify(this.cart), { expires: 1 / 24 }); // Salva o carrinho no cookie com expiração de 1 hora (1/24 representa 1 hora)
    },

    // Função para aumentar a quantidade de um item no carrinho
    incrementQuantity(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);

      if (index !== -1) {
        this.cart[index].quantity++; // Incrementa a quantidade do item
        this.saveCartToCookies(); // Salva o carrinho nos cookies após a alteração
      }
    },

    // Função para diminuir a quantidade de um item no carrinho
    decrementQuantity(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);

      if (index !== -1 && this.cart[index].quantity > 1) {
        this.cart[index].quantity--; // Decrementa a quantidade do item
        this.saveCartToCookies(); // Salva o carrinho nos cookies após a alteração
      }
    },
    // Função para Finalizar compra
    checkout() {
      const authToken = Cookies.get("authToken");
      console.log("AuthToken:", authToken);

      if (authToken) {
        // Se houver um authToken nos cookies, redirecione para a próxima página
        this.$router.push({ name: "checkout" }); // Substitua "proximaPagina" pelo nome da rota desejada
      } else {
        this.$router.push({ name: "Login" }); // Redirecionar para a rota de login
        // Se não houver um authToken, mostre uma notificação
        addNotification({
          type: 'warn', // Tipo da notificação (por exemplo, 'info', 'warn', 'error', 'success', etc.)
          text: 'Faça login ou registre-se para continuar.',
        });
      }
    },

    // REMOVE TODOS OS ITENS DO CARRINHO DE COMPRAS
    clearCart() {
      this.cart.splice(0); // Limpa o carrinho

      // Remova o cookie quando o carrinho estiver vazio
      Cookies.remove("cart");

      console.log(this.cart); // Exibe o carrinho vazio no console
    },

    // Função para remover um item específico do carrinho
    clearItem(item) {
      const index = this.cart.findIndex((cartItem) => cartItem.id === item.id);

      if (index !== -1) {
        this.cart.splice(index, 1); // Remove o item do carrinho
        this.$emit("update:cart", this.cart); // Emite um evento para atualizar o carrinho no componente pai
        this.saveCartToCookies(); // Salva o carrinho atualizado nos cookies após a remoção do item
      }
    },

    // Função para calcular o valor total do carrinho
    calculateTotal() {
      let total = 0;
      this.cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toFixed(2); // Arredonda o total para 2 casas decimais
    },
    
  },
};
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #eee;
  overflow: auto;
  padding: 1em;

  &-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 30em;
    transform: translateX(100%);
    transition: 0.3s ease-out;

    &.visible {
      transform: translateX(0);
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #ff0000;
  }

  h3 {
    color: #fff;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #444;
  }

  .item-info {
    flex: 2;
    display: flex;
    align-items: center;

    img {
      max-width: 50px;
      max-height: 50px;
      margin-right: 10px;
    }
  }

  .item-quantity {
    flex: 1;
    display: flex;
    align-items: center;

    .quantity-button {
      cursor: pointer;
      font-size: 20px;
      margin: 0 5px;
      color: #fff;
    }
  }

  .item-price {
    flex: 1;
    color: #fff;
  }

  .clear-item-button {
    cursor: pointer;
    font-size: 20px;
    color: #ff0000;
  }

  .clear-cart-button {
    margin-top: 20px;
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  .checkout-button {
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3 ease;
  }
  .checkout-button:hover{
    background-color: #0056b3;
  }

  .cart-total {
    margin-top: 10px;
    font-size: 18px;
    color: #fff;
    text-align: right;
    padding-right: 20px;
  }
}
</style>
