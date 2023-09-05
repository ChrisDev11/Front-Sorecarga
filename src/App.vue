<template>  

  <Navbar/>
  <notificationContainer />
  <router-view/>
  
  <Footer/>
  
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import notificationContainer from "@/components/Notification/NotificationContainer.vue"
export default {
  components: {
    Navbar,
    Footer,
    notificationContainer
    
  },
  
}
</script>
<style>
*{
  /* background: #EAEAEA; */
  font-family: 'Poppins', sans-serif;
  font-size: small;
  
}
.Footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}



</style>
