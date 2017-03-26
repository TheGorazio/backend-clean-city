'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Urn = mongoose.model('Urn', {
  id: 'number',
  fill: 'number',
  battery: 'number',
  position: {
    latitude: 'number',
    longitude: 'number'
  },
  data: 'array'
});

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
  /*Urn.remove({}, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('Ok');
  });*/
  disconnect();
});

/*
 * GET urn by id
 * @param id - number
 */

router.get('/:id', (req, res, next) => {
  connect();  
  Urn.findOne({id: req.params.id}, function(err, urn) {
    if (err) res.status(500).send(err);
    res.status(200).send(JSON.stringify(urn));
  });
  disconnect();
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
  mongoose.connect('mongodb://smart-nosql:fokX9IBRKOVwup6C7N58X7puEB6fCRFSxSA2crKv2LIGzXapheleLQMeo2J5NrrN3FNwbiX7MVChmYNRYIPZvw==@smart-nosql.documents.azure.com:10250/smartdata?ssl=true');
}
function disconnect() {
  mongoose.disconnect();
}

module.exports = router;
