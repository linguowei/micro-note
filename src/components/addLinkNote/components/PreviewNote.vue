<template>
  <div class="previewNote">
    <Row class="tool-bar" style="text-align:center">
      <Col span="24">
        <h2 class="title">{{title}}</h2>   
      </Col>
    </Row>
    <Row class="tool-bar">
      <Col span="16">
        <label-name @nameChange="labelNameChange"></label-name>
      </Col>
      <Col span="8">
        <Button class="btnCustomizeHover" type="ghost" icon="android-list">保存</Button>   
        <Button class="btnCustomizeHover" type="ghost" icon="reply" @click="cancel">取消</Button>     
      </Col>
    </Row>
    <div class="preview-wrap" v-previewWrap v-html="content"></div>
  </div>
</template>

<script>
import labelName from '../../common/Label'
export default {
  name: 'previewNote',
  components: {
    labelName
  },
  data () {
    return {
      tagName: ''
    }
  },
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    cancel: function () {
      this.$emit('cancel')
    },
    labelNameChange: function (labelName) {
      console.log(labelName, 'pre')
    }
  },
  directives: {
    previewWrap: {
      bind: function (el) {
        const preList = el.querySelectorAll('pre')
        const imgList = el.querySelectorAll('img')
        const thList = el.querySelectorAll('th')
        const tdList = el.querySelectorAll('td')
        const tableList = el.querySelectorAll('table')
        preList.forEach((element) => {
          element.style.backgroundColor = '#eee'
          element.style.padding = '5px'
          element.style.maxWidth = '100%'
          element.style.overflow = 'auto'
        })
        imgList.forEach((element) => {
          element.style.maxWidth = '100%'
        })
        thList.forEach((element) => {
          element.style.border = '1px solid #E6E6E6'
          element.style.padding = '5px 8px'
        })
        tdList.forEach((element) => {
          element.style.border = '1px solid #E6E6E6'
          element.style.padding = '5px 8px'
        })
        tableList.forEach((element) => {
          element.style.borderCollapse = 'collapse'
        })
      }
    }
  }
}
</script>

<style scoped>
.previewNote{
  padding: 1rem;
}
.previewNote .editor-toolbar{
  border: none !important; 
  background-color: #ccc;
}
.previewNote > .CodeMirror{
  border: none !important;
  border-top: 1px solid #ddd;
}
.tool-bar{
  height: 32px;
  line-height: 32px;
  margin: 1vh 0;
}
.btnCustomizeHover{
  color: #80848f;
  border-color: #bbbec4;
  float: right;
  margin: 0 5px;
}
.btnCustomizeHover:hover{
  color: #50535a;
  border-color: #50535a;
}
.title{
  max-width: 100%;
  height: 32px;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis
}
.preview-wrap {
  height: 82vh;
  max-height: 82vh;
  overflow: auto;
  background-color: #fafafa;
  padding: 1vh;
  border-top: 1px solid #ececec;
}
.preview-wrap table th td{
  border: 1px solid #E6E6E6;
  padding: 5px 8px;
  word-break: normal;
}
</style>


