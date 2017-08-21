const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const mongo_config = require('../config')

mongoose.connect(mongo_config.microDev,{ useMongoClient: true })
let db = mongoose.connection

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
  console.log('连接成功');
})


module.exports = mongoose