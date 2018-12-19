<template>
  <div id="app">
    <el-container>
      <el-header>
        <div>
          <el-input placeholder="请输入搜索内容" style="width: 20%;min-width:13rem;margin-right: 1rem;" v-model="searchContent" @keyup.enter.native="search">
          </el-input><el-button type="primary" round v-on:click="search">搜 索</el-button>
        </div>
      </el-header>
      <el-main style="text-align: center">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
    data(){
        return {
            searchContent: ''
        }
    },
  components: {
  },
    created: function () {
        this.$router.push('/articleList/_search');
    },
    methods: {
        search: function() {
            console.log("search。。。。。。。。。。。。。");
            let searchUrl='/articleList/_search'
            if(this.searchContent!=''){
                searchUrl='/articleList/'+this.searchContent;
            }
            console.log(searchUrl);
            this.$router.push(searchUrl);
        }
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

  p{
    line-height: 2.3;
  }
.el-table th{
  -webkit-user-select: initial;
  -moz-user-select: initial;
  -ms-user-select: initial;
}


</style>
