(function(){
    var app = angular.module('app',[]);
    app.controller('MainCtrl', function($scope){
    	$scope.text = 'Hello from Angular';
    });

    app.directive('ace', function(){
    	return {
    		restrict: 'A',
    		link: function(scope, elem, attrs){
    			var node = elem[0];
    			var editor = ace.edit(node);
    			editor.setTheme("ace/theme/monokai");
    			editor.getSession().setMode("ace/mode/markdown");
    		}
    	};
    });

})();
