<template>
    <div v-if="show" class="notification" :class="type">
    {{ text }}
    </div>
  </template>
  
  <script>
import { ref, watch } from 'vue';

export default {
  name: 'notification',

  props: {
    type: String,
    text: String,
  },
  setup() {
    console.log('Setup do componente Notification está sendo executado.');
  const show = ref(true);

  // Temporizador para ocultar a notificação após 5 segundos
  setTimeout(() => {
    show.value = false;
  }, 5000);

  return { show };
},
};
</script>

  
  <style scoped>
  /* Estilos para a notificação */
  .notification {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px;
    border-radius: 4px;
    background-color: #ff9800;
    color: #fff;
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
  }
  
  .error {
    background-color: #f44336;
  }
  
  /* Adicione outros estilos conforme necessário */
  </style>
  