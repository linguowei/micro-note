<template>
  <div class="label">
    <Dropdown :visible="isShowDropdown" trigger="custom" @on-click="dropdownSelect" style="margin-left:20px;float:left;">
      <a href="javascript:void(0)" style="font-size:13px;color:#80848f" @click="isShowDropdown=!isShowDropdown">
        添加标签
        <Icon type="arrow-down-b"></Icon>
      </a>
      <Dropdown-menu slot="list" class="menu-wrap">
        <Dropdown-item v-if="isShowInputLabelName">
          <Input v-model="labelName.name" placeholder="labelName" @on-enter="labelNameEnter"></Input>
        </Dropdown-item>
        <Dropdown-item>
          <Button type="ghost" style="width:100%;" @click="isShowInputLabelName=!isShowInputLabelName">
            <span v-if="!isShowInputLabelName">新增标签名</span>
            <span v-if="isShowInputLabelName">取消</span>
          </Button>
        </Dropdown-item>
        <Dropdown-item v-for="(item,index) in labelList" :key="index" :name="item.name">{{item.name}}</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
    <div class="tag-wrap">
      <Tag type="border" closable v-for="(item,index) in tagList" :key="index" @on-close="tagClose(index,item)">{{item}}</Tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'label',
  data () {
    return {
      labelList: [
        {name: 'css'},
        {name: 'javascript'},
        {name: 'node'},
        {name: 'vue'}
      ],
      isShowDropdown: false,
      isShowInputLabelName: false,
      labelName: {
        name: ''
      },
      tagList: []
    }
  },
  methods: {
    labelNameEnter: function (e) {
      this.labelList.push(Object.assign({}, this.labelName))
      this.isShowInputLabelName = false
      this.labelName.name = ''
    },
    dropdownSelect: function (name) {
      if (name !== undefined) {
        this.tagList.push(name)
        this.$emit('nameChange', name)
        this.isShowDropdown = false
      }
    },
    tagClose: function (index, name) {
      this.tagList.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.menu-wrap{
  padding: 6px;
  height: 300px;
  max-height: 300px;
  overflow: auto;
  width: 200px;
}
.tag-wrap{
  float: left;
  margin-left: 15px;
}
</style>



