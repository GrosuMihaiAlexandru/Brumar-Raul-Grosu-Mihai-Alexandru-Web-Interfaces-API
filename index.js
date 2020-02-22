const express = require('express');
const oauth = require('./routes/oauth-routes');
const app = express();
const port = 3000;

// oauth router
app.use('/users/auth', oauth);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));