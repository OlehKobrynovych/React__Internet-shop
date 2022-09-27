/*
    Setup settings before starting the server
*/

// Env variables initialization
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname+'/.env')
})

// Connection to the database
require('./database')

// Adding compression for express server
const compression = require('compression')
const cors = require("cors")
const express = require('express')
const app = express()
app.use(compression())
app.use(cors())

// Adding body parser for getting req.body object
const body_parser = require('body-parser')
app.use(body_parser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(body_parser.json()) // parse application/json

// Adding server routes
const router = require('./routes')
app.use('/api', router)

// Server up after all prev initializations
if (!module.parent) {
    app.listen(process.env.PORT)

    if (process.env.MODE === 'dev') 
        console.log('Express started on port' + process.env.PORT);
}
    