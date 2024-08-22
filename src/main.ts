import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import KontaktForm from "./components/KontaktForm.vue";
import { createPinia } from "pinia";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});
const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.component("kontakt-form-comp", KontaktForm);
app.use(pinia);
app.mount("#app");
