const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })
  req.session.user_id = user._id;
  res.json({name, email});
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const validPassword = await bcrypt.compare(password, user.password);
  if(validPassword) {
    req.session.user_id = user._id;
    res.json({ user });
  }
  else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
})

const logoutUser = (req, res) => {
  req.session.user_id = null;
  res.json({message: 'Logged out'});
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}