var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const Urn = mongoose.model('User', new mongoose.Schema({
    name: 'string',
    password: 'string',
    regNumber: 'string',
    autoNumber: 'string',
    urns: 'string[]'
}));

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
    autoNumber: 'a123aa',
    urns: [
      'TestDevice1',
      'TestDevice2'
    ]
  });
  user2 = new User({
    name: 'anton',
    password: 'anton',
    regNumber: '091-666d',
    autoNumber: 'p103ap',
    urns: [
      'TestDevice3',
      'TestDevice2'
    ]
  });
  user1.save().then(user2.save()).then(() => {res.send('respond with a resource');disconnect();}).catch((err) => console.error(err));
});

router.post('/', (req, res, next) => {
  const user = request.body.user;
  User.find({name: user.name, password: user.password})
    .then((err, device) => {
      res.status(200).send('OK');
    })
    .catch((err) => res.status(500).send('Error'));
});



module.exports = router;
