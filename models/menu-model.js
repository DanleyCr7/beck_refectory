const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  day: {
    type: Number,
    enum: [ 0, 1, 2, 3, 4 ], // segunda, ..., sexta
    required: true
  },
  meal: {
    type: Number,
    enum: [ 0, 1 ], // almoço, jantar
    required: true
  }
});

module.exports = mongoose.model('Menu', schema);