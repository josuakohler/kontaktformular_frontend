import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import KontaktForm from "./components/KontaktForm.vue";
const app = createApp(App);
app.component("kontakt-form-comp", KontaktForm);
app.mount("#app");
