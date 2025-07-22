import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faHeart);
const app = createApp(App)

app.use(router)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.$filters = {
  formatDate(dateString) {
    if (!dateString) {
      return 'Data desconhecida';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }
}
app.mount('#app')