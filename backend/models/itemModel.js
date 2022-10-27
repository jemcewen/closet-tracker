const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: String,
  price: Number,
  datePurchased: Date,
  photo: {
    path: String,
    filename: String
  }
})

module.exports = mongoose.model('Item', itemSchema);