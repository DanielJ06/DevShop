const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')

const port = process.env.PORT || 3000

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded())
app.use(session({
    secret: 'MyDevShop',
    name: 'sessionId',
}))
app.use(async(req, res, next) => {
    const { user } = req.session
    res.locals = {
        user
    }
    next()
})

app.use(express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(routes)

app.listen(port, () => console.log('Running on port', port))