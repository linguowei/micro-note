<template>
  <div class="addLinkNote">
    <input class="search-input" v-model="value1" placeholder="请输入URL来生成笔记" autofocus="autofocus"></input>
    <div class="note-name">
      目前暂不支持JS动态生成的网页
    </div>
  </div>  
</template>

<script>
export default {
  name: 'addLinkNote',
  data () {
    return {
      value1: ''
    }
  },
  mounted () {
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
.addLinkNote{
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
  font-size: 13px;
}
</style>



