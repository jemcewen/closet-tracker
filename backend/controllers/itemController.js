const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.session.user_id });
  res.render('items/index', { items });
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

  const updatedItem = await Item.findByIdAndUpdate(id, {...req.body.item});
  if(req.file) {
    updatedItem.photo = req.file;
  }
  await updatedItem.save();

  req.flash('success', 'Your item has been updated.');
  res.redirect(`/items`);
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

const getEditForm = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if(!item) {
    req.flash('error', 'Item not found');
    return res.redirect('/items');
  }
  res.render('items/edit', { item });
})

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getNewForm,
  getEditForm
}