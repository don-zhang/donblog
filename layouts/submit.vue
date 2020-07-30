<template>
  <div class="layout">
    <div class="top-header">
      <Logo></Logo>
    </div>
    <nuxt />
    <layout-footer></layout-footer>
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
.footer {
  height: 100px;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  margin-top: 150px;
}
.footer__tip {
  font-size: 13px;
  color: #adadad;
  margin-top: 10px;
}
.footer__tip2 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #adadad;
}
</style>
