<template>
  <div class="addLinkNote">
    <transition name="fade">
      <Row class="input-wrap" v-if="isShowInputWrap">
        <Col span="24">
          <input class="search-input" v-model="link" placeholder="请输入URL并回车来生成笔记" autofocus="autofocus" @keydown="generateNote($event)"></input>
        </Col>
        <Col span="24">
          <div class="note-name">
            注：暂不支持JS动态生成的网页
          </div>
        </Col>
      </Row>
      <preview-note v-if="isShowPreview" :title="preTitle" :content="preContent" @cancel="cancel"></preview-note>
    </transition>
  </div>  
</template>

<script>
import previewNote from './components/PreviewNote'
export default {
  name: 'addLinkNote',
  data () {
    return {
      link: '',
      isShowInputWrap: true,
      isShowPreview: false,
      preTitle: '',
      preContent: ''
    }
  },
  mounted () {
  },
  methods: {
    generateNote: function (e) {
      if (e.keyCode === 13) {
        this.$Loading.start()
        this.$http.post('/api/generateNote', {
          link: this.link
        }).then((res) => {
          if (res.status === 200) {
            this.preTitle = res.data.title
            this.preContent = res.data.content
            this.isShowInputWrap = false
            this.isShowPreview = true
            this.$Loading.finish()
          }
        })
      }
    },
    cancel: function () {
      this.isShowInputWrap = true
      this.isShowPreview = false
    }
  },
  components: {
    previewNote
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
  padding: 1vh 8vh 30vh 8vh;
}
.input-wrap{
  height:52px;
  line-height:52px;
  margin-top: 19vh;
}
.search-input{
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  margin-bottom: 3vh;
  border: none;
  color: #ccc;
  height: 52px;
  width: 100%;
  overflow-x: scroll;
  font-size: 40px;
  outline: none;
}
.note-name{
  border-bottom: 1px solid #ececec;
  padding-bottom: 3vh;
  font-size: 13px;
}
</style>



