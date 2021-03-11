if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurants.json')
const restaurants = restaurantList.results
const SEED_USER = [{ name: "user 1", email:        "user1@example.com", password: "12345678"},
{ name: "user 2", email: "user2@example.com",
    password: "12345678"
  }]
db.once('open', () => {
  SEED_USER.forEach((SEED_USER,index) =>{
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(
            { length: 3 },
            (_, i) => Restaurant.create(
              {
                ...restaurantList.results[(i + (index * 3))], userId
              })
          ))
        })
  .then(() => {
      console.log('done.')
      process.exit()
    })
 })
})
