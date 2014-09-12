// NOTE: need to leave "next" in param list, otherwise this won't get called
module.exports = function (err, req, res, next) {
  err.status = err.status || 500;
  res.status(err.status);
  res.render('error', {
    status: err.status,
    message: err.message || 'Internal Server Error',
    error: err
  });
};