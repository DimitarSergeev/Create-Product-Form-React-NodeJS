
const ProductModel = require('../models/ProductModel')

exports.createProduct = (productData) => ProductModel.create(productData)