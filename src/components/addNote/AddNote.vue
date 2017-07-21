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
      <Col span="5" offset="11">
        <Button class="btnCustomizeHover" type="ghost" icon="android-list">确认</Button>   
        <Button class="btnCustomizeHover" type="ghost" icon="reply">取消</Button>     
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
      autofocus: true,
      autosave: true,
      toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'code', 'quote', 'unordered-list', 'ordered-list', 'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview', 'side-by-side', 'fullscreen', '|', 'guide'],
      styleSelectedText: false
    })
    smde.value(smde.markdown('### h3 ```function(){}```'))
    smde.codemirror.on('change', () => {
      const value = smde.value()
      console.log(value)
    })
    smde.togglePreview()
  },
  methods: {
    selectTag: function (a) {
      console.log(a)
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
.addNote{
  padding: 1rem;
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


