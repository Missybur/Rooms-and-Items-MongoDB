'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/roomsapp");

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/', require('./routes/index'));
app.use('/items', require('./routes/items'));
app.use('/rooms', require('./routes/rooms'));


app.use(function(req, res){
  res.status(404).render('404')
})

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
