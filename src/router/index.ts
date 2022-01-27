import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import RouteNames from '@/constants/route-names';
import Home from '../views/home.vue';
import personVue from '../views/person.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: RouteNames.Home,
    component: Home,
  },
  {
    path: '/person',
    name: RouteNames.Person,
    component: personVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
