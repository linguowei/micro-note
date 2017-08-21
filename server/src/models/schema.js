const db = require('./db')

const noteSchema = new db.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date,
  sourceLink: String
})

const tagSchema = new db.Schema({
  name: String
})

const Models = {
  NoteList: db.model('NoteList', noteSchema),
  TagList: db.model('TagList', tagSchema)
}

module.exports = Models