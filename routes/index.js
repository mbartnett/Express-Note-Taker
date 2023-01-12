const express = require('express')

const notes = require('./notes')

const app = express()
// http://localhost:3001/api/notes
app.use('/notes', notes)

module.exports = app