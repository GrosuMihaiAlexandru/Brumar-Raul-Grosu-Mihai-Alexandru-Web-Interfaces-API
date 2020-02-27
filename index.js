const express = require('express');
const auth = require('./routes/auth-routes');
const items = require('./routes/items-routes');
const search = require('./routes/search-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// auth router
app.use('/auth', auth);
app.use('/items', items);
app.use('/search', search);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`API listening on port ${port}!`));