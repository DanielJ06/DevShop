const category = require('../models/category')

const getIndex = db => async(req, res) => {
    const categories = await category.getCategories(db)()  
    return res.render('home', {
        categories
    }) 
}

module.exports = { getIndex }