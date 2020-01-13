<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在/Page not found</h1>
    <h1 v-else>页面请求错误/An error occurred</h1>
    <nuxt-link to="/">返回首页/Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>