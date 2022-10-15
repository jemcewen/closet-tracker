const protect = (req, res, next) => {
  if(!req.session.user_id) {
    throw new Error('Not logged in');
  }
  next();
}

module.exports = protect;