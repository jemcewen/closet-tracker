const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');
// const User = require('../models/userModel');

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.session.user_id });
  res.render('items/index', { items });
  // res.status(200).json(items);
})

const createItem = asyncHandler(async (req, res) => {
  const item = new Item(req.body.item);
  item.user = req.session.user_id;
  item.photo = req.file;
  await item.save();
  res.status(200).json(item);
})

const updateItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);

  if(!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  const user = req.session.user_id;

  if(item.user.toString() !== user) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedItem = await Item.findByIdAndUpdate(id, req.body, {new: true});

  res.status(200).json(updatedItem);
})

const deleteItem = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);

  if(!item) {
    res.status(400);
    throw new Error('Item not found');
  }

  const user = req.session.user_id;

  if(item.user.toString() !== user) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const deletedItem = await Item.findByIdAndDelete(id);

  res.status(200).json(deletedItem);
})

const getNewForm = (req, res) => {
  res.render('items/new');
}

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getNewForm
}