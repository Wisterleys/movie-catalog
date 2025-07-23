import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Font Awesome Core
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ícones que você usará
import {
  faHeart,
  faArrowLeft,
  faStar,
  faClock,
  faCalendarDay,
  faFileLines,
  faFilm,
  faUsers,
  faClapperboard,
  faLink,
  faHeartCirclePlus,
  faArrowUpRightFromSquare,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'

// Estilos principais
import './assets/styles/main.css'

// Adiciona os ícones à biblioteca
library.add(
  faHeart,
  faArrowLeft,
  faStar,
  faClock,
  faCalendarDay,
  faFileLines,
  faFilm,
  faUsers,
  faClapperboard,
  faLink,
  faHeartCirclePlus,
  faArrowUpRightFromSquare,
  faMagnifyingGlass
)

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
