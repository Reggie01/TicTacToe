function Node( data ) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
    
function Tree( data ) {
    var node = new Node( data );
    this._root = node;
}  

Tree.prototype.traverseDF = function( callback ) {
    
    // this is a recurse and immediately-invoking function
    ( function recurse( currentNode ) {
         // step 2
         for ( var i = 0, length = currentNode.children.length; i < length; i++ ) {
              // step 3
              recurse( currentNode.children[i] );
         }
         
         // Step 4
         callback( currentNode );
     
    })( this._root );    
};

var tree = new Tree('one');
 
tree._root.children.push( new Node('two') );
tree._root.children[0].parent = tree;
 
tree._root.children.push( new Node( "three" ) );
tree._root.children[1].parent = tree;

tree._root.children.push( new Node( "four" ) );
tree._root.children[2].parent = tree;

tree._root.children.push( new Node( "five" ) );
tree._root.children[3].parent = tree;

tree._root.children[0].children.push( new Node( "six" ) );
tree._root.children[0].children[0].parent = tree._root.children[0];

// tree.traverseDF( function( node ) { console.log( node ); } );

// root
var gameTree = new Tree( 0 );

// kids
gameTree._root.children.push( new Node(0) );
gameTree._root.children[0].parent = gameTree;

gameTree._root.children.push( new Node( 0 ) );
gameTree._root.children[1].parent = gameTree;

// grandkids
gameTree._root.children[0].children.push( new Node( 0 ) );
gameTree._root.children[0].children[0].parent = gameTree._root.children[0];

gameTree._root.children[0].children.push( new Node( 0 ) );
gameTree._root.children[0].children[1].parent = gameTree._root.children[0];

gameTree._root.children[1].children.push( new Node( 0 ) );
gameTree._root.children[1].children[0].parent = gameTree._root.children[1];

gameTree._root.children[1].children.push( new Node( 0 ) );
gameTree._root.children[1].children[1].parent = gameTree._root.children[1];

// great-grandkids 
gameTree._root.children[0].children[0].children.push( new Node( 0 ) );
gameTree._root.children[0].children[0].children[0].parent = gameTree._root.children[0].children[0];

gameTree._root.children[0].children[0].children.push( new Node( 0 ) );
gameTree._root.children[0].children[0].children[1].parent = gameTree._root.children[0].children[0];

gameTree._root.children[0].children[1].children.push( new Node( 0 ) );
gameTree._root.children[0].children[1].children[0].parent = gameTree._root.children[0].children[1];

gameTree._root.children[1].children[0].children.push( new Node( 0 ) );
gameTree._root.children[1].children[0].children[0].parent = gameTree._root.children[1].children[0];

gameTree._root.children[1].children[0].children.push( new Node( 0 ) );
gameTree._root.children[1].children[0].children[1].parent = gameTree._root.children[1].children[0]; 

gameTree._root.children[1].children[1].children.push( new Node( 0 ) );
gameTree._root.children[1].children[1].children[0].parent = gameTree._root.children[1].children[1];

// great-great grandkids
gameTree._root.children[0].children[0].children[0].children.push( new Node( 10 ) );
gameTree._root.children[0].children[0].children[0].children[0].parent = gameTree._root.children[0].children[0].children[0];

gameTree._root.children[0].children[0].children[0].children.push( new Node( Number.MAX_VALUE ) );
gameTree._root.children[0].children[0].children[0].children[1].parent = gameTree._root.children[0].children[0].children[0];

gameTree._root.children[0].children[0].children[1].children.push( new Node( 5 ) );
gameTree._root.children[0].children[0].children[1].children[0].parent = gameTree._root.children[0].children[0].children[1];

gameTree._root.children[0].children[1].children[0].children.push( new Node( -10) );
gameTree._root.children[0].children[1].children[0].children[0].parent = gameTree._root.children[0].children[1].children[0];

gameTree._root.children[1].children[0].children[0].children.push( new Node( 7 ) );
gameTree._root.children[1].children[0].children[0].children[0].parent = gameTree._root.children[1].children[0].children[0];

gameTree._root.children[1].children[0].children[0].children.push( new Node( 5 ) );
gameTree._root.children[1].children[0].children[0].children[1].parent = gameTree._root.children[1].children[0].children[0];

gameTree._root.children[1].children[0].children[1].children.push( new Node( Number.MIN_VALUE ) );
gameTree._root.children[1].children[0].children[1].children[0].parent = gameTree._root.children[1].children[0].children[1];

gameTree._root.children[1].children[1].children[0].children.push( new Node( -7 ) );
gameTree._root.children[1].children[1].children[0].children[0].parent = gameTree._root.children[1].children[1].children[0];

gameTree._root.children[1].children[1].children[0].children.push( new Node( -5 ) );
gameTree._root.children[1].children[1].children[0].children[1].parent = gameTree._root.children[1].children[1].children[0];


// console.log( gameTree );

function minimax( node, depth, maximizingPlayer ) {
    if (depth === 0 || node.data ){
        return node.data
    }
    
    if( maximizingPlayer ) {
         var bestValue = -Number.MAX_VALUE;
         for( var i = 0; i < node.children.length; i++ ) {
              var v = minimax( node.children[i], depth - 1, false );
              bestValue = Math.max( bestValue, v );              
         }
         return bestValue;
    }
    
    else {
        var bestValue = Number.MAX_VALUE;
        for( var i = 0; i < node.children.length; i++ ) {
             var v = minimax( node.children[i], depth - 1, true );
             bestValue = Math.min( bestValue, v );
        }
        return bestValue;
    }
}

if ('speechSynthesis' in window) {
 // Synthesis support. Make your web apps talk!
 var msg = new SpeechSynthesisUtterance( "Let's play tic tac toe" );
 window.speechSynthesis.speak(msg);
 
 speechSynthesis.getVoices().forEach(function(voice) {
     console.log(voice.name, voice.default ? '(default)' :'');
 });
 
   var msg = new SpeechSynthesisUtterance('I see dead people!');
   if ( speechSynthesis.getVoices() ) {
        msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google UK English Female'; })[0];
   }
  
   if( msg.voice ) {
       speechSynthesis.speak(msg);
   }

}


// console.log( minimax( gameTree._root, 4, true ) );

var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function tictactoe( board ) {
    for( var i = 0; i < 3; i++ ) {
        for( var j = 0; j < 3; j++ ){
         
             if( !board[i][j] ) {
                 board[i][j] = 1;
                 tictactoe( board );
                 board[i][j] = 0;
             }
        }
    }
    console.log( board );
}

// tictactoe( board );
console.log( board );









