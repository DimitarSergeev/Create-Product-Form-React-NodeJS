const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill name of product']
    },
    type: {
        type: String,
        required: [true, 'Please select type of product']
    },
    products: [{
        img: {
            type: String,
            required: [true, 'Please select main image']
        },
        qty: {
            type: {
                XS: {
                    type: Number,
                    required: [true, 'Please set quantity on XS size']
                },
                S: {
                    type: Number,
                    required: [true, 'Please set quantity on S size']
                },
                M: {
                    type: Number,
                    required: [true, 'Please set quantity on M size']
                },
                L: {
                    type: Number,
                    required: [true, 'Please set quantity on L size']
                }
            }
        },
        price: {
            type: Number,
            required: [true, 'Please set price of product']
        },
        code: {
            type: String,
            required: [true, 'Please set code of product']
        },
        images: {
            type: Array,
            required: [true, 'Please set images of product']
        },
        discount: {
            type: Number,
            required: false
        }
    }],
    descModel: {
        type: String,
        required: [true, 'Please write some description of product']
    },
    productInfo: {
        type: String,
        required: [true, 'Please write some specifications of product']
    }

})

const ProductModel = mongoose.model("ProductModel", productSchema)

module.exports = ProductModel