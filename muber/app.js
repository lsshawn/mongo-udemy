const express = require('express')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

mongoose.Promise = global.Promise

// don't put else statement here because in test, we want mocha to use the 'done' callback.
// If we set it here, mocha may run the tests before setting up the connections
// We set it up in ./test/test_helper.js
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber')
}

app.use(bodyParser.json())
routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
})

module.exports = app