const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const config = require('../config')

mongoose.connect(config.mongodb_url,{ useMongoClient: true })
let db = mongoose.connection

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
  console.log(config.mongodb_url, '连接成功');
})


module.exports = mongoose