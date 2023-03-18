
const cloudinary = require('cloudinary').v2

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_Name } = require('../config/env')

cloudinary.config({
    cloud_name: CLOUDINARY_Name,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

module.exports = { cloudinary }