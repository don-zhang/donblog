<template>
  <div class="layout">
    <div class="top-header">
      <nuxt-link to="/">
        <div class="logo">
          <svg
            viewBox="-369.52618453865335 0 739.0523690773067 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            class="jsx-2263963463 artboard-inner"
            style="width: 240px; height: 46.0049px; max-height: 100%;"
          >
            <g
              transform="translate(-380.6234413965087 98.25436408977555) scale(1.731781656968689)"
              fill="#7871af"
            >
              <g id="line1">
                <path
                  d="M6.408 0L21.024 0C36.576 0 49.176-11.808 49.176-27.936C49.176-43.560 36.216-55.656 21.168-55.656L6.408-55.656ZM21.312-49.248C32.544-49.248 42.192-40.032 42.192-27.936C42.192-15.984 33.264-6.408 21.528-6.408L13.176-6.408L13.176-49.248Z"
                />
                <path
                  d="M134.662-5.688C122.422-5.688 112.774-15.552 112.774-27.864C112.774-40.176 122.422-50.040 134.662-50.040C146.830-50.040 156.622-40.176 156.622-27.864C156.622-15.552 146.902-5.688 134.662-5.688ZM134.662 1.008C150.646 1.008 163.606-11.880 163.606-27.864C163.606-43.848 150.646-56.736 134.662-56.736C118.750-56.736 105.790-43.848 105.790-27.864C105.790-11.880 118.750 1.008 134.662 1.008Z"
                />
                <path
                  d="M223.675 0L230.587 0L230.587-41.472L263.347 0L267.523 0L267.523-55.656L260.611-55.656L260.611-14.328L228.067-55.656L223.675-55.656Z"
                />
                <path
                  d="M332.201 0.792C334.505 0.792 336.377-1.008 336.377-3.240C336.377-5.616 334.505-7.416 332.201-7.416C329.969-7.416 328.169-5.616 328.169-3.240C328.169-1.008 329.969 0.792 332.201 0.792Z"
                />
                <path
                  d="M392.558 0L432.590 0L432.590-6.192L401.846-6.192L433.166-51.120L433.166-55.656L394.142-55.656L394.142-49.464L424.094-49.464L392.558-4.104Z"
                />
              </g>
            </g>
          </svg>
        </div>
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
export default {
  data() {
    return {
      zh_CN,
      date: null
    }
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
  .logo {
    position: relative;
    left: 100px;
  }
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
