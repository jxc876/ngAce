# ngAce

A simple wrapper around [Ace editor](http://ace.c9.io/)


## Setup

Inside your HTML:

    <ace ace-config='ace' mode='cobol' theme='github'></ace>

Inside your controller:

    $scope.ace = {
        text : 'Hello from *Angular*\n Hello Again\n Goodybe World',
        isReadOnly : true,
        markedLines : [2],
        breakpoints: [1,3]
    };

Give the directive a width so its contents are visible:

	.editor {
		width: 300px;		
	}


## Usage

Just update your model, and the directive will take care of updating the view.
See the demo page for some examples.


## Customize

To change the look of the currently selected line use the following css:

    .highlighted-row

To change the look of the breakpoints use the following css: 

    .ace_gutter-cell.ace_breakpoint 

