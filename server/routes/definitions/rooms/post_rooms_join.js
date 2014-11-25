'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room');

module.exports = {
    description: 'Join a Room',
    tags:['rooms'],
    validate: {
        payload: {
            password: Joi.string().min(3).required()
        },
        params: {
            name: Joi.string().required()
        }
    },
    handler: function(request, reply){
        Room.decrypt({name: request.params.name, password: request.payload.password}, function(id){
                reply({roomId: id}).code(id ? 200 : 401);
            });

    }
};
