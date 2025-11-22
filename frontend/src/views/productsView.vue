<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router'; 
    import api from '../plugins/axios';

    const erro = ref('');

    const products = ref('');
    const keysProducts = ref('');
    const styleData = ref('visible');

    onMounted(async () => {
            try {
                const returned = await api.get('/data/products');
                
                // Lembre-se: refs precisam de .value no script
                products.value = returned.data;

                if(!products.value || products.value.length === 0) {
                    styleData.value='invisble';
                    throw new Error('Nenhum produto encontrado');
                }

                // Pega as chaves do primeiro item para montar o cabeçalho
                keysProducts.value = Object.keys(products.value[0]);
                console.log( keysProducts.value);

            } catch(err) {
                console.log(err);
                if (err.response && err.response.data) {
                    erro.value = err.response.data.message;
                } else {
                    erro.value = "Erro de conexão ou lista vazia.";
                }
            }
        });


    

</script>
<template>
    <div class = "root">
        <h1 v-if="styleData == 'invisible'">SEM PRODUTOS NO MOMENTO</h1>
        <table id = "products" :class="styleData">
            <caption>Produtos - GET ALL</caption>
            <thead>
                <tr>
                    <th v-for="key of keysProducts" :key="key" scope="col" >
                        {{ key }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products">
                   <td v-for="column in keysProducts">
                        {{  product[column]  }}
                   </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
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

    @media screen and (max-width: 1200){
        table tr{
            display: block;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>