const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  datePurchased: Date
})

module.exports = mongoose.model('Item', itemSchema);