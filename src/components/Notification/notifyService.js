import { ref } from 'vue';

const notifications = ref([]);

const addNotification = (notification) => {
  console.log("Adding Notification:", notification);
  notifications.value.push(notification);
};

export { notifications, addNotification };
