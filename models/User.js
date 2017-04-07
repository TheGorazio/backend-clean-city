const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
    name: 'string',
    password: 'string',
    regNumber: 'string',
    autoNumber: 'string',
    urns: []
}));