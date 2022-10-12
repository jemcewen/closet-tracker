const asyncHandler = require('express-async-handler');

const getItems = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Get items'});
})

const setItem = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400);
    throw new Error('Please add an item name')
  }
  res.status(200).json({message: 'Create item'});
})

const updateItem = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update item ${req.params.id}`});
})

const deleteItem = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Delete item ${req.params.id}`});
})

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem
}