const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes/index')
const cors = require('koa-cors');

const app = new Koa()
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

app.listen(3001, ()=> {
  console.log('Listen on 3001')
})