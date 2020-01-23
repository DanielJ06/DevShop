const { Router } = require('express')
const routes = new Router()
const db = require('./config/database')
const slug = require('./utils/slug')

routes.get('/', async(req, res) => {
    const categories = await db('categories').select('*')
    const catgWithSlugs = categories.map( category => {
        const newCategory = { ...category, slug: slug(category.category) }
        return newCategory
    } )    
    console.log(catgWithSlugs)
    return res.render('home', {
        categories: catgWithSlugs
    })
})

routes.get('/categoria/:id/:slug', async(req, res) => {
    const categories = await db('categories').select('*')
    const catgWithSlugs = categories.map( category => {
        const newCategory = { ...category, slug: slug(category.category) }
        return newCategory
    } )  
    const products = await db('products').select('*').where('id', function(){
        this
            .select('categories_products.product_id')
            .from('categories_products')
            .whereRaw('categories_products.product_id = products.id')
            .where('categorie_id', req.params.id)
    })
    res.render('category', {
        products,
        categories: catgWithSlugs
    })
})

module.exports = routes