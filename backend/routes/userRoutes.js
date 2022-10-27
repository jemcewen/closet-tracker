const express = require('express');
const router = express.Router();
const { 
  registerUser,
  loginUser,
  logoutUser,
  getLoginForm,
  getRegisterForm
} = require('../controllers/userController');

router.post('/', registerUser);
router.route('/login').get(getLoginForm).post(loginUser);
router.get('/logout', logoutUser);
router.get('/register', getRegisterForm);


module.exports = router;