const { Router } = require('express')
const routes = new Router()
const db = require('./config/database')

const categories = require('./controllers/getCategories')
const products = require('./controllers/getProduct')
const home = require('./controllers/getHome')

routes.get('/', home.getIndex(db))

routes.get('/categoria/:id/:slug', categories.getCategories(db))

routes.get('/produto/:id/:slug', products.getProduct(db))

module.exports = routes