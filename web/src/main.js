import Vue from 'vue'
import App from './App'
import Vcu from 'vcu'
import { router } from './router/index'
import store from './store';
import request from '@/libs/request';
import ElementDataset from 'element-dataset'
import Uicomponents from '@/components/ui';
import 'babel-polyfill'

ElementDataset()
Vue.use(Vcu)
Vue.use(Uicomponents)

Vue.prototype.$request = request; //axios 原生方法

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  watch: {
    $route: {
      handler: (val, oldVal) => {
        window.history.pushState('forward', null, document.URL);
      },
      deep: true
    }
  },
}).$mount('#app')