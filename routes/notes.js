// Variables

const notes = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile } = require('../helpers/fsUtils')
const fs = require('fs')

// Get notes

notes.get('/', (request, response) =>
    readFromFile('./db/db.json').then((data) => response.json(JSON.parse(data)))
)

// Post note

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

// Delete note 

notes.delete('/:id', (request, response) => {
    const id = request.params.id
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        const dbData = JSON.parse(data)
        const filteredDBData = dbData.filter(note => note.id !== id)
        fs.writeFile('./db/db.json', JSON.stringify(filteredDBData), (error) => {
            response.json('Successfully deleted!')
        })
    })
})

module.exports = notes
