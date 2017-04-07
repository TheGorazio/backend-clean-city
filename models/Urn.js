const mongoose = require('mongoose');
module.exports = mongoose.model('Urn', new mongoose.Schema({
    deviceId: 'string',
    position: {
        latitude: 'number',
        longitude: 'number'
    },
    history: [
        {
            date: 'string',
            fill: 'number',
            battery: 'number'
        }
    ]
}));