var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/',(req,res)=> res.send('testing'));

module.exports = app;