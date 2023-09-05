import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vue3Notify from 'vue3-notify';



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'


const app =createApp(App)
app.config.globalProperties.hostname = "https://localhost:7172"
app.use(Vue3Notify)
app.use(router)
app.mount('#app')
