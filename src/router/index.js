import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {
  Auth
} from '@/services'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    needsUser: true
  },
}, {
  path: '/knjige',
  name: 'knjige',
  meta: {
    needsUser: true
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import( /* webpackChunkName: "about" */ '../views/KnjigeView.vue')
}, {
  path: '/liste',
  name: 'liste',
  meta: {
    needsUser: true
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import( /* webpackChunkName: "about" */ '../views/ListeView.vue')
}, {
  path: '/login',
  name: 'login',
  meta: {
    needsUser: false
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import( /* webpackChunkName: "about" */ '../views/LoginView.vue')
}, {
  path: '/upload',
  name: 'upload',
  meta: {
    needsUser: true
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import( /* webpackChunkName: "about" */ '../views/UploadView.vue')
}, {
  path: '/knjige/:id',
  name: 'knjiga',
  meta: {
    needsUser: true
  },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import( /* webpackChunkName: "about" */ '../views/KnjigaDetailView.vue')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const needsUser = to.meta.needsUser;
  const user = Auth.getAuth();
  console.log(user)
  console.log("from: ", from.name, "-> to: ", to.name, "needsUser: ", needsUser, "currentUser: ", !!user);

  console.log("to: ", !!!to.name, "from: ", !!from.name)

  if (!user) {
    console.log("Nouser")
    if (needsUser) {
      console.log("Prvi if")
      next("/login")
      return
    } else if (!!!to.name) {
      console.log("Drugi if")
      next("/login")
      return
    }
  }

  if (user) {
    console.log("Yesuser")
    if (!needsUser || from.path == "/login") {
      console.log("Treći if")
      next("/")
      return
    } else if (!!!to.name) {
      console.log("Četvrti if")
      next("/")
      return
    }
  }
  console.log("Zadnje")
  next()
})

export default router