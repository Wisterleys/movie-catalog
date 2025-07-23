# Catálogo de Filmes - Frontend (Vue.js)

Aplicação Single Page (SPA) para explorar e gerenciar filmes favoritos usando a API do TMDB.

## Funcionalidades

- 🎬 Buscar filmes por título usando a API do TMDB
- ❤️ Adicionar/remover filmes dos favoritos (armazenados no localStorage)
- 🏷️ Filtrar favoritos por gênero
- 📱 Design responsivo
- 🎥 Página de detalhes com trailers e filmes similares
- 🚀 Vue 3 Composition API com Pinia para gerenciamento de estado

## Tecnologias Utilizadas

- Vue 3 (Composition API)
- Pinia (Gerenciamento de estado)
- Vue Router
- Axios (Cliente HTTP)
- Font Awesome (Ícones)
- Variáveis CSS (Temas)
- API TMDB (Dados dos filmes)

## Pré-requisitos
- Docker instalado
- Docker Compose instalado
- Chave da API TMDB (veja como obter abaixo)
- Chave da API TMDB (conta gratuita necessária)

## Como Configurar

### 1. Obtenha a Chave da API TMDB

1. Crie uma conta no [TMDB](https://www.themoviedb.org/signup)
2. Solicite uma chave de API em [Configurações da API TMDB](https://www.themoviedb.org/settings/api)
3. Crie um arquivo `.env` na raiz do projeto:

```env
VUE_APP_TITLE=My App
VUE_APP_TMDB_API_KEY=sua_chave_aqui
VUE_APP_BASE_URL=https://api.themoviedb.org/3
NODE_ENV=production
VUE_APP_TITLE=My Staging App

Suba os containers: docker-compose up -d --build

Dentro do container, instale as dependências e inicie a aplicação: npm install && npm start

Acesse a aplicação: Abra seu navegador em http://localhost:8080
```