var router = require('express').Router();
const passport = require('passport');


module.exports = function(app, redisClient) {
  router.route('/auth/github')
    .get(passport.authenticate('github', { scope: [ 'user:email' ] }));

  router.route('/auth/github/callback') 
    .get(passport.authenticate('github', { failureRedirect: '/signin' }),
    function(req, res) {
      if(req.user) {
        const userId = req.user.profile.id;
      }
      
      res.redirect('/');
    });
    
  app.use('/api', router);
}

