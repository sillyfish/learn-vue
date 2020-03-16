import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'nprogress/nprogress.css'
import Vuelidate from 'vuelidate/src'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import DateFilter from '@/filters/date'

Vue.use(Vuelidate)
Vue.filter('date', DateFilter)

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
