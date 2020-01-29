const category = require('../models/category')
const product = require('../models/product')

const getCategories = db => async(req, res) => {
    const categories = await category.getCategories(db)()
    const products = await product.getProductsByCategoryId(db)(req.params.id)
    const catg = await category.getCategoryById(db)(req.params.id)   
    res.render('category', {
        products,
        categories,
        category: catg
    })
}

module.exports = {
    getCategories
}