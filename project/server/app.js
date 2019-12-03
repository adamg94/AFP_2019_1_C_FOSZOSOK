const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
const SETTINGS = require('./config.js')
const port = SETTINGS.PORT
const mport = SETTINGS.MONGO_PORT
const host = SETTINGS.HOSTNAME


mongoose.connect(`mongodb://${host}:${mport}/afp`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())

const connection = mongoose.connection

connection.once('open', _ =>{
    console.log('MongoDB kapcsolat létrehozva')
})

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(port, host, 
    _ => {
        console.log(`A szerver fut: ${host}:${port}`)
    })