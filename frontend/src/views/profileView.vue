<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router'; 
    import api from '../plugins/axios';
    import TheErrorDiv from '../components/TheErrorDiv.vue'

    const user = ref('');
    const keysUser = ref('');
    const error = ref('');

    const router = useRouter();

    const login = window.localStorage.getItem('JWT_TOKEN');

    onMounted(async () => {
        try{

            const returned = await api.get(`/me`);
            user.value = returned.data;
            keysUser.value = Object.keys(user.value);
        }
        catch(err){
            error.value = err.response.data.message;
            console.log(error.value);
        }
    });

    const logout = () => {
    // 1. Limpa o token
        window.localStorage.removeItem('JWT_TOKEN');
  
    // 2. Manda pro login
        router.push('/');
}


</script>

<template>
    <div class="root">
        <TheErrorDiv v-if="error" :label="error"/>
        <button @click="logout" class="btn" v-if="!error"> Sair </button>
        <div id="data" v-if="!error">
            <div v-for="column in keysUser" :key="column">
                <span>{{ column }}:</span><span>{{ user[column] }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
   #data{
        background-color: rgb(8, 9, 20);
        border: 1px solid rgb(87, 87, 87);
        padding: 35px;
        border-radius: 5px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
   }

   #data div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
   }

   #data div span:first-child{
        color: white;
   }

   #data div span:nth-child(2){
    color:  rgb(179, 179, 179);
   }


   .btn {
    user-select: none;
  background-color: transparent;
  border: 1px solid #eb2f2f;
  color: #eb2f2f;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
  transition: 0.5s;
}


.btn:hover {
  background-color: #eb2f2f;
  color: rgb(255, 255, 255);
}
</style>