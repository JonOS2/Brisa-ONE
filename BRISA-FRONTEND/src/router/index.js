import { createRouter, createWebHistory } from 'vue-router';
import { authService } from '@/services/authService';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import PeopleView from '@/views/PeopleView.vue';
import PersonDetailsView from '@/views/PersonDetailsView.vue';
import ProgramsView from '@/views/ProgramsView.vue';
import ProgramDetailsView from '@/views/ProgramDetailsView.vue';
import ClassDetailsView from '@/views/ClassDetailsView.vue';
import StageDetailsView from '@/views/StageDetailsView.vue';
import InstitutionsView from '@/views/InstitutionsView.vue';
import LogsView from '@/views/LogsView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/people',
    name: 'People',
    component: PeopleView,
    meta: { requiresAuth: true }
  },
  {
    path: '/people/:id',
    name: 'PersonDetails',
    component: PersonDetailsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/institutions',
    name: 'Institutions',
    component: InstitutionsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/programs',
    name: 'Programs',
    component: ProgramsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/programs/:id',
    name: 'ProgramDetails',
    component: ProgramDetailsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/programs/:programId/classes/:classId',
    name: 'ClassDetails',
    component: ClassDetailsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/programs/:programId/classes/:classId/stages/:stageId',
    name: 'StageDetails',
    component: StageDetailsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: LogsView,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guard de navegação para proteger rotas que requerem autenticação
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next('/');
  } else if (to.path === '/' && authService.isAuthenticated()) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
