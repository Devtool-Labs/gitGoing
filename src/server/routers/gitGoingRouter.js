var router = require('express').Router();
var controllers = require('../controllers/controllers.js');
const passport = require('passport');

router.route('/auth/github')
  .get(passport.authenticate('github', { scope: [ 'user:email' ] }));
  // .post()

router.route('/auth/github/callback') 
  .get(passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
