const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getNewForm,
  getEditForm
} = require('../controllers/itemController');

const protect = require('../middleware/authMiddleware');

router.route('/').get(protect, getItems).post(protect, upload.single('photo'), createItem);

router.get('/new', protect, getNewForm);
router.route('/:id').get(getItem).put(protect, upload.single('photo'), updateItem).delete(protect, deleteItem);

router.get('/:id/edit', protect, getEditForm);

module.exports = router;