<template>

<SideBarDash/> 

<router-view/>   

</template>

<script>
import SideBarDash from '../../components/SideBarDash.vue';


export default {
    components:{
        SideBarDash,
        
    },
    name: 'Dashboard',
}
</script>