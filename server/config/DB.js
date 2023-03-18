const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/CandyFashion';

exports.initializeDatabase = () => mongoose.connect(connectionString);