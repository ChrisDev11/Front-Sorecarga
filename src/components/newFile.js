import PayloadGenerator from "./Pix/PayloadGenerator";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default (await import('vue')).defineComponent({
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
// Obtenha os cookies cartBuyData
const cartBuyDataEncoded = getCookie('cartbuy');

// Certifique-se de que os cookies cartBuyData estejam presentes
if (cartBuyDataEncoded) {
try {
// Decodifique a string URL-encoded e, em seguida, analise-a como JSON
const cartData = JSON.parse(decodeURIComponent(cartBuyDataEncoded));

// Certifique-se de que a estrutura dos dados está correta
if (Array.isArray(cartData)) {
// Combine todos os dados do carrinho em um único objeto
const combinedCartData = cartData.reduce((result, item) => {
return { ...result, ...item };

}, {});
console.log(combinedCartData);
console.log(cartBuyDataEncoded);

// Faça a solicitação POST com os dados combinados do carrinho
axios.post('https://localhost:3000/cart', combinedCartData, {
headers: {
'Content-Type': 'application/json',
},
});

then(response => {
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
buyDate: "",
payment: "",
status: "Iniciado",
userId: userId,
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

// Agora, adicione o purchaseId aos cookies 'cartbuy'
const existingData = Cookies.get("cartbuy");

// Verifique se já há dados nos cookies 'cartbuy'
let cartBuyData = existingData ? JSON.parse(existingData) : [];

// Adicione o novo elemento 'purchaseId' ao array
cartBuyData.push({ purchaseId });

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
});
