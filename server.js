// Importing Express module
const express = require('express')

// Importing path module
const path = require('path')

// Importing routes from the routes folder
const api = require('./routes')

// Setting port number, either from environment variable or default 3001
const PORT = process.env.PORT || 3001

// Creates an express application
const app = express()

// Using JSON middleware to handle JSON data in requests
app.use(express.json())

// Using URL encoded middleware to handle URL endoded data in requests
app.use(express.urlencoded({ extended: true }))

// Using  API route for all routes starting with API 
app.use('/api', api)

// Serving static files from the `public` folder
app.use(express.static('public'))

// Serving index.html file for the root route
app.get('/', (request, response) => 
    response.sendFile(path.join(__dirname, '/public/index.html'))
)

// Serving notes.html for the `/notes` route
app.get('/notes', (request, response) => 
    response.sendFile(path.join(__dirname, '/public/notes.html'))
)

// Starting the server on a specified port and logging the message
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
)