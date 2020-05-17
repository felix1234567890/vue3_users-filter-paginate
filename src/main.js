import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import './style.scss';

store.dispatch('loadUsers');

createApp(App)
  .use(store)
  .mount('#app');
