<template>
  <div class="main-page">
    <div class="post-list">
      <div class="post-title">
        文章列表
        <div class="post-title-line"></div>
      </div>
      <div class="post-item"
        v-for="item in posts"
        :key="item.ID">
        <div class="back-img">
          <img v-if="item.BACK_PICTURE"
            :src="item.BACK_PICTURE" />
        </div>
        <div class="title">
          <nuxt-link no-prefetch
            :to="'/post/' + item.ID"
            class="post-item-title">{{item.TITLE}}</nuxt-link>
        </div>
        <div class="description">{{item.DESCRIPTION}}</div>
        <div class="tip-bar">
          <div class="date"><i class="iconfont icon-riqi"></i>{{item.PUB_DATE}}</div>
          <div class="view"><i class="iconfont icon-chakan"></i>{{item.VIEW_NUMBER}}</div>
          <div class="like"><i class="iconfont icon-dianzan"></i>{{item.LIKE_NUMBER}}</div>
        </div>
      </div>
    </div>
    <tags @update="updatePost"
      :tags="tags"></tags>
  </div>
</template>

<script>
import { tagsApi, postApi, tagSortApi } from '@/http/api/postApi'
import Tags from '@/components/Tags'
export default {
  components: {
    Tags,
  },
  data() {
    return {
      loading: false,
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 10,
      },
    }
  },
  /**
   * 服务端获取首页数据，渲染后将结果页面直接发送至浏览器
   */
  async asyncData() {
    let [tags, items] = await Promise.all([tagsApi(), postApi()])
    return {
      tags: tags.data,
      posts: items.data,
    }
  },

  methods: {
    updatePost(data) {
      this.posts = data
    },
  },
}
</script>

<style lang="less">
.main-page {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.post-list {
  background: #ffffff;
  max-width: 780px;
  border-radius: 8px;
  .post-title {
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    border-left: 3px;
    word-spacing: 1px;
    padding-left: 15px;
    .post-title-line {
      position: absolute;
      left: 30px;
      bottom: 10px;
      width: 60px;
      height: 1px;
      background-color: #d9d9d99e;
      border-radius: 8px;
      box-shadow: -3px -3px 6px 4px #d9d9d9;
    }
  }
  .post-item {
    padding: 16px 15px;
    border-bottom: 1px solid #f5f5f5;
    &:hover {
      background-color: rgba(230, 230, 230, 0.8);
    }
    .back-img {
      img {
        width: 100%;
        height: 350px;
        border-radius: 6px;
      }
    }
    .title {
      height: 60px;
      line-height: 60px;
      a {
        color: #000000;
        font-size: 24px;
        text-decoration: unset;
      }
      &:hover {
        text-decoration: underline;
      }
    }
    .tip-bar {
      display: flex;
      justify-content: flex-start;
      height: 50px;
      align-items: center;
      div {
        margin-right: 40px;
      }
      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
