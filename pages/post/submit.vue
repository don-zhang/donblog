<template>
  <div class="mavon-editor">
    <a-alert :message="warningMsg.join(', ')" banner v-show="warningControl" />
    <div class="info title">
      <label>标题</label>
      <a-input v-model="title" maxlength="255" />
    </div>
    <div class="info date">
      <label>日期</label>
      <a-date-picker
        placeholder="选择日期"
        v-model="date"
        format="YYYY-MM-DD"
        mode="date"
        :allowClear="false"
      />
    </div>
    <div class="info description">
      <label>描述</label>
      <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" v-model="description" maxlength="255" />
    </div>
    <no-ssr>
      <div class="info">
        <label>内容</label>/*markdown编辑器*/
      </div>
      <mavon-editor ref=md :toolbars="markdownOptions" v-model="content" @imgAdd="$imgAdd" @imgDel="$imgDel"/>
    </no-ssr>
    <div class="info tag">
      <label>分类标签</label>
      <a-select
        style="width: 120px"
        :defaultValue="{key: tags.length > 0 ? tags[0].ID : 0, label: tags.length > 0 ? tags[0].TAG_NAME : ''}"
        :labelInValue="true"
        @change="tagChange"
      >
        <a-select-option :value="item.ID" v-for="(item, idx) in tags" :key="idx">{{item.TAG_NAME}}</a-select-option>
        <a-select-option value="0">+新建</a-select-option>
      </a-select>
      <a-input
        v-show="newTagControl"
        placeholder="新标签名称"
        style="width: 240px; margin-left: 20px"
        v-model="tagName"
      />
    </div>
    <div class="info backpic">
      <label>背景图片</label>
      <a-input placeholder="http://..." v-model="backPicture" maxlength="255" />
    </div>
    <div class="submit">
      <a-button type="primary" :loading="false" @click="checkInput">提交</a-button>
    </div>
    <a-modal title="请输入安全码" centered v-model="modalVisible" @ok="submit">
      <div class="secure-code">
        <a-input v-model="secureCode" type="password" maxlength="255" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { tagsApi, submitPostApi, addImgApi, delImgApij } from '@/http/api/postApi'
import moment from 'moment'
import md5 from 'md5'
export default {
  data() {
    return {
      title: '',
      date: null,
      description: '',
      content: '',
      backPicture: '',
      newTagControl: false,
      warningControl: false,
      warningMsg: [],
      markdownOptions: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      modalVisible: false,
      secureCode: ''
    }
  },
  /**
   * 服务端获取首页数据，渲染后将结果页面直接发送至浏览器
   */
  async asyncData({redirect}) {
    try {
      let res = await tagsApi()
      let tagId = res.data.length > 0 ? res.data[0].ID : 0
      let tagName = res.data.length > 0 ? res.data[0].TAG_NAME : ''
      return {
        tagId: tagId,
        tagName: tagName,
        tags: res.data
      }
    } catch (error) {
      redirect('/error/index')
    }
  },

  mounted() {
    this.date = moment(new Date(), 'YYYY-MM-DD')
  },

  methods: {
    moment,
    /**
     * 上传图片
     */
    $imgAdd(pos, $file){
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('img', $file)
      addImgApi(formdata).then((res) => {
        this.$refs.md.$img2Url(pos, res.data)
      })
    },
    /**
     * 删除图片
     */
    $imgDel($fileName) {
      let filepath = $fileName[0]
      delImgApi({filepath: filepath}).then(res => {
        console.dir(res)
      })
    },
    /**
     * 选择类别标签
     */
    tagChange(val) {
      if (val.key == '0') {
        this.newTagControl = true
        this.tagId = '0'
        this.tagName = ''
      } else {
        this.newTagControl = false
        this.tagId = val.key
        this.tagName = val.label
      }
    },
    /**
     * 检查输入是否合法
     */
    checkInput() {
      this.warningMsg = []
      if (this.title == '') {
        this.warningMsg.push('[请输入标题]')
      }
      if (!this.date) {
        this.warningMsg.push('[请输入日期]')
      }
      if (this.content == '') {
        this.warningMsg.push('[请输入内容]')
      }
      if (this.tagName == '') {
        this.warningMsg.push('[请输入分类标签]')
      }
      if (this.warningMsg.length > 0) {
        this.warningControl = true
        return
      }
      this.modalVisible = true
    },
    /**
     * 发布文章
     */
    async submit() {
      if (!this.secureCode) {
        this.$message.warning('请输入安全码')
        return
      }
      let res = await submitPostApi({
        title: this.title,
        date: this.date.format('YYYY-MM-DD'),
        description: this.description,
        content: this.content,
        tagId: this.tagId,
        tagName: this.tagName,
        backPicture: this.backPicture,
        secureCode: md5(this.secureCode)
      })
      if (res && res.code === 100) {
        this.modalVisible = false
        this.$message.success('发布成功!')
        this.reset()
      } else {
        this.$message.error(res.data)
      }
    },
    /**
     * 重置编辑框内容
     */
    reset() {
      this.title = ''
      this.date = moment(new Date(), 'YYYY-MM-DD')
      this.description = ''
      this.content = ''
      this.backPicture = ''
      this.tagId = this.tags.length > 0 ? this.tags[0].ID : null
      this.tagName = this.tags.length > 0 ? this.tags[0].TAG_NAME : ''
    }
  }
}
</script>

<style scoped lang="less">
.mavon-editor {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 48px;
  background: #ffffff;
  .info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 20px;
    label {
      font-size: 18px;
      font-weight: bold;
      margin-right: 20px;
      min-width: 100px;
      text-shadow: 5px 5px 4px #bfbfbf;
    }
  }
  .v-note-wrapper {
    z-index: 10;
    min-height: 600px;
    margin: 0 20px;
  }
  .submit {
    position: fixed;
    right: 50px;
    bottom: 30px;
    z-index: 99;
  }
}
</style>