import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddNote from '@/components/addNote/AddNote'
import Search from '@/components/search/Search'
import AddLinkNote from '@/components/addLinkNote/AddLinkNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/addNote',
          name: 'addNote',
          component: AddNote
        },
        {
          path: '/addLinkNote',
          name: 'addLinkNote',
          component: AddLinkNote
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        }
      ]
    }
  ]
})
