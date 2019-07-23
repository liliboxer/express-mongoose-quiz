const mongoose = require('mongoose');

const bunnySchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  fluffy: Boolean
});

module.exports = mongoose.model('Bunny', bunnySchema);
