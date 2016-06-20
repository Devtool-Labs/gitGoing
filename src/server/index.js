const express = require('express');
const app = express();
const router = require('./routers/apiRouter.js');
const staticRouter = require('./routers/staticRouter.js');
const port = process.env.PORT || 3000;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.engine('html', require('ejs').renderFile);
app.use(cookieParser());
app.use(session({
  secret: 'mysecret',
  saveUninitialized: false,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);

app.use(express.static(`${__dirname}/../../dist/client`));
app.set('views', `${__dirname}/../../dist/client`);
app.use('/api', router);
app.use('', staticRouter);



app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`listening to port: ${port}`);
});

module.exports = app;

