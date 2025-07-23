<template>
  <main class="not-found">
    <div class="container">
      <!-- Ilustração animada -->
      <div class="illustration">
        <img src="/astronaut.svg" alt="Ilustração de erro 404" class="astro" />
      </div>

      <!-- Conteúdo principal -->
      <div class="content">
        <h1 class="title">Oops! Página perdida no espaço</h1>
        <p class="subtitle">O conteúdo que você procura foi movido ou não existe mais.</p>
        
        <!-- Ações -->
        <div class="actions">
          <router-link to="/" class="home-button">
            <font-awesome-icon :icon="['fas', 'house']" />
            Voltar para Home
          </router-link>
          <button @click="goBack" class="back-button">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Voltar à página anterior
          </button>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 2rem;
  text-align: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.illustration {
  margin-bottom: 2rem;
  animation: float 6s ease-in-out infinite;
}

.astro {
  width: 200px;
  height: auto;
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.content {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.title {
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.home-button, .back-button {
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.home-button {
  background: #4dabf7;
  color: white;
  border: none;
}

.home-button:hover {
  background: #339af0;
  transform: translateY(-2px);
}

.back-button {
  background: white;
  color: #495057;
  border: 1px solid #dee2e6;
}

.back-button:hover {
  background: #f8f9fa;
  border-color: #adb5bd;
}

/* Responsividade */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .content {
    padding: 2rem 1.5rem;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>