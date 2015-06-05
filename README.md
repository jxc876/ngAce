# ngAce

A simple wrapper around [Ace editor](http://ace.c9.io/)


## Usage

Inside your HTML:

    <ace ace-config='ace' mode='cobol' theme='github'></ace>

Inside your controller:

    $scope.ace = {
        text : 'Hello from *Angular*\n Hello Again\n Goodybe World',
        isReadOnly : true,
        markedLines : [2],
        breakpoints: [1,3]
    };

Give the directive a min-size so its contents are visible:

	.editor {
		min-size: 300px;		
	}


## Customize

To change the look of the currently selected line use the following css:

    .highlighted-row

To change the look of the breakpoints use the following css: 

    .ace_gutter-cell.ace_breakpoint 

