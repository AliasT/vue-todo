import 'src/sass/main'

import Vue from 'vue'
import App from './App'
import Hammer from 'hammerjs'

Vue.directive('swipe', {
  acceptStatement: true,
  bind () {
    var hammer = new Hammer(this.el)
    this.hammer = hammer
  },

  update (fn, oldValue) {
    this.hammer.on('swipe', function () {
      debugger
      fn('right')
    })
    this.hammer.on('swipeleft', function () {
      debugger
      fn('left')
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
