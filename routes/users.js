var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
const User = require('../models/User');

function connect() {
    mongoose.connect('mongodb://cleancity-data:Rm7nJX7zTquWCqnd0pQpkOsurW8YlrxSJ6yoFpNf7syaHW9qXlkXmenfyiDiugOndgyWv1DfCqcSRlyewU7rAw==@cleancity-data.documents.azure.com:10250/smartdata?ssl=true');
}
function disconnect() {
    mongoose.disconnect();
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  connect();
  let user1, user2;
  user1 = new User({
    name: 'gleb',
    password: 'gleb',
    regNumber: '123-441m',
    phone: '88005553535',
    urns: [
      'TestDevice1',
      'TestDevice2'
    ]
  });
  user2 = new User({
    name: 'anton',
    password: 'anton',
    regNumber: '091-666d',
    phone: '0931223451',
    urns: [
      'TestDevice3',
      'TestDevice2'
    ]
  });
  user1.save().then(user2.save()).then(() => {res.send('respond with a resource');disconnect();}).catch((err) => console.error(err));
});

router.post('/', (req, res, next) => {
  connect();
  User.findOne({name: req.body.name, password: req.body.password}, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
    } else {
      console.log('Success', user);
      disconnect();
      res.status(200).send({
        name: user.name,
        phone: user.phone,
        regNumber: user.regNumber,
        urns: user.urns
      });
    }
  });
});



module.exports = router;
