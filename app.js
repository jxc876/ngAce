(function(){
    var app = angular.module('app', ['ngAce']);


    app.controller('MainCtrl', function($scope){

        $scope.ace = {
            text : 'Hello from *Angular*',
            isReadOnly : false,
            annotations: [{row: 0, column: 0,text: "Strange error",type: "error"}],
            markedLines : []
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
