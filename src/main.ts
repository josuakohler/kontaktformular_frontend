import { createApp } from "vue";
import "./style.css";
import App from "./vues/App.vue";
import KontaktForm from "./components/KontaktForm.vue";
import { createPinia } from "pinia";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import LogIn from "./components/LogIn.vue";
import router from "./router";
import Home from "./components/Home.vue";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.component("home-comp", Home)
app.component("kontakt-form-comp", KontaktForm);
app.component("log-in-comp", LogIn);
app.use(pinia);
app.mount("#app");
