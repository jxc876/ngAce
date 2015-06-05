(function(){
    var app = angular.module('app', ['ngAce']);


    app.controller('MainCtrl', function($scope){

        $scope.ace = {
            text : 'Hello from *Angular*\n Hello Again\n Goodybe World',
            isReadOnly : true,
            markedLines : [2],
            breakpoints: [1,3]
        };

        $scope.newMarkedLine = 1;

        $scope.addAnnotation = function(_row){
            var newAnnotation = {row: _row, column: 0,text: "Strange error",type: "error"}
            $scope.ace.annotations.push(newAnnotation);
        }

        $scope.markLine = function(_line){
            $scope.ace.markedLines.push(_line);
        }

    });

})();
