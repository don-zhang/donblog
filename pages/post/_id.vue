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
  /**
   * 服务端获取首页数据，渲染后将结果页面直接发送至浏览器
   */
  async asyncData({ params }) {
    let res = await postDetailApi('?id=' + params.id)
    return {
      post: res.data
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
    left: 300px;
    top: 68px;
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
      height: 80px;
      line-height: 80px;
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