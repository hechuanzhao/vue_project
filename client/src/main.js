import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon-font.css'
import axios from './http'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

import moment from 'moment'
Vue.use(moment)
    // 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
    // 申请的高德key
    key: '3f5bdc7cb6cfffbafe7fbbb18528d7bb',
    // 插件集合
    plugin: ['AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
});


//全局时间格式化过滤
Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format('YYYY-MM-DD');
});


Vue.use(elementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')