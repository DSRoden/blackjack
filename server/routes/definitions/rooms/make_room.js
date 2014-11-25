'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room');

module.exports = {
    description: 'Create a Room',
    tags:['rooms'],
    validate: {
        payload: {
            name: Joi.string().required(),
            password: Joi.string().min(3).required()
        }
    },
    auth: {
        mode: 'try'
    },
    handler: function(request, reply){
        request.payload.creator = request.auth.credentials._id;
        console.log(request.payload);
        var room = new Room(request.payload);
        room.encrypt();
        room.save(function(err){
            room.creator.avatar = request.auth.credentials.avatar;
            console.log(room);
            reply({name: room.name, creator:{avatar:request.auth.credentials.avatar}}).code(err ? 401 : 200);
        });
    }
};
