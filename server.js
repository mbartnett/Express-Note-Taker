// Variables

const express = require('express')
const path = require('path')
const api = require('./routes')
const PORT = process.env.port || 3001
const app = express()

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', api)
// http://localhost:3001/api

app.use(express.static('public'))

app.get('/', (request, response) => 
    response.sendFile(path.join(__dirname, '/public/index.html'))
)

app.get('/notes', (request, response) => 
    response.sendFile(path.join(__dirname, '/public/notes.html'))
)

app.listen(PORT, () =>

console.log(`App listening at http://localhost:${PORT} 🚀`)
)