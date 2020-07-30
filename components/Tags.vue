<template>
  <div class="top-nav">
    <div class="post-tag"
      @click="clickTag(tag.ID)"
      v-for="tag in tags"
      :key="tag.ID">
      <label>{{tag.TAG_NAME}}</label>
      <div class="post-tag__number">{{tag.POST_NUMBER}}</div>
    </div>
  </div>
</template>

<script>
import { tagSortApi } from '@/http/api/postApi'
export default {
  props: {
    tags: {
      type: Array,
      default: [],
    },
  },

  methods: {
    /**
     * 点击分类标签
     */
    async clickTag(id) {
      let result = await tagSortApi(`?id=` + id)
      this.$emit('update', result.data)
    },
  },
}
</script>

<style lang="less">
.top-nav {
  .post-tag {
    min-width: 120px;
    margin: 10px 0px 10px 10px;
    background: #545252;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    label {
      cursor: pointer;
      color: #ffffff;
      font-weight: bold;
      text-shadow: 4px 4px 3px #383838;
    }
    &:hover {
      background-color: #383838;
    }
    .post-tag__number {
      position: absolute;
      top: 7px;
      right: 10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #000000;
      text-align: center;
      line-height: 20px;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>