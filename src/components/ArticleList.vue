<template>
    <div class="main_div">
        <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
            <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
                <thead class="has-gutter">
                <tr class=""><th class="is-leaf"><div class="cell">近期文章</div></th>
                </tr></thead>
            </table>
        </div>
            <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                <tbody>

                <tr class="el-table__row" v-for="art in articleList">
                <td>
                    <div class="cell">
                        <div>
                        <div class="article_thumb_image">
                            <img :src="art.icon_url">
                        </div>

                        <div class="aricle_item_info">
                            <div class="title">
                                <!--<a href="javascript:void(0);" target="_blank" title="art.title" v-on:click="goToDatail(art._id)"><span v-html="art.title"></span></a>-->
                                <router-link :title="art.title" :to="{ name: 'articleDetail', params: { articleId: art._id }}"><span v-html="art.title"></span></router-link>
                            </div>
                            <div class="tip">
                                <span>作者：<span v-for="author in art.authors">{{author}},</span></span>
                  <span>发布日期：{{art.publish_time}}
                  </span>
                            </div>
                        </div>
                        </div>
                        <div class="content_str">
                            <span v-html="art.content_str"></span>
                        </div>




                    </div>
                </td>
            </tr>

            </tbody></table></div>

        </div>

        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalSize">
        </el-pagination>
    </div>
</template>

<script>
    import fetch from '@/util/fetch';

    export default {
        name: 'ArticleList',
        data() {
            return {
                pageSize:10,
                searchContent:'_search',
                articleList:[],
                currentPage1: 1,
                totalSize:0
            };
        },
        created () {
            console.log("created");
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.searchContent=this.$route.params.search;
            let postData={
                "content": this.searchContent,
                "page": 1,
                "pageSize": this.pageSize
            };
            this.fetchData(postData)
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                let postData={
                    "content": this.searchContent,
                    "page": val,
                    "pageSize": this.pageSize
                };
                this.fetchData(postData);
            },
            async fetchData (postData) {
                this.searchContent=this.$route.params.search;
                let res = await fetch('searchbycontent',postData,'POST');
                this.articleList=res.data.resultList;
                this.totalSize=res.data.total;
            },
            goToDatail(articleId){
                this.$router.push({ name: 'articleDetail', params: { articleId: articleId }})
            }
        },
        activated () {
            console.log("activated");
            this.searchContent=this.$route.params.search;
            let postData={
                "content": this.searchContent,
                "page": 1,
                "pageSize": this.pageSize
            };
            console.log(postData);
            this.fetchData(postData);
        },
        beforeRouteUpdate (to, from, next) {
            console.log("beforeRouteUpdate");
            this.searchContent=to.params.search;
            let postData={
                "content": this.searchContent,
                "page": 1,
                "pageSize": this.pageSize
            };
            console.log(postData);
            this.fetchData(postData);
           next();
      }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

    .main_div{
        border-radius: 1em;
        -webkit-box-shadow: 3px 3px 6px #666;
        -moz-box-shadow: 3px 3px 6px #666;
        box-shadow: 3px 3px 6px #666;

        width: 60%;
        margin-left:20%;
    }
    .aricle_item_info {
        margin-left: 4px;
        display: inline-block;
        width: 85%;
        text-align: left;
    }
    .article_thumb_image {
        width: 75px;
        height: 60px;
        float: left;
    }
    .aricle_item_info .title {
        font-size: 18px;
        font-weight: bold;
        padding: 6px 10px 8px 10px;
        white-space: nowrap;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .tip {
        font-size: 13px;
        color: #999;
        padding-left: 10px;
    }
    img {
        max-width: 100%;
        width: auto\9;
        height: auto;
        vertical-align: middle;
        border: 0;
        -ms-interpolation-mode: bicubic;
    }
    .aricle_item_info .title a {
        text-decoration: none;
    }
    .aricle_item_info .title {
        font-size: 18px;
        font-weight: bold;
        white-space: nowrap;
    }
    .hlt1{
        color: red;
    }
    .content_str{
        text-align: left;
        margin-top: 1.5rem;
    }

</style>
