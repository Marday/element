import Vue from 'vue'
import Router from 'vue-router'
import ratings from 'components/ratings/ratings'
import goods from '../components/goods/goods'
import seller from '../components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
