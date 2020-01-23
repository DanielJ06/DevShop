const express = require('express')
const path = require('path')
const routes = require('./routes')

class App {
    constructor() {
        this.server = express()

        this.middlewares()
        this.views()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }
    
    views(){
        this.server.use(express.static(path.resolve(__dirname, 'public')))
        this.server.set('view engine', 'ejs')
        this.server.set('views', path.join(__dirname, 'views'))
    }

    routes() {
        this.server.use(routes)
    }
}

module.exports = new App().server