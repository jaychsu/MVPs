import Vue from 'vue'
import DemoApp from './component/demo-app.vue'

new Vue({
  el: '#demo-selector',
  components: { DemoApp },
  render(h) {
    return h('DemoApp')
  },
})
