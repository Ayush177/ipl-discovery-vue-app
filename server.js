const express = require("express")
const serveStatic = require('server-static')
const path = require('path')

const app = express()

app.use('/', serverStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || port
app.listen(port)

console.log('Listening on port: ', + port);