const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  res.status(200).json(items);
})

const createItem = asyncHandler(async (req, res) => {
  const item = await Item.create(req.body);
  res.status(200).json(item);
})

const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, req.body, {new: true});

  if(!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  res.status(200).json(item);
})

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndDelete(id);

  if(!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  res.status(200).json(item);
})

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem
}