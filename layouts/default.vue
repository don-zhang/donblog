<template>
  <div class="donblog">
    <div class="top-header">
      <logo></logo>
    </div>
    <div class="container">
      <nuxt />
    </div>
    <layout-footer></layout-footer>
    <div class="back-to-top">
      <button><i class="iconfont icon-fanhuijiantou-copy"></i></button>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import LayoutFooter from '@/components/Footer'
export default {
  components: {
    Logo,
    LayoutFooter,
  },
}
</script>
<style lang="less">
html,
body {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #f5f5f5;
}
.header {
  background-color: #cccccc;
  height: 60px;
  width: 100%;
}
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 99997;
  background: #fff;
  box-shadow: 0 4px 16px 0 rgba(44, 50, 65, 0.08);
}
.container {
  width: 85%;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 68px;
}
.back-to-top {
  position: fixed;
  right: 10%;
  bottom: 10%;
}
</style>
