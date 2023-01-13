// Importing Router method from Express and creating a new Router instance
const notes = require('express').Router()

// Importing version 4 of uuid library
const { v4: uuidv4 } = require('uuid')

// Importing readAndAppend and readFromFile functions from fsUtils module
const { readAndAppend, readFromFile } = require('../helpers/fsUtils')

// Importing file system module
const fs = require('fs')

// Handling get request for '/' route and reading data from db.json file and sending it as JSON 
notes.get('/', (request, response) =>
    readFromFile('./db/db.json').then((data) => response.json(JSON.parse(data)))
)

notes.post('/', (request, response) => {
    const { title, text } = request.body // Destructuring title and text from request body
    if (title && text) { // Checking if title and text exist in request body
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        const info = readAndAppend(newNote, './db/db.json') // Calling readAndAppend function and passing newNote object and the file path
        response.json(info) // Sending the info object as JSON
    } else {
        response.json('Error in posting note') // Sending error message if title and text are not present in request body
    }
})

notes.delete('/:id', (request, response) => {
    const id = request.params.id // Getting the id from request parameters
    fs.readFile('./db/db.json', 'utf8', (error, data) => { // Reading the database JSON file
        const dbData = JSON.parse(data)  // Parsing the read data to JSON
        const filteredDBData = dbData.filter(note => note.id !== id) // Filtering the data by removing the note with the specified ID
        fs.writeFile('./db/db.json', JSON.stringify(filteredDBData), (error) => { // Writing the filtered data to the database JSON file
            response.json('Successfully deleted!') // Sending success message
        })
    })
})

module.exports = notes // Exporting the notes router
