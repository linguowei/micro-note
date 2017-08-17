const db = require('./db')

const noteSchema = db.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date
})

const Models = {
  NoteList: db.model('NoteList', noteSchema)
}

module.exports = Models