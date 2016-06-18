const express = require('express');
const app = express();
const router = require('./routers/gitGoingRouter.js');
const port = process.env.PORT || 3000;
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authKeys = require('../../apiKeys.js');

app.engine('html', require('ejs').renderFile);
app.use(cookieParser());
app.use(session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());

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
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(express.static(`${__dirname}/../../dist/client`));
app.set('views', `${__dirname}/../../dist/client`);
app.use('/api', router);

app.get('/signin', function(req, res) {
  res.render('./signin.html');
})

app.get('/stubdata', function(req, res) {
  res.json({ data: "HEYYYY"});
})

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`listening to port: ${port}`);
});

module.exports = app;
