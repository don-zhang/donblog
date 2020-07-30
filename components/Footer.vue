<template>
  <div class="footer">
    <div>
      <span style="margin-right: 20px;">©{{date}}, POWERED BY DON</span> 备案号：蜀ICP备19000980号-2
    </div>
    <div class="footer__tip">转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源</div>
    <div class="footer__tip2">
      联系：
      <svg version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="150px"
        height="30px"
        viewBox="0 0 150 30"
        enable-background="new 0 0 150 30"
        xml:space="preserve"
        style="margin-top: 3px;">
        <image id="image0"
          width="150"
          height="30"
          x="0"
          y="0"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAeCAMAAAD5PBdlAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAANlBMVEX///+cl8Kcl8Kcl8Kc
l8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8Kcl8L///+8Wkh5AAAAEHRSTlMAQMCw
4IAQIPCgYJAw0FBw3Q6vJgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElN
RQfkAggAABGUxahJAAACbElEQVRYw+1U2W4cMQyT5fsc/v/XlvI0SbvZ3W6AFO3DCBiMbdkSLVIW
ueyyyy677BvNKdwjnw/xD6dTfjVs9sXJ65brY1gNT2GlWgDU9BlTJoqbsKnjK7DEPdn+FNYoc0lq
IaR7x+JtWPcFWMPr5PZUVZes6r2el29K6wKvaimUyynSq22foUkKM+XY4oHDONOac9QxokpH0Giw
uNMPOhk1G6xmWSzrTsdZZATlxFX1v1wuldmMxBBMC62gektCICEGjlDixBDMWDxpOWclLIRKhgf/
EwchOtRVQuYNXQALpXERFqO7ibydJRFWRDQt5uJ76RHHAeWZ2Qt8R/2AdWDtW6BJhhcmEOiuVnM2
IBuO3xA3dY8aE/OnQUSnsF4E11U8ksWyCkW8kxgZfaGfTgasTGNWuZBymewpZDujeMsr7xv2Ldxe
/4BFikp+h9WBcsJyVgNWy4uU6pimQqrKhGkn3sDyZ1g9nY7tcarLFs5E8cx9C6uf1TrsGr/DIpm5
/YTFG4t+wApzCxDe8fTUVBrjJhayfaqWIwnVnAsHj6OkE5ZRiWn5xz1YDXNVxAFNBm3O7WYrL/6i
JuJhtMPEMTd7C8thqj8SScyYHmqHqBNRk4+nmBYzOiOU0xOdOSmx1XbwYVmj+n1DuQfL6AmYmWK3
igDKQWQTcMiJvUr81kThLo4iv2YuCpTKWVo7u2mrAWVZHRjOpLZ3U1GwDtpO45DrxbNpuBBG4uY5
3pY58Xdeikev9WeL5ITcmfpMKln9kwD5QfRNZkryfdbRnXWwsLcDXz19/UZ/01Kd5XwVZbTo/g9Q
l1122WX/zH4AQHcfZALj+D4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDItMDdUMTY6MDA6MTcr
MDg6MDB0grAiAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAyLTA3VDE2OjAwOjE3KzA4OjAwBd8I
ngAAAABJRU5ErkJggg==" />
      </svg>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      date: null,
    }
  },

  mounted() {
    this.date = moment().format('YYYY')
  },
}
</script>

<style lang="less">
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