import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  console.log(componentName, componentConfig)
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// import BaseIcon from './components/BaseIcon'

// Vue.component('BaseIcon', BaseIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
