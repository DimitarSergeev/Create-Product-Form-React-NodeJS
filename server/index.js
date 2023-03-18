const express = require('express')
const cors = require('cors')

const { port } = require('./config/env')

const routs = require('./routes')

const app = express()
const bodyParser = require('body-parser')
const { initializeDatabase } = require('./config/DB')


app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(routs)

initializeDatabase()
    .then(() => {
        app.listen(port, () => console.log(`App is listening on port ${port}`));
    })
    .catch((err) => {
        console.log('Cannot connect to db:', err)
    })