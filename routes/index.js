// Importing Express module
const express = require('express')

// Importing notes route from the notes.js file
const notes = require('./notes')

// Creating an Express application
const app = express()

// Using notes route for all routes starting with '/notes'
app.use('/notes', notes)

// Exporting the express app
module.exports = app