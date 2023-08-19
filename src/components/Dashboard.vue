<template>
<div class="d-flex"> <!-- Use a classe "d-flex" para criar um layout flexível -->
      <SideBarDash class="flex-shrink-0" /> <!-- Adicione a classe "flex-shrink-0" para evitar que a barra lateral cresça -->
      <div class="flex-grow-1"> <!-- Use a classe "flex-grow-1" para que o conteúdo ocupe o espaço restante -->

<h3>Dashboard</h3>
      </div>
<router-view/>   
</div>
</template>

<script>
import SideBarDash from './SideBarDash.vue';


export default {
    components:{
        SideBarDash,
        
    },
    name: 'Dashboard',
}
</script>