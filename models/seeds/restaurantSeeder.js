const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurants.json')
const restaurants = restaurantList.results

mongoose.connect('mongodb://localhost/favorite_restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})


db.once('open', () => {
  console.log('mongodb connected!')
})

restaurants.forEach( restaurant=> {
  Restaurant.create({
    name: restaurant.name,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description
  })
  console.log('done')
})