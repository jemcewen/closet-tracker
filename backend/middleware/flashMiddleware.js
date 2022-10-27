const flashHandler = (req, res, next) => {
  res.locals.user = req.session.user_id;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
}

module.exports = flashHandler;