<template>
  <div class="Home">
    <ul class="left-menu" v-if="$route.path !== '/index'">
      <li class="logo">
        <router-link :to="{ path: '/' }">
          <img width="40" src="../assets/logo.svg">
        </router-link>
      </li>
      <li class="menu-item" v-for="(item,index) in menuList" :key="index" @click="switchRouting(item)">
        <Icon size="35" color="#80848f" :type="item.iconType"></Icon>
      </li>
    </ul>
    <div class="content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [
        {routingName: 'addNote', iconType: 'android-create'},
        {routingName: 'addLinkNote', iconType: 'usb'},
        {routingName: 'search', iconType: 'ios-search-strong'},
        {routingName: 'noteList', iconType: 'android-list'},
        {routingName: 'noteBook', iconType: 'ios-book'},
        {routingName: 'tag', iconType: 'ios-pricetags'},
        {routingName: 'github', iconType: 'social-github'}
      ]
    }
  },
  methods: {
    switchRouting: function (data) {
      if (data.routingName === 'github') {
        window.open('https://github.com/linguowei/micro-note')
        return
      }
      this.$router.push({ path: data.routingName })
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to {
  opacity: 0
} 
.left-menu{
  width: 72px;
  border-right: 1px solid #ececec;
  height: 100vh;
  float: left;
  padding: 12px;
}
.left-menu > .logo{
  border-bottom: 1px solid #ececec;
  padding-bottom: 12px;
  text-align: center;
}
.left-menu > .menu-item{
  text-align: center;
  padding: 25px 0;
  cursor: pointer;
}
.left-menu > .menu-item-github{
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 22px;
  cursor: pointer;
}
.content{
  margin-left: 73px;
}
.btnCustomizeHover{
  color: #80848f;
  border-color: #bbbec4;
}
.btnCustomizeHover:hover{
  color: #50535a;
  border-color: #50535a;
}
</style>
