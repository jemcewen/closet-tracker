const asyncHandler = require('express-async-handler');
// const mongoose = require('mongoose');
const Item = require('../models/itemModel');

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({});
  res.status(200).json(items);
})

const setItem = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400);
    throw new Error('Please add an item name');
  }
  const item = await Item.create(req.body)
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
  setItem,
  updateItem,
  deleteItem
}