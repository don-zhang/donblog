<template>
  <div class="article">
    <div class="back-button">
      <button @click="back">
        <i class="iconfont icon-zhuanhuidao"></i>
      </button>
    </div>
    <div v-if="post.BACK_PICTURE"
      class="top-picture"
      :style="'background-image: url(' + post.BACK_PICTURE + ')'">
      <div class="picture-source">图片来源必应(bing.com)</div>
    </div>
    <div class="abstract">
      <div class="title">{{post.TITLE}}</div>
      <div class="sub-title">
        <div class="date">
          <i class="iconfont icon-riqi"></i>
          {{post.PUB_DATE}}
        </div>
        <div class="view">
          <i class="iconfont icon-chakan"></i>
          {{post.VIEW_NUMBER}}
        </div>
        <div class="like">
          <i class="iconfont icon-dianzan"></i>
          {{post.LIKE_NUMBER}}
        </div>
      </div>
    </div>
    <div class="main-content"
      v-html="post.html"
      v-highlight></div>
    <div class="last">
      <div>无评论功能，如果文章对你有帮助，欢迎点赞支持</div>
      <button @click="like(post.ID)"
        style="margin-top: 15px;">
        <i class="iconfont icon-dianzan"></i>点赞
      </button>
    </div>
    <div class="image-model"
      id="imageModel"
      @click="hideImageModel">
    </div>
  </div>
</template>

<script>
import { postDetailApi, likeApi } from '@/http/api/postApi'
export default {
  /**
   * 服务端获取首页数据，渲染后将结果页面直接发送至浏览器
   */
  async asyncData({ params, error, redirect }) {
    try {
      let res = await postDetailApi('?id=' + params.id)
      return {
        post: res.data,
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
    },

    hideImageModel() {
      document.getElementById('imageModel').style = 'display: none;'
    },
  },
}
</script>

<style lang="less">
.main-content {
  padding: 0 20px;
  img {
    width: 100%;
    cursor: pointer;
  }
}
.article {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
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
      div {
        margin-right: 40px;
        i {
          margin-right: 20px;
        }
      }
    }
  }
  .last {
    font-size: 14px;
    color: #cccccc;
    margin-top: 60px;
  }
  .image-model {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(29, 29, 29, 0.6);
    z-index: 99999;
    text-align: center;
    overflow: auto;
    img {
      margin: 20% auto;
    }
  }
}
</style>