const authKeys = require('../../../apiKeys.js');
const GithubStrategy = require('passport-github').Strategy;

module.exports = function(passport, redisClient) {
  passport.use(new GithubStrategy({
    clientID: authKeys.gitHubAuth.clientID,
    clientSecret: authKeys.gitHubAuth.clientSecret,
    callbackURL: 'http://localhost:3000/api/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done){
    //console.log("ACCESS TOKEN:", accessToken);
    //console.log('profile', profile);
    //console.log('refreshToken', refreshToken);
    done(null, {
      accessToken: accessToken,
      profile: profile
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
}
