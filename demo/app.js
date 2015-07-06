(function(){
    var app = angular.module('app', ['ngAce']);


    app.controller('MainCtrl', function($scope){

        $scope.ace = {
            text : 'Hello from *Angular*\n Hello Again\n Goodybe World',
            isReadOnly : true,
            markedLines : [2],
            breakpoints: [1,3],
            focusedLine: 1
        };

        $scope.newMarkedLine = 1;
        $scope.newBreakpoint = 2;

        $scope.addBreakpoint = function(line){
            $scope.ace.breakpoints.push(line);
        }

        $scope.markLine = function(_line){
            $scope.ace.markedLines.push(_line);
        }

    });

})();
