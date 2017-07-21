<template>
  <div class="addNote">
    <Row class="tool-bar">
      <Col span="8">
        <Dropdown trigger="click" style="margin-left: 20px" @on-click="selectTag">
          <a href="javascript:void(0)" style="font-size:13px;color:#80848f">
            添加标签
            <Icon type="arrow-down-b"></Icon>
          </a>
          <span>{{tagName}}</span>
          <Dropdown-menu slot="list">
            <Dropdown-item name="驴打滚">驴打滚</Dropdown-item>
            <Dropdown-item>炸酱面</Dropdown-item>
            <Dropdown-item>豆汁儿</Dropdown-item>
            <Dropdown-item>冰糖葫芦</Dropdown-item>
            <Dropdown-item>北京烤鸭</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </Col>
      <Col span="8">
        <input class="note-title" placeholder="请输入笔记标题" autofocus="autofocus"></input>
      </Col>
      <Col span="8">
        <Button class="btnCustomizeHover" type="ghost" icon="android-list">保存</Button>   
        <Button class="btnCustomizeHover" type="ghost" icon="reply" @click="cacel">取消</Button>     
      </Col>
    </Row>
    <div v-markdownContentHeight>
      <textarea ref="markdown"></textarea>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import '../../assets/simplemde.min.css'
export default {
  name: 'addNote',
  data () {
    return {
      tagName: ''
    }
  },
  mounted () {
    const smde = new SimpleMDE({
      element: this.$refs.markdown,
      autofocus: false,
      autosave: true,
      toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'code', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', '|', 'guide'],
      styleSelectedText: false
    })
    smde.value()
    smde.codemirror.on('change', () => {
      const value = smde.value()
      console.log(value)
    })
    // smde.togglePreview()
  },
  methods: {
    selectTag: function (a) {
      console.log(a)
    },
    cacel: function () {
      this.$router.go(-1)
    }
  },
  directives: {
    markdownContentHeight: {
      bind: function (el) {
        setTimeout(() => {
          const codeMirror = el.querySelector('.CodeMirror')
          codeMirror.style.height = window.innerHeight - 115 + 'px'
          codeMirror.style.maxHeight = window.innerHeight - 115 + 'px'
          codeMirror.style.overflow = 'auto'
        }, 500)
      }
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
.addNote{
  padding: 1rem;
  margin: 0 8vh;
}
.addNote .note-title{
  background-color: transparent;
  border: none;
  color: #ccc;
  height: 24px;
  width: 100%;
  overflow-x: scroll;
  font-size: 24px;
  outline: none;
}
.addNote .editor-toolbar{
  border: none !important; 
  background-color: #ccc;
}
.addNote > .CodeMirror{
  border: none !important;
  border-top: 1px solid #ddd;
}
.tool-bar{
  height: 32px;
  line-height: 32px;
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
</style>


