<template>
  <div class="Home">
    <ul class="left-menu" v-if="$route.path !== '/index'">
      <li class="logo">
        <router-link :to="{ path: '/' }">
          <img width="40" src="../assets/logo.svg">
        </router-link>
      </li>
      <!-- <li class="menu-item">
        <Poptip placement="right" width="200" trigger="click" v-model="isShowAddPoptip">
          <Icon size="35" color="#80848f" type="ios-plus-outline"></Icon>
          <div class="api" slot="content">
            <Button-group vertical>
              <Button type="ghost" class="btnCustomizeHover" icon="network" @click="linkNote">输入链接生成笔记</Button>
              <Button type="ghost" class="btnCustomizeHover" icon="android-create" @click="addNote">手动输入新建笔记</Button>
            </Button-group>
          </div>
        </Poptip>
      </li> -->
      <li class="menu-item" @click="addNote">
        <Icon size="35" color="#80848f" type="android-create"></Icon>
      </li>
      <li class="menu-item" @click="linkNote">
        <Icon size="35" color="#80848f" type="usb"></Icon>
      </li>
      <li class="menu-item" @click="search">
        <Icon size="35" color="#80848f" type="ios-search-strong"></Icon>
      </li>
      <li class="menu-item">
        <Icon size="35" color="#80848f" type="android-list"></Icon>
      </li>
      <li class="menu-item">
        <Icon size="35" color="#80848f" type="android-bookmark"></Icon>
      </li>
      <li class="menu-item-github">
        <Icon size="35" color="#80848f" type="social-github"></Icon>
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
      isShowAddPoptip: false
    }
  },
  methods: {
    addNote: function () {
      this.isShowAddPoptip = false
      this.$router.push({ path: 'addNote' })
    },
    linkNote: function () {
      this.isShowAddPoptip = false
      this.$router.push({ path: 'addLinkNote' })
    },
    search: function () {
      this.$router.push({ path: 'search' })
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
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
