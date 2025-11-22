<script setup>
    import { ref, onMounted } from 'vue';
    import api from '../plugins/axios'

    const purchases = ref('');
    const error = ref('');
    const keysPurchases = ref('');
    const styleData = ref('visible');
    onMounted(async () => {
        try{
        const returned = await api.get('/me/purchases');
        purchases.value = returned.data;
        if(!purchases.value || purchases.value.length === 0) {
            styleData.value='invisible';
            throw new Error('Nenhuma compra encontrado');  
        }
        keysPurchases.value = Object.keys(purchases.value[0]);
    }
    catch(err){
        if(err.response)
            error.value = err.response.data.message;
        console.log(error.value || 'Um erro ocorreu');
    }

    })
    
</script>

<template>
    <RouterLink to="/profile/createPurchase" v-if="styleData != 'invisible'">Criar mais</RouterLink>
    <div class="root">   
        
        <h1 v-if="styleData == 'invisible'">NÃO HÁ COMPRAS</h1>
        <table id = "products" :class="styleData" v-if="styleData != 'invisible'">
            <caption>Compras - GET ALL</caption>
            <thead>
                <tr>
                    <th v-for="key in keysPurchases" :key="key" scope="col" >
                        {{ key }}
                    </th>
                    <th>
                        Alterar
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="purchase in purchases">
                   <td v-for="key in keysPurchases">
                        {{  purchase[key]  }}
                   </td>
                   <td class = "centralize">
                        <button>
                            <i class="bi bi-plus-lg"></i> <span>Produto</span>
                        </button>
                   </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style  scoped>
    .invisible{
        display: none;
    }

   table {
        background-color: #303030;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        width: 100%;
        margin-bottom: 20px;
        box-shadow: 0px 1px 10px 1px rgb(31, 31, 31);
    }


    caption{
        font-size: 1.5rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        background-color: rgb(39, 117, 219);
    }
    th, td {
    padding: 8px;
    text-align: left;
    }

    th {
    background-color: #333;
    color: #fff;
    }

    tr:nth-child(even) {
    background-color: #383838;
    }

    tr:hover {
    background-color: #5e5e5e;
    }

    .root{
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        user-select: none;
    }

    a {
        user-select: none;
        color: #ddd;
        text-decoration: none;
        font-weight: bold;
        transition: 0.3s;
    }

    a:hover {
        color: #42b883; /* Verde Vue */
    }

    /* Classe automática que o Vue adiciona no link ativo */
    .router-link-active {
        color: #42b883;
        border-bottom: 2px solid #42b883;
    }

    .centralize{
        text-align: center;
    }

    @media screen and (max-width: 1200){
        table tr{
            display: block;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>