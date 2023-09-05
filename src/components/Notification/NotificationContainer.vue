<template>
    <div class="notifications-container">
      <Notification
        v-for="(notification, index) in notifications"
        :key="index"
        :type="notification.type"
        :text="notification.text"
      />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Notification from '../Notification/Notification.vue'; // Importe o componente de notificação
  import { notifications } from '../Notification/notifyService'; // Importe as notificações
  
  export default {
    name: 'notificationContainer',
    components: {
      Notification,
    },
    setup() {
      return { notifications };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o container de notificações */
  .notifications-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    pointer-events: none; /* Para não bloquear eventos em elementos abaixo */
  }
  </style>
  