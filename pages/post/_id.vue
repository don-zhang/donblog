<template>
  <div class="post">
    <div class="back-button">
      <a-button @click="back">
        <a-icon type="left" />返回
      </a-button>
    </div>
    <div
      v-if="post.BACK_PICTURE"
      class="top-picture"
      :style="'background-image: url(' + post.BACK_PICTURE + ')'"
    >
      <div class="picture-source">图片来源必应(bing.com)</div>
    </div>
    <div class="abstract">
      <div class="title">{{post.TITLE}}</div>
      <div class="sub-title">
        <div class="date">
          <a-icon type="calendar" style="margin-right: 8px" />
          {{post.PUB_DATE}}
        </div>
        <div class="like">
          <a-icon type="like-o" style="margin-right: 8px" />
          {{post.LIKE_NUMBER}}
        </div>
      </div>
    </div>
    <no-ssr>
      <mavon-editor
        :value="post.FILE_CONTENT"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :editable="false"
        boxShadowStyle="none"
        :ishljs="true"
        :externalLink="externalLink"
      ></mavon-editor>
    </no-ssr>
    <div class="last">
      <div>无评论功能，如果文章对你有帮助，欢迎点赞支持</div>
      <a-button @click="like(post.ID)" style="margin-top: 15px;">
        <a-icon type="like" />点赞
      </a-button>
    </div>
    <div class="back-top">
      <a-back-top>
        <div class="ant-back-top-inner">
          <a-icon type="to-top" />
        </div>
      </a-back-top>
    </div>
  </div>
</template>

<script>
import { postDetailApi, likeApi } from '@/http/api/postApi'
export default {
  data() {
    return {
      //externalLink: false
      externalLink: {
        markdown_css: function() {
          // 这是你的markdown css文件路径
          return '/highlightjs/styles/monokai-sublime.min.css'
        },
        hljs_js: function() {
          // 这是你的hljs文件路径
          return '/highlightjs/highlight.min.js'
        },
        hljs_css: function() {
          // 这是你的代码高亮配色文件路径
          return '/highlightjs/styles/monokai-sublime.min.css'
        },
        hljs_lang: function(lang) {
          // 这是你的代码高亮语言解析路径
          return '/highlightjs/languages/' + lang + '.min.js'
        },
        katex_css: function() {
          // 这是你的katex配色方案路径路径
          return '/katex/katex.min.css'
        },
        katex_js: function() {
          // 这是你的katex.js路径
          return '/katex/katex.min.js'
        }
      }
    }
  },
  /**
   * 服务端获取首页数据，渲染后将结果页面直接发送至浏览器
   */
  async asyncData({ params, error, redirect }) {
    try {
      let res = await postDetailApi('?id=' + params.id)
      return {
        post: res.data
      }
    } catch (error) {
      redirect('/error/index')
    }
  },

  methods: {
    back() {
      window.history.back()
    },

    async like(id) {
      let res = await likeApi('?id=' + id)
      if (res.code === 100) {
        this.$message.success(res.data)
      } else {
        this.$message.error(res.data)
      }
    }
  }
}
</script>

<style scoped lang="less">
.post {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  .back-button {
    position: fixed;
    left: 5%;
    top: 68px;
    z-index: 2000;
  }
  .top-picture {
    width: 100%;
    height: 500px;
    background-size: cover;
    position: relative;
    .picture-source {
      position: absolute;
      z-index: 100;
      color: #ffffff;
      right: 3px;
      bottom: 3px;
      font-size: 12px;
      opacity: 0.6;
    }
  }
  .abstract {
    .title {
      font-size: 20px;
      font-weight: bold;
      margin: 30px 0;
    }
    .sub-title {
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .date {
        margin-right: 40px;
      }
    }
  }
  .last {
    font-size: 14px;
    color: #cccccc;
    margin-top: 60px;
  }
}
</style>