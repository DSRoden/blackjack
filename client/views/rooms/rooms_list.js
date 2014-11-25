(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('RoomsListCtrl', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state){
            $scope.messageObject = {};

            $scope.chat = function(msg){
                $scope.messageObject.avatar = $rootScope.rootuser.avatar;
                $scope.messageObject.msg = msg;
                var messageObject = $scope.messageObject;
                socket.emit('globalChat', messageObject);
                $scope.messageObject={};
                $scope.message = null;
            };

            socket.on('bGlobalChat', function(data){
                $('#messages').append('<img id="avatarimg", src="'+ data.avatar +'"/>').append('<div>'+data.msg+'</div>');

            });
        }]);
})();
