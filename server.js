var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');


var app = express();
app.use(bodyParser.json());

var db = mongojs('ecommerce', ['products']);

app.post('/api/products', function(req, res, next) {
  db.products.save(req.body, function (err, response) {
    if(err){
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  });
});

app.get('/api/products', function(req, res, next) {
  db.products.find({}, function (err, response) {
    if (err) {
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  });
});
app.get('/api/products/:id', function(req, res, next) {
  db.products.find({_id: mongojs.ObjectId(req.params.id)}, function (err, response) {
    if (err) {
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  });
});
app.put('/api/products/:id', function(req, res, next) {
  if(!req.params.id){
    return res.status(400).send('id query needed');
  }
  db.products.update({_id: mongojs.ObjectId(req.params.id)}, req.body, function (err, response) {
    if (err) {
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  });
});
app.delete('/api/products/:id', function(req, res, next) {
  if (!req.params.id) {
    return res. status(400).send('id query needed');
  }
  db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, response) {
    if (err) {
      return res.status(500).json(error);
    } else {
      return res.json(response);
    }
  })
});








var port = 3000;

app.listen(port, function() {
    console.log('NSA link on port ' + port);
    console.log(new Date());
    console.log('--------------------------');
});
