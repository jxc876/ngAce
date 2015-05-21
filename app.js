(function(){
    var app = angular.module('app',[]);


    app.controller('MainCtrl', function($scope){

        $scope.ace = {
            text : 'Hello from *Angular*',
            isReadOnly : false
        };

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

                // ------------------------------------
                //            text
                // ------------------------------------
                // Update the binding when the UI changes 
                editor.on('change', function(e){
                    console.log('change event triggered')
                    $timeout(function() { 
                        if (scope.text !== editor.getValue()){
                            scope.text = editor.getValue();
                        }
                    });

                });
                // Update the UI when the binding changes
                scope.$watch('text', function(newValue, oldValue){
                    editor.setValue(newValue);
                    editor.clearSelection();
                });


                // ------------------------------------
                //            readOnly
                // ------------------------------------
                scope.$watch('readOnly', function(newValue, oldValue){
                        editor.setReadOnly(newValue);
                });
    		}
    	};
    });

})();
