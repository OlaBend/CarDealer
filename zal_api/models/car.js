const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    marka: String,
    cena: Number,
    rok_produkcji: Number
})

module.exports = mongoose.model('Car', carSchema)