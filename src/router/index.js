import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const articleList = r => require.ensure([], () => r(require('@/components/ArticleList')), 'articleList');
const articleDetail = r => require.ensure([], () => r(require('@/components/ArticleDetail')), 'articleDetail');

const routes = [
    {
        path: '/articleList/:search',
        component: articleList
    },{
        path:'/articleDetail',
        name:'articleDetail',
        component:articleDetail
    }
];

export default new Router({
    routes
})