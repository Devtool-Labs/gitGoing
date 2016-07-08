var router = require('express').Router();
const auth = require('../util/authentication.js');

module.exports = function(app, redisClient) {
  router.route('/signin')
    .get(function(req,res) {
      res.render('signin.html');
    });

  router.route('/logout')
    .get(function(req, res) {
      req.session.destroy(function(err) {
        if (err) {
          console.log(err);
        }
        res.clearCookie('connect.sid');
        req.logout();
        res.redirect('/signin');
      });
    });

  router.route('/*') // all routes not explicity defined
    .get(auth.authRedirect, function (req, res) {
      res.render('index.html');
    });

   router.route('/')
     .get(auth.authRedirect, function (req, res) {
       res.render('index.html');
     });   

  app.use('', router);
};