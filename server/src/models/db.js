const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const mongo_config = require('../config')

const db = mongoose.connect(mongo_config.microDev, (err)=> {
  if (err) return console.log(err)
  console.log('Connect to db ready...')
})

module.exports = db