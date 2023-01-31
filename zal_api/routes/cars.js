const express = require('express')
const car = require('../models/car')
const router = express.Router()
const Car = require('../models/car')

async function getCar(req, res, next) {
    let car
    try{
        car = await Car.findById(req.params.id)
        if(car == null) {
            return res.status(404).json({
                wiadomosc: 'Pojawił się błąd'
            })
        }
    } catch(err) {
        return res.status(400).json({
            wiadomosc: err.wiadomosc
        })
    }
    res.car = car
    next()
}

//wyświetlenie wszystkich samochodów
router.get('/', async(req, res) => {
    try{
        const cars = await Car.find()
        res.json(cars)
    } catch(err) {
        res.status(400).json({
            wiadomosc: err.wiadomosc
        })
    }
})

//wyświetlenie wybranego samochodu po id
router.get('/:id', getCar, (req, res) => {
    res.json(res.car)
})

//dodawanie nowego samochodu do bazy
router.post('/', async(req, res) => {
    const car = new Car({
        marka: req.body.marka,
        cena: req.body.cena,
        rok_produkcji: req.body.rok_produkcji
    })
    try{
        const newCar = await car.save()
        res.status(200).json(newCar)
    } catch(err) {
        res.status(400).json({
            wiadomosc: err.wiadomosc
        })
    }
})

//zmiana danych samochodu
router.patch('/:id', getCar, async(req, res) => {
    if(req.body.marka != null) {
        res.car.marka = req.body.marka
    }
    if(req.body.cena != null) {
        res.car.cena = req.body.cena
    }
    if(req.body.rok_produkcji != null) {
        res.car.rok_produkcji = req.body.rok_produkcji
    }
    try{
        const updatedCar = await res.car.save()
        res.json(updatedCar)
    } catch(err) {
        res.status(400).json({
            wiadomosc: err.wiadomosc
        })
    }
})

//usuwanie samochodu z bazy danych
router.delete('/:id', getCar, async(req, res) => {
    try{
        const deletedCar = await res.car.remove()
        res.json(deletedCar)
    } catch(err) {
        res.status(400).json({
            wiadomosc: err.wiadomosc
        })
    }
})

module.exports = router