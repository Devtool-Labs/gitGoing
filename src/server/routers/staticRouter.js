var router = require('express').Router();
const isAuthenticated = require('../util/authentication.js');

module.exports = function(app, redisClient) {
  router.route('/signin')
    .get(function(req,res) {
      res.render('./signin.html');
    });

  router.route('/testapi')
    .get(function(req,res) {
      res.json({hey: 'hey'});
    });

  router.route('/logout')
    .get(function(req, res) {
      req.session.destroy(function(err) {
        if (err) {
        }
        res.clearCookie('connect.sid');
        req.logout();
        res.redirect('/signin');
      });
    });

  router.route('/*') // all routes not explicity defined
    .get(function (req, res) {
      res.render('index.html');
    });

   router.route('/')
     .get(isAuthenticated, function (req, res) {
       res.render('index.html');
     });   

  app.use('', router);
};

/*
res.redirect('/signin');
res.render('index.html');
*/

