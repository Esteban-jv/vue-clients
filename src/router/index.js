import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listado-clientes',
      component: Inicio,
      props: { title: 'Listado de Clientes' }
    },
    {
      path: '/add-client',
      name: 'add-client',
      component: () => import('../views/NuevoClienteView.vue'), //Con el callback no lo carga al inicio sino al entrar a la ruta
      props: { title: 'Agregar cliente' }
    },
    {
      path: '/edit-client/:id',
      name: 'edit-client',
      component: () => import('../views/EditarClienteView.vue'), //Con el callback no lo carga al inicio sino al entrar a la ruta
      props: { title: 'Editar cliente' }
    },
  ]
})

export default router
