<template>
  <div>
    <div class="top-nav">
      <a-badge :count="tag.POST_NUMBER" v-for="(tag, index) in tags" :key="index" class="nav-point">
        <div class="post-tag" @click="clickTag(tag.ID)">{{tag.TAG_NAME}}</div>
      </a-badge>
    </div>
    <div class="post-list">
      <div class="post-title">
        文章列表
        <div class="post-title-line"></div>
      </div>
      <a-list
        itemLayout="vertical"
        size="large"
        :pagination="pagination"
        :dataSource="posts"
        :split="false"
      >
        <a-list-item slot="renderItem" slot-scope="item" key="item.TITLE" class="post-item">
          <template slot="actions">
            <div>
              <a-icon type="like-o" style="margin-right: 8px" />
              {{item.LIKE_NUMBER}}
            </div>
          </template>
          <img
            v-if="item.BACK_PICTURE"
            slot="extra"
            width="272"
            alt="logo"
            :src="item.BACK_PICTURE"
          />
          <a-skeleton active :loading="loading">
            <a-list-item-meta>
              <nuxt-link
                slot="title"
                :to="'/post/' + item.ID"
                class="post-item-title"
              >{{item.TITLE}}</nuxt-link>
              <template slot="description">
                <a-icon type="calendar" style="margin-right: 8px" />
                {{item.PUB_DATE}}
              </template>
            </a-list-item-meta>
          </a-skeleton>
          <div v-html="item.DESCRIPTION"></div>
        </a-list-item>
        <div slot="footer">
          总数：
          <b>{{posts.length}}</b>
        </div>
      </a-list>
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
import { tagsApi, postApi, tagSortApi } from '@/http/api/postApi'
export default {
  data() {
    return {
      loading: false,
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 10
      }
    }
  },
  /**
   * 服务端获取首页数据，渲染后将结果页面直接发送至浏览器
   */
  async asyncData() {
    let [tags, items] = await Promise.all([tagsApi(), postApi()])
    return {
      tags: tags.data,
      posts: items.data
    }
  },

  methods: {
    /**
     * 点击分类标签
     */
    async clickTag(id) {
      this.loading = true
      let result = await tagSortApi(`?id=` + id)
      this.loading = false
      this.posts = result.data
    }
  }
}
</script>

<style lang="less">
.top-nav {
  .nav-point {
    min-width: 200px;
    margin: 10px 20px 10px 0;
    .post-tag {
      background: #c2b9da;
      height: 36px;
      line-height: 36px;
      padding: 0 10px;
      cursor: pointer;
      color: #ffffff;
      border-radius: 5px;
      font-weight: bold;
      text-shadow: 4px 4px 3px #383838;
      &:hover {
        background-color: rgba(242, 237, 255, 0.75);
      }
    }
    sup {
      background-color: rgb(255, 255, 255);
      color: rgb(153, 153, 153);
      box-shadow: rgb(217, 217, 217) 0px 0px 0px 1px inset;
    }
  }
}
.post-list {
  .post-title {
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    border-left: 3px;
    word-spacing: 1px;
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
      background-color: rgba(242, 237, 255, 0.75);
    }
    .post-item-title {
      font-size: 18px;
      font-weight: bold;
      word-spacing: 2px;
    }
  }
}
</style>
