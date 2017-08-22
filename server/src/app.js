const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index')
const cors = require('koa-cors')
const path = require('path')
const staticCache = require('koa-static-cache')
const config = require('./config/index')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()

app.use(staticCache({
  dir: resolve('../../dist'),
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}))

app.use(cors())
app.use(bodyParser())
app.use(router.routes())

app.listen(config.port || 3001, ()=> {
  console.log('监听端口' + config.port || 3001)
  console.log("环境变量是" + process.env.NODE_ENV);
})