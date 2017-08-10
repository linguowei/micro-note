import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/components/Home'], resolve)
const AddNote = resolve => require(['@/components/addNote/AddNote'], resolve)
const Search = resolve => require(['@/components/search/Search'], resolve)
const AddLinkNote = resolve => require(['@/components/addLinkNote/AddLinkNote'], resolve)
const Index = resolve => require(['@/components/index/Index'], resolve)
const NoteList = resolve => require(['@/components/noteList/NoteList'], resolve)
const NoteBook = resolve => require(['@/components/noteBook/NoteBook'], resolve)
const Tag = resolve => require(['@/components/tag/Tag'], resolve)

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
        },
        {
          path: '/noteList',
          name: 'noteList',
          component: NoteList
        },
        {
          path: '/noteBook',
          name: 'noteBook',
          component: NoteBook
        },
        {
          path: '/tag',
          name: 'tag',
          component: Tag
        }
      ]
    }
  ]
})
