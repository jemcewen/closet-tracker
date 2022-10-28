const protect = (req, res, next) => {
  if(!req.session.user_id) {
    req.flash('error', 'You must be signed in to visit this page.')
    return res.redirect('/users/login');
  }
  next();
}

module.exports = protect;