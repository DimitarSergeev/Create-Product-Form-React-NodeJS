const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/AddProductForm';

exports.initializeDatabase = () => mongoose.connect(connectionString);