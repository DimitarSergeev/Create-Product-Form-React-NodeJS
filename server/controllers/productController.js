const router = require('express').Router()

const productService = require('../services/productService')

const { cloudinary } = require('../utils/cloudinary')


router.post('/create-new-product', async (req, res) => {
    const dataProduct = req.body
    try {
        const productVarieties = dataProduct.products.map(async (el) => {
            const uploadedImg = await cloudinary.uploader.upload(el.img, {
                upload_preset: 'main_photos',
            })
            el.img = uploadedImg.url

            const promises = el.images.map(async (image) => {
                const uploadedImg = await cloudinary.uploader.upload(image, {
                    upload_preset: 'products_photos',
                }).catch((error) => console.error(error))
                return uploadedImg.url
            })

            el.images = await Promise.all(promises)
            return el
        })

        const updatedProducts = await Promise.all(productVarieties)
        dataProduct.products = updatedProducts
        const newProduct = await productService.createProduct(dataProduct)
        return res.json(newProduct)

    } catch (error) {
        res.status(500)
        return res.json({ error: error.message })
    }
})
module.exports = router
