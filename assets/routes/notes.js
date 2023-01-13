const notes = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils')
const noteID = require('../db/db.json')
const { response } = require('.')

notes.get('/', (request, response) =>
    readFromFile('./db/db.json').then((data) => response.json(JSON.parse(data)))
)

notes.post('/', (request, response) => {
    const { title, text } = request.body

    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        const info = readAndAppend(newNote, './db/db.json')

        response.json(info)
    } else {
        response.json('Error in posting note')
    }
})

module.exports = notes
