const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter.js');
const staticRouter = require('./routers/staticRouter.js');
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bluebird =require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient();



app.engine('html', require('ejs').renderFile);
app.use(cookieParser());
app.use(session({
  secret: 'mysecret',
  saveUninitialized: false,
  resave: true,
  store: new RedisStore(),
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport, redisClient);

app.use(express.static(`${__dirname}/../../dist/client`));
app.set('views', `${__dirname}/../../dist/client`);
apiRouter(app, redisClient);
staticRouter(app, redisClient);



app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`listening to port: ${port}`);
});

module.exports = app;

