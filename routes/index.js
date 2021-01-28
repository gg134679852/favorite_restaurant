const express = require('express')
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const sort = require('./modules/sort')
const router = express.Router()

router.use('/',home)
router.use('/restaurants', restaurant)
router.use('/sort', sort)


module.exports = router