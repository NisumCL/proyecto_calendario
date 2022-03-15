/* eslint-disable */
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const { createDataBase } = require('./db/mongo.js')
const router  = require('./routers/router.js')
const app = express()

createDataBase()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(router)
app.use(express.static(publicDirectoryPath))


const port = 3000
app.listen(port, () =>{
    console.log('server is up and port ' + port)
})

