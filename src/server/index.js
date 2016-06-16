const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../../dist/client`));
app.set('views', `${__dirname}/../../dist/client`);


app.listen(port);
console.log(`listening to port: ${port}`);
module.exports = app;