import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

import Card from 'primevue/card';
import Button from 'primevue/button';

import App from './App.vue';
import router from './router';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('Card', Card);
app.component('Button', Button);

app.use(router).mount('#app');
