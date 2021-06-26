const mongoose = require('mongoose');

// add expirate date
const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, // remove spaces from left and right of string 
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamp: true
});

module.exports = mongoose.model('Products', schema);