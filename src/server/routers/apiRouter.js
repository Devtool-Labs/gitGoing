const router = require('express').Router();
//const passport = require('passport');
const redisUtil = require('../util/redisUtil');
const isAuthenticated = require('../util/authentication.js');

module.exports = function(app, passport, redisClient) {
  let rUtil = redisUtil(redisClient);
  // Do the auth check

  router.route('/room')
    .get(isAuthenticated, function(req,res) {
      console.log("inside of /room, .get route");
      console.log('req.isAuthenticated()', req.isAuthenticated());
      res.json({status: 'success!'});
    });


  router.route('/auth/github')
    .get(passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.route('/auth/github/callback')
    .get(passport.authenticate('github', { failureRedirect: '/signin' }),
    function(req, res) {
      if(req.user) {
        const userId = req.user.profile.id;
        const userObj = {
          id: userId,
          accessToken: req.user.accessToken,
          displayName: req.user.profile.displayName,
          username: req.user.profile.username,
          profileUrl: req.user.profile.profileUrl,
          provider: req.user.profile.provider,
          photos: req.user.profile.photos 
        }
        rUtil.checkAndSetUser(userId,JSON.stringify(userObj));
      }
      res.redirect('/');
    });

  app.use('/api', router);

  // For testing
  router.route('/test') 
    .get(function(req, res, next) {console.log('haha I am in the middleware'); next()}, function(req, res) {
      console.log('the req.originalUrl looks like this: ', req.originalUrl);
      res.json('Hello, World');
    });
}
