(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('RoomsListCtrl', ['$rootScope', '$scope', '$state', 'Room', function($rootScope, $scope, $state, Room){
            $scope.messages = [];
            $scope.room = {};
            $scope.rooms = [];
            $scope.error = false;

            $scope.join = function(room){
                Room.join({name:room.name, password:this.password}).then(function(response){
                   var roomId = response.data.roomId;
                   $state.go('rooms.detail', {roomId: roomId});

                }, function(){
                    toastr.error('Error joining, try again.');
                });
            };

            Room.getRooms().then(function(response){
                console.log('getting rooms', response);
                $scope.rooms = response.data.rooms;
                console.log('scope.rooms', $scope.rooms);
            }, function(){
               console.log('getRoom function or route failing');
            });

            $scope.createRoom = function(room){
                console.log('createRoom function');
                Room.makeRoom(room).then(function(response){
                    console.log('getting response from makeRoom function', response);
                    $scope.rooms.push(response.data);

                    toastr.success('Created new room!');
                    $scope.room = {};
                }, function(){
                    console.log('getting error from makeRoom function');
                    $scope.error = true;
                    toastr.error('Room invalid, try again.');
                    $scope.room = {};
                });
            };

            $scope.chat = function(msg){
                socket.emit('globalChat', {avatar:$rootScope.rootuser.avatar, content:msg});
            };

            socket.on('bGlobalChat', function(data){
                $scope.messages.unshift(data);
                $scope.messages = $scope.messages.slice(0, 100);
                $scope.message = null;
                $('#message').focus();
                $scope.$digest();
            });
        }]);
})();


