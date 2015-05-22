(function(){
    var app = angular.module('ngAce',[]);

    /*
    * Usage: 
    *
    *  Define a configuration object
    *  --------------
    *  $scope.ace = {
    *    text = 'Hello from angular',
    *    isReadOnly : false,
    *    annotations: [],
    *    markedLines: []
    *  };
    * 
    * 
    *  Set Theme & Mode while passing in configuration object
    *  ------------
    *  <div ace="" ace-config='ace' mode='markdown' theme='monokai' class="editor"></div>
    */
    app.directive('ace', function($timeout){
    	return {
            scope: {
                aceConfig : '=',
                theme : '@',
                mode : '@'
            },
    		restrict: 'A',
    		link: function(scope, elem, attrs){
    			var node = elem[0];
    			var editor = ace.edit(node);
                editor.session.setOption("useWorker", false)
    			editor.setTheme("ace/theme/" + scope.theme);
    			editor.getSession().setMode("ace/mode/" + scope.mode);
                editor.setReadOnly(scope.readOnly);
                editor.$blockScrolling = Infinity
                editor.setValue(scope.aceConfig.text);
                editor.getSession().setAnnotations(scope.aceConfig.annotations);
                scope.aceConfig.markedLines.forEach(function(line){
                    markLine(line);
                });

                // ------------------------------------
                //            text
                // ------------------------------------
                // Update the binding when the UI changes 
                editor.on('change', function(e){
                    $timeout(function() { 
                        if (scope.aceConfig.text !== editor.getValue()){
                            scope.aceConfig.text = editor.getValue();
                        }
                    });

                });
                // Update the UI when the binding changes
                scope.$watch('aceConfig.text', function(newValue, oldValue){
                    editor.setValue(newValue);
                    editor.clearSelection();
                    editor.getSession().setAnnotations(scope.aceConfig.annotations);
                });


                // ------------------------------------
                //            readOnly
                // ------------------------------------
                scope.$watch('aceConfig.isReadOnly', function(newValue, oldValue){
                        editor.setReadOnly(newValue);
                });


                // ------------------------------------
                //            annotations
                // ------------------------------------
                scope.$watchCollection('aceConfig.annotations', function(newValue, oldValue){
                    $timeout(function(){
                        editor.getSession().setAnnotations(scope.aceConfig.annotations);
                    }); 
                });


                // ------------------------------------
                //            markedLines
                // ------------------------------------
                var markers = [];
                function clearPreviousMarkedLine(){
                    if (markers.length > 0) {
                        markers.forEach(function(item){ editor.session.removeMarker(item); });
                        markers = [];
                    }
                }

                function markLine(lineNum){
                    var Range = ace.require('ace/range').Range;
                    var range = new Range(lineNum-1, 0, lineNum, 0);
                    var newMarker = editor.session.addMarker(range, "highlighted-row", "line", false); 
                    markers.push(newMarker);     
                }

                scope.$watchCollection('aceConfig.markedLines', function(newValue, oldValue){
                    $timeout(function(){
                        clearPreviousMarkedLine();
                        scope.aceConfig.markedLines.forEach(function(line){
                            markLine(line);
                        });
                    }); 
                });

    		}
    	};
    });

})();
