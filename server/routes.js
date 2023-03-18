const router = require('express').Router()

const productController = require('./controllers/productController')

router.use(productController)

module.exports = router
