const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const plantsRoutes = require('./routes/plants')
const moduleRoutes = require('./routes/modules')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', express.static(path.join(__dirname, '..', 'dist', 'grow-local')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('origin'))
  res.header('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next()
})

app.use('/api/plants', plantsRoutes)
app.use('/api/modules', moduleRoutes)
app.use((req, res, next) => {
  const _path = path.join(__dirname, '..', 'dist', 'grow-local', 'index.html')
  res.sendFile(_path)
})

module.exports = app
