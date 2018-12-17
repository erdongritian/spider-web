<template>
    <div class="main_div">
        <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
            <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
                    <thead class="has-gutter">
                    <tr class=""><th class="is-leaf"><div class="cell"><h1>{{title}}</h1>
                        <div><span v-if="authors">作者：{{authors}} </span>  发布于 {{publishTime}}. </div><br/>
                        <div>原文地址 <a :href="url" target="_blank">{{url}}</a> </div><br/>
                        <div>主题 {{topicStr}} </div>
                    </div></th>
                    </tr></thead>
                </table>
            </div>

            <div class="contentArticle">
                <span v-html="contentHtml"></span>
            </div>

        </div>
    </div>
</template>

<script>
    import fetch from '@/util/fetch';

    export default {
        name: 'ArticleDetail',
        data() {
            return {
                readTime:'',
                publishTime:'',
                translator:'',
                topicStr:'',
                title:'',
                url:'',
                contentHtml:'',
                authors:''
            };
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            console.log("进入Detail");
            this.fetchData ();
        },
        methods: {
            async fetchData () {
                let requestUrl='searchbyid/'+this.$route.params.articleId
                let res = await fetch(requestUrl);
                console.log(res);
                if(res.code==0){
                    this.publishTime=res.data.publishTime;
                    // this.translator=res.data.translator.join(',');
                    this.topicStr=res.data.topicKey.join(',');
                    this.title=res.data.title;
                    this.url=res.data.url;
                    this.contentHtml=res.data.contentHtml;
                    this.authors=res.data.authors.join(',');
                    this.title=res.data.title;
                }
            },
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    .el-table th div{
        line-height: 23px;
    }
    .contentArticle{
        margin: 1rem;
        text-align: left;
    }
</style>
