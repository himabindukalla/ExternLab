var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
var PORT = 3000;

app.use('/api', router);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
