<template>
  <div class="layout">
    <div class="top-header">
      <nuxt-link to="/">
        <Logo></Logo>
      </nuxt-link>
    </div>
    <div class="container">
      <a-locale-provider :locale="zh_CN">
        <nuxt />
      </a-locale-provider>
    </div>
    <div class="footer">©{{date}}, 备案号：xxxxxxx</div>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import Logo from '@/components/Logo'
export default {
  data() {
    return {
      zh_CN,
      date: null
    }
  },
  components: {
    Logo
  },
  mounted() {
    this.date = moment().format('YYYY')
    this.$message.config({
      top: `100px`,
      duration: 2,
      maxCount: 3
    })
  }
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
.layout {
  padding: 0;
  margin: 0;
}
.top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 99997;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}
.container {
  width: 85%;
  max-width: 960px;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px;
  margin-top: 68px;
}
.footer {
  height: 100px;
  line-height: 100px;
  font-size: 15px;
  text-align: center;
}
.back-top .ant-back-top {
  bottom: 100px;
}
.back-top .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #7871af;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
}
</style>
