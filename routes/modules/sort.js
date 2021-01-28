const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


router.get('/category', (req, res) => {
  Restaurant.find()
    .sort({ category: "asc" })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/AtoZ',(req,res)=>{
 Restaurant.find()
   .sort({ name: 1 })
   .lean()
   .then(restaurants => res.render('index', { restaurants }))
   .catch(error => console.log(error))
})

router.get('/ZtoA', (req, res) => {
  Restaurant.find()
    .sort({ name: -1 })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
module.exports = router