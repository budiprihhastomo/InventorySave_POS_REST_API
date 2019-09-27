// Require .env
require('dotenv').config()
// Import express framework
const express = require('express')
// Import body-parser lib
const bodyParser = require('body-parser')
// Import cors lib
const cors = require('cors')
// Import morgan lib
const morgan = require('morgan')
// Import express-fileupload lib
const fileUpload = require('express-fileupload')

// Use express
const app = express()
// Set Port 
const port = process.env.PORT_SERVER || 3000

// Use Middleware : body-parser
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}))
// Use Middleware : CORS
app.use(cors())
// Use Middleware : morgan
app.use(morgan('dev'))
// Use Middleware : express-fileupload
app.use(fileUpload({
    createParentPath: true
}))

// Use route navigation 
const routeNav = require('./src/index')
app.use('/api/v1/', routeNav)

// Listen server : port
app.listen(port, () => console.info(`Service Running Using Port : ${port}`))