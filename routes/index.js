const express = require('express')
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const sort = require('./modules/sort')
const user = require('./modules/user')
const auth =require('./modules/auth')
const { authenticator } = require('../middleware/auth')
const router = express.Router()

router.use('/users', user)
router.use('/auth', auth)
router.use('/restaurants', authenticator, restaurant)
router.use('/sort', authenticator, sort)
router.use('/', authenticator, home)


module.exports = router