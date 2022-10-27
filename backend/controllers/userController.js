const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    req.flash('error', 'A user with this email already exists');
    return res.redirect('/users/register');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if(user) {
    req.session.user_id = user._id;
    req.flash('success', 'You have successfully registered');
    res.redirect('/items');
  } 
  else {
    req.flash('error', 'Something went wrong');
    res.redirect('/users/register');
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(user && (await bcrypt.compare(password, user.password))) {
    req.session.user_id = user._id;
    req.flash('success', 'You have successfully logged in');
    res.redirect('/items');
  }
  else {
    req.flash('error', 'Invalid email or password');
    res.redirect('login');
  }
})

const logoutUser = (req, res) => {
  req.session.user_id = null;
  req.flash('success', 'You have been logged out');
  res.redirect('login');
}

const getLoginForm = (req, res) => {
  res.render('users/login');
}

const getRegisterForm = (req, res) => {
  res.render('users/register');
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getLoginForm,
  getRegisterForm
}