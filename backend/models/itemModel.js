const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  path: String,
  filename: String
});

ImageSchema.virtual('cardImage').get(function () {
  return this.path.replace('/upload', '/upload/ar_1:1,c_crop');
});

const itemSchema = new Schema({
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
  photo: ImageSchema
})

module.exports = mongoose.model('Item', itemSchema);