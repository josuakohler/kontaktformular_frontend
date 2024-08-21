import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import KontaktForm from './components/KontaktForm.vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);
app.component('kontakt-form-comp', KontaktForm);
app.use(pinia);
app.mount('#app');