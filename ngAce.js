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
    *    markedLines: [],
    *    focusedLine: 1
    *  };
    * 
    * 
    *  Set Theme & Mode while passing in configuration object
    *  ------------
    *  <ace ace-config='ace' mode='markdown' theme='monokai'></ace>
    */
    app.directive('ace', function($timeout){
    	return {
            scope: {
                aceConfig : '=',
                theme : '@',
                mode : '@'
            },
            template: '<div class="editor ng-cloak"></div>',
    		restrict: 'E',
    		link: function(scope, elem, attrs){

                var markers = [];
    			var node = elem.find('div')[0];
    			var editor = ace.edit(node);
                window.editor = editor;
                editor.session.setOption("useWorker", false)
    			editor.setTheme("ace/theme/" + scope.theme);
    			editor.getSession().setMode("ace/mode/" + scope.mode);
                editor.setReadOnly(scope.readOnly);
                editor.$blockScrolling = Infinity
                editor.setValue(scope.aceConfig.text);
                scope.aceConfig.markedLines.forEach(function(line){
                    markLine(line);
                });
                setBreakPoints(scope.aceConfig.breakpoints);


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
                //            focusedLine
                // ------------------------------------
                // Update the UI when the binding changes
                scope.$watch('aceConfig.focusedLine', function(newValue, oldValue){
                    editor.gotoLine(newValue);
                });
                

                // ------------------------------------
                //            readOnly
                // ------------------------------------
                scope.$watch('aceConfig.isReadOnly', function(newValue, oldValue){
                        editor.setReadOnly(newValue);
                });

                // ------------------------------------
                //            breakpoints
                // ------------------------------------
                function setBreakPoints(breakpoints){
                    editor.session.clearBreakpoints();  
                    breakpoints.forEach(function(breakpoint){
                        editor.session.setBreakpoint(breakpoint - 1);
                    });
                    editor.clearSelection();
                }
                scope.$watchCollection('aceConfig.breakpoints', function(newValue, oldValue){
                    $timeout(function(){
                        setBreakPoints(newValue);
                    }); 
                });


                // ------------------------------------
                //            markedLines
                // ------------------------------------
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
