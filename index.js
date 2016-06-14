/* Current a Work in Progress */

var currentScene,
      checkBoxForX,
      checkBoxForO,
      player,
      computer,
      gameState;

/*
 * Player Object
*/
player = { 
    turn: false,
    icon: "",
    won: null
};

computer = {
   turn: false,
   icon: "",
   won: null
};

/* 
  * GameState Object
     keys: 
       isOver - boolean
       checkGameState - function
           parameters - array with gameboardState
           
*/  

gameState = {
    gameBoardState: [],
    player: { turn: false },
    checkHorizontally: function( board ) {
        var    count = 0,
                    row = 0,
              column = 0,
                   icon = gameState.player.turn ? player.icon: computer.icon; 
        
        for ( row; row < 3; row++ ){
            for ( column; column < 3; column++ ){
                if( board[row][column] === icon  ) {
                    count += 1;
                }         
            }
            if ( count === 3 ) {
                 return true;
            } 
            count = 0;
        }
        
        return false;
        
    },
    checkDiagonally: function( board ) {
         var      row = 0,
              column = 0,
                   icon = gameState.player.turn ? player.icon: computer.icon; 
                         
         if( board[0][0] === icon  && board[1][1] === icon  && board[2][2] === icon ) {
             return true;
         }
                                             
         if( board[2][0] === icon  && board[1][1] === icon  && board[0][2] === icon ) {
             return true;
         }
                                         
        return false;
    },
    checkVertically: function( board ) {
        var    count = 0,
                    row = 0,
              column = 0,
                   icon = gameState.player.turn ? player.icon: computer.icon;
               
        for ( column; column < 3; column++ ){
            for ( row; row < 3; row++ ){
                if( board[row][column] === icon ) {
                    count += 1;
                }         
            }
            if( count === 3 ) {
                return true;
            }          
            count = 0;            
        }
        
        return false;
    },   
    isGameOver: function( board ) {
        
        if( gameState.checkHorizontally( board )  
            || gameState.checkDiagonally( board ) 
            || gameState.checkVertically( board ) 
          ) {
            return true;
          }
        
         return false;
        
    },
    getScore: function( gameOver, game ) {
         
         if( gameOver ){
            if( game.player.turn ) {
                 return 10;
            } else {
                 return -10;
            }
         } else {
             return 0;
         }
          
    },
    initializeGameState: function() {
         var           row = 0,
                    column = 0,
             boardState = [];          
         
         for( row; row < 3; row++ ){
             boardState.push([]);
             for ( column; column < 3; column++ ){
                    boardState[row][column] = null;
             }
             column = 0;
         }
         
         this.gameBoardState = boardState;
    }, 
    
}
      
/*
    Draw First Screen
    parameters
      context - canvas context
      width - canvas width
      height - canvas height
*/

function drawFirstScreen( context, width, height ){
    
    var text = context.measureText( "Player play as X." );
    var text2 = context.measureText( "Player play as O." );
    
    currentScene = 1;
    context.font = "24px serif";

    context.beginPath();
    context.fillText( "Player play as X.", ( width/2 ) - text.width, height/3 );
    context.strokeRect( ( width / 2 ) + text.width/ .8, ( height/3 ) - 30, 30, 30 );
    context.fillText( "Player play as O.", ( width/2 ) - text2.width, height * 2/3 );
    context.strokeRect( ( width/2 ) + text2.width/ .8, ( height * 2/3 ) - 30, 30, 30 );
    context.closePath();
    
    checkBoxForX = { x: ( width / 2 ) + text.width/ 0.8, 
                                   x2: (( width / 2 ) + text.width/ 0.8) + 30,
                                   y: ( ( height/3 ) - 30 ),
                                   y2: ( ( height/3 ) - 30 ) + 30
                                   };
                                   
    checkBoxForO = { x: ( width / 2 ) + text2.width/ 0.8, 
                                   x2: (( width / 2 ) + text2.width/ 0.8 ) + 30,
                                   y: ( ( height * 2/3 ) - 30 ),
                                   y2: ( ( height * 2/3 ) - 30 ) + 30
                                   };   
                                
}

/*
    Create a tic tac board
*/
window.onload = function(){
  var canvas = document.getElementById( "canvas" );
  var width = canvas.width;
  var height = canvas.height;
  
  if( canvas.getContext ){   
    var context = canvas.getContext( "2d" ); 
  } else {
    console.log("Your browser does not support canvas." );
  }

  function setUpGameBoard() {
    context.clearRect( 0, 0, width, height );
    drawBoard();
    gameState.initializeGameState();
    
  }
  
  function drawBoard() {
     
     context.beginPath();
     context.moveTo( width/3, 0 );
     context.lineTo( width/3, height );
     
     context.moveTo( width * 2/3, 0 );
     context.lineTo( width * 2/3, height  );
     
     context.moveTo( 0, height * 1/3 );
     context.lineTo( width, height * 1/3 );
     
     context.moveTo( 0, height * 2/3 );
     context.lineTo( width, height * 2/3 );
     
     context.stroke();
     
    var msg = new SpeechSynthesisUtterance( "Setting up game board. \n\n Good luck!" );
    window.speechSynthesis.speak(msg);    
  }
  
  function Circle( x, y, radius ) {
    this.x = 0 || x;
    this.y = 0 || y;
    this.radius = 30 || radius;
    this.lineWidth = 1;
    this.color = "blue";
  }
  
  Circle.prototype.draw = function() {
     
     if( this.x < 100 ){
          this.x = 50;
       } else if( this.x < 200 ){
          this.x = 150;
       } else if( this.x < 300 ){
         this.x = 250;
       }
       
       if( this.y < 100 ){
          this.y = 50;
       } else if( this.y < 200 ){
          this.y = 150;
       } else if( this.y < 300 ){
          this.y = 250;
       }
     
     context.lineWidth = this.lineWidth;
     context.fillStyle = this.color;
     context.beginPath();
     context.arc( this.x, this.y, this.radius, 0, Math.PI * 2, false );
     context.closePath();
     context.stroke();
  }
  
  function X(x,y){
     this.width = this.height = 100 * .9;
     this.x = 0 || x;
     this.y = 0 || y;
     this.lineWidth = 1;
     this.color = "blue";
  }
  
  X.prototype.draw = function(){
       
       context.fillStyle = this.color;
       context.lineWidth = this.lineWidth;
       var x;
       var y;
      
       if( this.x < 100 ){
          x = 0;
       } else if( this.x < 200 ){
          x = 100;
       } else if( this.x < 300 ){
         x = 200;
       }
       
       if( this.y < 100 ){
          y = 0;
       } else if( this.y < 200 ){
          y = 100;
       } else if( this.y < 300 ){
         y = 200;
       }
       
       context.save();
       context.beginPath();
       
       context.moveTo( x + 10, y +10 );
       context.lineTo( x + 80, y + 80 );
       
       context.moveTo( x + 80, y + 10 );
       context.lineTo( x + 10, y + 80 ); 
       context.closePath();
       context.stroke();
         
  }
  
  function assignXandO( bool ) {
      if( bool ){
           player.icon = "x";
           computer.icon = "o";
      } else {
           player.icon = "o";
           computer.icon = "x";
      }
  }
  
  function handleSceneOne( x, y ) {
     var isPlayerX = false;
     
     if( x > checkBoxForX.x && x < checkBoxForX.x2 && y > checkBoxForX.y && y < checkBoxForX.y2 ){
         var width = checkBoxForX.x2 - checkBoxForX.x;
         var height = checkBoxForX.y2 - checkBoxForX.y;
         context.fillRect( checkBoxForX.x, checkBoxForX.y, width, height );
         
         isPlayerX = true;
         var msg = new SpeechSynthesisUtterance( "You chose x. \n Guess I'm o." );
         window.speechSynthesis.speak(msg);        
     } else if( x > checkBoxForO.x && x < checkBoxForO.x2 && y > checkBoxForO.y && y < checkBoxForO.y2 ) {
         var width = checkBoxForO.x2 - checkBoxForO.x;
         var height = checkBoxForO.y2 - checkBoxForO.y;
         context.fillRect( checkBoxForO.x, checkBoxForO.y, width, height );
         
         var msg = new SpeechSynthesisUtterance( "You chose o. \n Guess I'm x." );
         window.speechSynthesis.speak(msg);
     }
     
     return isPlayerX;
     
  }
  
  function whoGoesFirst() {
       return Math.random() > .5 ? true: false;
  }
  
  function handleSceneTwo( x, y ) {
       
       if( !gameState.isGameOver( gameState.gameBoardState ) ){
            if( gameState.player.turn ){                
                drawSymbol( player.icon, x, y );
                updateGameBoard( player.icon, x, y );
                gameState.player.turn = !gameState.player.turn;             
            } else {
               console.log( "Computer turn : " + computer.turn );
            }
       } else {
            drawGameOver();
            currentScene = 3;
       }      
  }
  
  function handleSceneThree() {
      console.log( "Play again? " );
  }
  
  function drawGameOver() {
      var playAgainText = "Play again??",
            textDimensions,
            text;
            
      if( player.won ) {
          text = "Player won!!";
          textDimensions = context.measureText( text );
      } else if( computer.won ) {
          text = "Computer won. :(";
          textDimensions = context.measureText( text );
      }
      
      context.beginPath();
      context.clearRect( 0, 0, width, height );
      context.fillText( text, 25, height / 4 );
      context.fillText( playAgainText, 25, height * ( 3 / 4 ) );
      context.closePath();
      
  }
  
  function drawPlayerDecision() {
       var text = "Player icon: " + player.icon;
       var textDimensions = context.measureText( "Player play as X." );
      
       context.clearRect( 0, 0, width, height );
       context.beginPath();
       context.fillText( text, ( width/2 ) - textDimensions.width / 2, height/2 );
       context.closePath(); 
       
       player.info = true;       
  }
  
  function drawPlayerChoice( player ) {
       setTimeout( function() { drawPlayerDecision(); }.bind( this ), 500 );
  }
  
  function updateGameBoard( icon, x, y ) {
      
       if( x <= 100 && y <= 100 ){
          gameState.gameBoardState[0][0] = icon;
       } else if( x <= 200 && y <= 100) {
          gameState.gameBoardState[0][1] = icon;
       } else if( x <= 300 && y <= 100 ){
          gameState.gameBoardState[0][2] = icon;
       } else if( x <= 100 && y <= 200 ){
          gameState.gameBoardState[1][0] = icon;
       } else if( x <= 200 && y <= 200 ){
          gameState.gameBoardState[1][1] = icon;
       } else if( x <= 300 && y <= 200 ){
          gameState.gameBoardState[1][2] = icon;
       } else if( x <=100 && y <= 300 ){
          gameState.gameBoardState[2][0] = icon;
       } else if( x < 200 && y <= 300 ) {
          gameState.gameBoardState[2][1] = icon;
       } else if( x < 300 && y <= 300 ){
          gameState.gameBoardState[2][2] = icon;
       }
       
  }
  
  function drawSymbol( playerSymbol, x, y ){
       if ( playerSymbol === "x" ){
            var img = new X( x, y );
       } else if( playerSymbol === "o" ){
            var img = new Circle( x, y );
       }
       img.draw();      
  }
  
  function getPossibleMoves( game ) {
       var possibleCoordinates = [],
                                    column = 0,
                                          row = 0; 
       
       for( row; row < 3; row++ ){
            possibleCoordinates.push( [] );
            for( column; column < 3; column++ ){
                if( game[row][column] === null ) {
                    possibleCoordinates[row].push( { 
                        row: row, column: column
                    })
                }
            }
            column = 0;
       }
       
       console.log( possibleCoordinates );
       
       return possibleCoordinates;
  }
  
  function get_new_state( game ) {
      var column = 0,
                  row = 0,
                 icon = player.turn ? player.icon : computer.icon;
      
      game[move.row][move.column] = icon;
      
      return game;
     
  }
  
  function minimax ( game ) {
       console.log( game );
       if( game.isGameOver( game ) ){
            return game.getScore( game );
       }
       
       var scores = [];
       var moves = [];
       var newBoard;
       var nextMoves = getPossibleMoves( game.boardState );
       nextMoves.map( function( move ) {
           var possible_game = get_new_state( game.boardState );
           scores.push( minimax( game.boardState ) );
           moves.push( move );
       });
      console.log( nextMoves );
      
      if( game.player.turn ) {
           var max_score_index = Math.max.apply( null, scores );
           var choice = moves[max_score_index];
           return scores[max_score_index];             
      } else {
           var min_score_index = Math.min.apply( null, scores );
           var choice = moves[min_score_index];
           return scores[min_score_index];
      }
  }
  
  var game = Object.create( gameState );
  game.initializeGameState();
  game.boardState[0][0] = "o";
  game.boardState[0][2] = "x";
  game.boardState[1][0] = "x";
  game.boardState[2][0] = "x";
  game.boardState[2][1] = "o";
  game.boardState[2][2] = "o";
  
  game.player.turn = true;
  
  minimax( game );
  
  function clickHandler( e ){
       
       var canvasLeft = canvas.getBoundingClientRect().left,
             canvasTop = canvas.getBoundingClientRect().top,
                              x = e.clientX - canvasLeft,
                              y = e.clientY - canvasTop,
                         currentPlayerTurn;
       
       if( currentScene === 1 ){
           var isPlayerX = handleSceneOne( x, y );
           assignXandO( isPlayerX );
           drawPlayerChoice();
           if( player ){
              currentScene = 2;
              setTimeout( setUpGameBoard, 3000 );              
           }
           var isPlayerTurn = whoGoesFirst();
           gameState.player = isPlayerTurn;
           
           console.log( "Player turn: " + player.turn );
       } else if( currentScene === 2 ){
           console.log( "Player turn: " + player.turn );
           handleSceneTwo( x, y );
       } else if( currentScene === 3 ){
           handleSceneThree();
       }
       
  }
  
  canvas.addEventListener( "click", clickHandler );
  
  canvas.addEventListener( "resize", function() {
      console.log( "resizing canvas... " );
  });
  
  drawFirstScreen( context, width, height );
  
  var game2 = Object.create( gameState );
  // console.log( game2 );
  game2.initializeGameState();
  game2.gameBoardState[0][0] = "x";
  game2.gameBoardState[1][0] = "x";
  game2.gameBoardState[2][0] = "x";
  // console.log( game2 );
  // console.log( game2.gameBoardState );
  
  var game3 = Object.create( gameState );
  game3.initializeGameState();
  // console.log( game3 );
  

}















