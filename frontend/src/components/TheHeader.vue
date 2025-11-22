<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();


// Função de Logout simples
const login = window.localStorage.getItem('JWT_TOKEN');

const logout = () => {
  if(window.localStorage.getItem('JWT_TOKEN'))
    router.push('/profile');
  else
    router.push('/');
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <h2>SGEweb</h2>
    </div>

    <nav>
      <RouterLink to="/profile/purchases">Minhas Compras</RouterLink>
      <RouterLink to="/products">Produtos</RouterLink>
      <RouterLink to="/profile">Meu Perfil</RouterLink> <button @click="logout" class="btn"> Conta </button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  user-select: none;
  background-color: #2c3e50; /* Cor escura profissional */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  width: 100%;
  border-radius: 5px;
  justify-content: space-between; /* Joga logo pra esq e menu pra dir */
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: 0.5s;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
}

nav {
  display: flex;
  gap: 20px; /* Espaço entre os links */
  align-items: center;
}

/* Estilizando o RouterLink (que vira uma tag <a> no navegador) */
a {
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

.btn {
  background-color: transparent;
  border: 1px solid #ff8800;
  color: #ff8800;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.5s;
}


.btn:hover {
  background-color: #ff8800;
  color: rgb(255, 255, 255);
}


</style>