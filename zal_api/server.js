require('dotenv').config()

const express = require('express')
const app = express();
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://student:password@cluster0.qg5uvqn.mongodb.net/?retryWrites=true&w=majority')
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Połączono z bazą danych'))

app.use(express.json())

const router = require('./routes/cars')
app.use('/car', router)

app.listen(5000,() => console.log('Serwer pracuje na porcie 5000'))

