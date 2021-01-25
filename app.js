const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 5000
const db = mongoose.connection

app.use(bodyParser.urlencoded({ extended: true }))



app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

mongoose.connect('mongodb://localhost/favorite_restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      return restaurant.save(req.body)
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex:keyword, $options:"i"}})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.listen(port, () => {
  console.log(`localhost:${port}`)
})