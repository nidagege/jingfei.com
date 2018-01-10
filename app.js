const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const app = express();
app.listen(8000);
app.use(bodyParser.urlencoded({}));

app.use('/user',user);





app.use(static('./public'));