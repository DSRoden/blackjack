(function(){
    'use strict';

    angular.module('hapi-auth')
        .factory('Room', ['$http', function($http){

            function makeRoom(room){
                return $http.post('/rooms', room);
            }

            function getRooms(){
                return $http.get('/rooms');
            }

            function join(room){
                return $http.post('/rooms/' + room.name, {password: room.password});
            }

            return {makeRoom:makeRoom, getRooms:getRooms, join:join};
        }]);
})();
