const express = require('express');
const oauth = require('./routes/oauth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
const port = 3000;

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to mongodb");
});

// oauth router
app.use('/users/auth', oauth);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));