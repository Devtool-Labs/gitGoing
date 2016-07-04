var authRedirect = function(req, res, next) {
  return req.isAuthenticated() ? next(): res.redirect('/signin');
}

var apiAuthRedirect = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  else {
    res.status = 401;
    return res.json({
      error: 'unauthorized'
    });
  }
}

exports.authRedirect = authRedirect;
exports.apiAuthRedirect = apiAuthRedirect;
