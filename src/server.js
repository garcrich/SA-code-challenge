const express = require('express');
const bodyParser = require('body-parser').json();
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.post('/form-submission', bodyParser, function (req, res) {
    res.send(`Thanks ${req.body.name}!`);
})

app.listen(process.env.PORT || 8080);