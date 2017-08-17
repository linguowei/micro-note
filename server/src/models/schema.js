const db = require('./db')

const noteSchema = db.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date
})

const tagSchema = db.Schema({
  name: String
})

const Models = {
  NoteList: db.model('NoteList', noteSchema),
  TagList: db.model('TagList', tagSchema)
}

module.exports = Models