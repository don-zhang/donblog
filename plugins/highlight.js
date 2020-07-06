
import Vue from 'vue'
import hljs from 'highlight.js'
import '../static/highlightjs/styles/monokai-sublime.min.css'

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
  let imgs = el.querySelectorAll('img')
  imgs.forEach((img) => {
    img.addEventListener('click', (e) => {
      let imageEle = document.getElementById('imageModel')
      imageEle.style = 'display: block;'
      imageEle.innerHTML = e.srcElement.outerHTML
    })
  })
})