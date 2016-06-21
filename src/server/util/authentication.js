// exports.isAuthenticated = function(req, res, next) {
//   console.log("in isAuthenticated function");
//   //     req.authenticated
//   return req.isAuthenticated() ? next(): res.redirect('/login');
// }


  var isAuthenticated = function(req, res, next) {
    console.log("req.isAuthenticated() = ", req.isAuthenticated());
    console.log("inside of isAuthenticated function");
    //     req.authenticated
    return req.isAuthenticated() ? next(): false;
  }

  module.exports = isAuthenticated;