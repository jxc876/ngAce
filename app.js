(function(){
    var app = angular.module('app',[]);


    app.controller('MainCtrl', function($scope){
    	$scope.text = 'Hello from Angular';
        $scope.isReadOnly = true;
    });

    app.directive('ace', function(){
    	return {
            scope: {
                theme : '@',
                mode : '@',
                readOnly: '='
            },
    		restrict: 'A',
    		link: function(scope, elem, attrs){
    			var node = elem[0];
    			var editor = ace.edit(node);
    			editor.setTheme("ace/theme/" + scope.theme);
    			editor.getSession().setMode("ace/mode/" + scope.mode);
                editor.setReadOnly(scope.readOnly);
    		}
    	};
    });

})();
