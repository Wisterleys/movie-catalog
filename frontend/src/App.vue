
<template>
  <div id="app">
    <!-- Barra de navegação (opcional) -->
    <nav v-if="$route.path !== '/'">
      <router-link to="/">Home</router-link> |
      <router-link to="/favorites">Favoritos</router-link>
    </nav>
    
    <!-- Aqui o componente da rota será renderizado -->
    <router-view />
  </div>
</template>

<style>
/* Estilos globais */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
}

nav {
  padding: 1rem;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 0.5rem;
}

nav a.router-link-exact-active {
  color: var(--primary-color);
}
</style>