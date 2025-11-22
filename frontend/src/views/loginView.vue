<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'; 
    import api from '../plugins/axios';
    import TheTittle from '../components/TheTittle.vue'

    const email = ref('');
    const senha = ref('');
    const erro = ref('');

    const router = useRouter();

    const handleLogin = async () => {
        erro.value = '';

        const send = { email: email.value, senha: senha.value };
        
        try{
            const response = await api.post('/login', send);
            
            const token = response.data.token;
            const id = response.data.id;
            window.localStorage.setItem('JWT_TOKEN',token);
            window.localStorage.setItem('ID', id);

            router.push('/products');
        }
        catch(err){
            console.log(err);
           
            if (err.response && err.response.data) {
            erro.value = err.response.data.message;
            }else {
            erro.value = "Erro de conexão com o servidor.";
            }
        }
    }
        
    

</script>
<template>
    <TheTittle/>
    <div class = "root">
        <form action="" id = "form-login">
        <fieldset>
            <legend>Insira os dados abaixo</legend>
            <div class="form-unit">
                <input type="text" name="email" v-model="email" placeholder="">  
                <label for="email">Email</label>
            </div>
            <div class="form-unit">
                <input type="password" name="senha" v-model="senha" placeholder="">
                <label for="senha">Senha</label>
            </div>
           
            <button type="submit" id = "submit" @click.prevent="handleLogin"><span>Logar</span></button>
        </fieldset>
    </form>
    </div>
    
</template>
<style scoped>

    .root{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        background-image: url('../assets/wallback.webp');
    }

    #form-login{
        height: 375px;
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        font-size: 1.5rem;
    }

    .form-unit{
        width: 75%;
        position: relative;
    }

    #form-login > fieldset{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
        align-items: center;
        border: none;
    }

    #form-login > fieldset label{
        z-index: -1;
        font-size: 1rem;
        position: absolute;
        background-color:transparent;
        border-radius: 10px;
        padding: 5px;
        left: 5px;
        top: 5px;
        text-align: left;
        transition: 0.5s;
    }

    #form-login > fieldset input{
        height: 30px;
        width: 100%;
        transition: 0.5s;
        background-color: transparent;
        border: 1px solid rgb(255, 255, 255);
        border-radius: 5px;
        will-change: scale;
    }

    #form-login > fieldset input:focus{
        outline: none;
        
    }

    #form-login > fieldset input:focus ~ label, #form-login > fieldset input:not(:placeholder-shown) ~ label{
        scale: 0.8;
        z-index: 0;
        background-color: #242424;
        transform: translateX(-100px);
        transform: translateY(-25px);
    }

    #submit{
        position: relative;
        font-size: 2rem;
        z-index: 1;
        border: none;
        background-color: transparent;
        border: 1px solid gray;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        border-radius: 3px;
        transition: 0.5s;
    }

    #submit > span{
        z-index: 2;
    }

    #submit::after{
        position: absolute;
        z-index: 0;
        background-color: transparent;
        content: ' ';
        bottom: 0; 
        height: 0px;
        border-radius: 3px;
        width: 100%;
        transition: 0.5s;
        will-change: height;
    }

    #submit:hover{
        color: black;
    }

    #submit:hover::after{
       background-color: white;
        height: 100%;
    }
    

    @media (max-width: 500px){
        #form-login{
            width: 75%;
        }
    };
</style>