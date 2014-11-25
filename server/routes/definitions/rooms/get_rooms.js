'use strict';

var    Room = require('../../../models/room');

module.exports = {
    description: 'All Rooms',
    notes: 'All Rooms',
    tags:['rooms'],
    handler: function(request, reply){
        Room.find().populate('creator').exec(function(err, rooms){
            reply({rooms:rooms});
        });
    }
};
