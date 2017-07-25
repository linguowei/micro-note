import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import AddNote from '@/components/addNote/AddNote'
// import Search from '@/components/search/Search'
// import AddLinkNote from '@/components/addLinkNote/AddLinkNote'
// import Index from '@/components/index/Index'

const Home = resolve => require(['@/components/Home'], resolve)
const AddNote = resolve => require(['@/components/addNote/AddNote'], resolve)
const Search = resolve => require(['@/components/search/Search'], resolve)
const AddLinkNote = resolve => require(['@/components/addLinkNote/AddLinkNote'], resolve)
const Index = resolve => require(['@/components/index/Index'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: { name: 'index' },
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
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
