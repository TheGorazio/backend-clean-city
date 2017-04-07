'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const Urn = require('../models/Urn');
const User = require('../models/User');

/*
 * GET all urns
 */
router.get('/', (req, res, next) => {
  if (req.body.id) next();
  connect(); 
  Urn.find((err, urns) => {
    if (err) res.status(500).send('Error');
    res.json(urns);
  });
  disconnect();
});

/*
 * GET urn by id
 * @param id - number
 */

router.get('/:id', (req, res, next) => {
  connect();  
  Urn.findOne({deviceId: req.params.id}, function(err, urn) {
    disconnect();
    if (err) res.status(500).send(err);
    res.status(200).send(JSON.stringify(urn));
  });
});

/*
  * GET urn for user with regNumber
  * @param regNumber - string
  */
router.get('/foruser/:regNumber', (req, res, next) => {
  connect();
  User.findOne({regNumber: req.params.regNumber}, (err, user) => {
    if (err) {
      disconnect();
      res.status(500).send('RegNumber not found');
    }
    else {
      Urn.find({deviceId: { $in: user.urns }}, (err, urns) => {
        if (err) {
          disconnect();
          res.status(500).send('Where are no urns');
        } else {
          disconnect();
          res.status(200).send({
            urns: urns
          });
        }
      });
    }
  });
});
/*
 * PUT new urn
 */

router.put('/new', (req, res, next) => {
  console.log(req.body);
  for(let u of req.body.urns) {
    var urn = new Urn({
      id: u.id,
      fill: u.fill,
      battery: u.battery,
      position: u.position,
      data: u.data
    });
    urn.save();
  }  
  res.send(req.body);
});

router.post('/delete', (req, res, next) => {

});

function connect() {
    mongoose.connect('mongodb://cleancity-data:Rm7nJX7zTquWCqnd0pQpkOsurW8YlrxSJ6yoFpNf7syaHW9qXlkXmenfyiDiugOndgyWv1DfCqcSRlyewU7rAw==@cleancity-data.documents.azure.com:10250/smartdata?ssl=true');
}
function disconnect() {
  mongoose.disconnect();
}

module.exports = router;
