const authKeys = require('../../../apiKeys.js');
const GithubStrategy = require('passport-github').Strategy;

module.exports = function(passport) {
  passport.use(new GithubStrategy({
    clientID: authKeys.gitHubAuth.clientID,
    clientSecret: authKeys.gitHubAuth.clientSecret,
    callbackURL: 'http://localhost:3000/api/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done){
    done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }));

  passport.serializeUser(function(user, done) {
    //console.log('SERAILIZE USER', user);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    //console.log('DESERAILIZE USER', obj);
    done(null, obj);
  });
}
