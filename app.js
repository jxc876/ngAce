(function(){
    var app = angular.module('app',[]);


    app.controller('MainCtrl', function($scope){
    	$scope.text = 'Hello from *Angular*';
        $scope.isReadOnly = true;
    });

    app.directive('ace', function($timeout){
    	return {
            scope: {
                theme : '@',
                mode : '@',
                readOnly: '=',
                text : '='
            },
    		restrict: 'A',
    		link: function(scope, elem, attrs){
    			var node = elem[0];
    			var editor = ace.edit(node);
    			editor.setTheme("ace/theme/" + scope.theme);
    			editor.getSession().setMode("ace/mode/" + scope.mode);
                editor.setReadOnly(scope.readOnly);
                editor.setValue(scope.text);

                editor.on('change', function(e){
                    console.log('change event triggered')
                    $timeout(function() { 
                        if (scope.text !== editor.getValue()){
                            scope.text = editor.getValue();
                        }
                    });

                });

                scope.$watch('text', function(newValue, oldValue){
                    editor.setValue(newValue);
                    editor.clearSelection();
                });


    		}
    	};
    });

})();
