## 笔记文章管理应用

基于`Angular4`+`koa2`实现的一个自动生成笔记文章的应用管理程序，在线预览[地址](https://weiweinote.cn)
### 开发
(本地要安装mongodb，并且启动mongodb服务)

``` bash
# git clone https://github.com/linguowei/micro-note.git
# npm install 或者 yarn install   注意不要用cnpm！！
# npm run start
# cd /server  // server文件夹是该应用的后端代码
# npm install 或者 yarn install   注意不要用cnpm！！
# npm run dev
# 浏览器访问 localhost:4200
```
### 部署
``` bash
# git clone https://github.com/linguowei/micro-note.git
# npm install 或者 yarn install   注意不要用cnpm！！
# npm run build
# 1. 把build出来的文件夹dist和server文件夹拷贝到服务器放在一个目录里面
# 2. 服务器安装node、mongodb、pm2
# 3. 启动mongodb服务，进入server文件夹执行npm install, 然后执行npm run pro
```
### License
[GPL 禁止商用](https://www.oschina.net/question/54100_9455)
