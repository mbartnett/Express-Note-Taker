const notes = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils')
// http://localhost:3001/api/notes/
notes.get('/', (request, response) =>
    readFromFile('./db/db.json').then((data) => response.json(JSON.parse(data)))
)
// http://localhost:3001/api/notes/
notes.post('/', (request, response) => {
    const { title, text } = request.body

    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        const response = readAndAppend(newNote, './db/db.json')

        response.json(response)
    } else {
        response.json('Error in posting note')
    }
})

module.exports = notes
