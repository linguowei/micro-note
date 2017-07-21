<template>
  <div class="search">
    <input class="search-input" v-model="value1" placeholder="搜索笔记" autofocus="autofocus"></input>
    <div class="note-name">
      在
      <a>我的笔记</a>
      中搜索
    </div>
  </div>  
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      value1: ''
    }
  }
}
</script>

<style scoped>
::-webkit-input-placeholder { /* WebKit browsers */  
  color: #ececec;  
}  
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
  color: #ececec;  
  opacity: 1;  
}  
::-moz-placeholder { /* Mozilla Firefox 19+ */  
  color: #ececec;  
  opacity: 1;  
}  
:-ms-input-placeholder { /* Internet Explorer 10+ */  
  color: #ececec;  
}
.search{
  height: 100vh;
  padding: 20vh 8vh 30vh 8vh;
}
.search-input{
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  margin-bottom: 3vh;
  border: none;
  color: #ccc;
  height: 52px;
  width: 84vh;
  font-size: 40px;
  outline: none;
}
.note-name{
  border-bottom: 1px solid #ececec;
  padding-bottom: 3vh;
}
</style>


