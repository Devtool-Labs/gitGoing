const router = require('express').Router();
//const passport = require('passport');
const redisUtil = require('../util/redisUtil'); 

module.exports = function(app, passport, redisClient) {
  let rUtil = redisUtil(redisClient);

  router.route('/room')
    .post(function(req,res) {
      rUtil.createRoom(req.user.id)
        .then(function(room) {
          console.log(room);
          res.json(room);
        })
    });

  router.route('/user')
    .get(function(req,res) {
      res.json(req.user);
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
}


