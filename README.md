### 启动 ：

npm run serve

npm build --prod

### 部署：

web端配置信息：

- util/fetch.js    服务器地址，baseUrl
- vue.config.js   资源目录相对路径

爬虫图片地址：

- 绝对路径：/home/chenh/spider/go-spider-web/spider-img/
- 实体属性iconUrl："../spider-img/" + newsId + "/" + iconName
- web端build后的文件需要放到go-api路径下的static目录下
- go-api路径映射在main.go文件中

