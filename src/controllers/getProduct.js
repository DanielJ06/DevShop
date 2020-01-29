const product = require('../models/product')
const category = require('../models/category')

const getProduct = db => async(req, res) => {
    const categories = await category.getCategories(db)()
    const prod = await product.getProductById(db)(req.params.id) 
    res.render('product-details', {
        product: prod,
        categories,
    })
}

module.exports = {
    getProduct
}