var isAuthenticated = function(req, res, next) {
  console.log("req.isAuthenticated() = ", req.isAuthenticated());
  console.log("inside of isAuthenticated function");
  return req.isAuthenticated() ? next(): res.redirect('/signin');
}
module.exports = isAuthenticated;
