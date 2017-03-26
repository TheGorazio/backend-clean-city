var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Some data from urns index');
});

module.exports = router;
