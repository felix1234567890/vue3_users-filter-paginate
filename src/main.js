import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import "./style.scss";
store.dispatch("loadUsers");

const app = createApp(App);
app.use(store).mount("#app");
