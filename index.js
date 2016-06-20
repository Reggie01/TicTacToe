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
};

computer = {
   turn: false,
   icon: "",
};

/*
* Gameboard object
*/


/* 
  * GameState Object
     keys: 
       isOver - boolean
       checkGameState - function
           parameters - array with gameboardState
           
*/  

gameState = {
    gameBoard: [],
    player: { turn: false },
    checkHorizontally: function( board, icon ) {
        var    count = 0,
                    row = 0,
              column = 0,
                   icon = icon;
        
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
    checkDiagonally: function( board, icon ) {
         var      row = 0,
              column = 0,
                   icon = icon; 
                         
         if( board[0][0] === icon  && board[1][1] === icon  && board[2][2] === icon ) {
             return true;
         }
                                             
         if( board[2][0] === icon  && board[1][1] === icon  && board[0][2] === icon ) {
             return true;
         }
                                         
        return false;
    },
    checkVertically: function( board, icon ) {
        var    count = 0,
                    row = 0,
              column = 0,
                   icon = icon;
               
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
    draw: function( board ) {
        var column = 0,
                    row = 0,
                 count = 0;
        
        for ( row; row < board.length; row++ ) {
             for ( column; column < board[0].length; column++ ) {
                 if( board[row][column] !== null ) {
                    count += 1;
                 }
             }
             column = 0;
        }
        
        return count === 9 ? true: false;
    },
    isGameOver: function( game ) {
        
        if( game.gameWin( game.gameBoard, player.icon ) ) {
            return true;
        } else if( game.gameWin( game.gameBoard, player.icon ) ) {
            return true;
        } else if( game.draw( game.gameBoard ) ){
           return true;
        } else {
           return false;
        }
        
    },
    getScore: function( game ) {
         console.log( "Game: " + JSON.stringify( game ) );
         if( game.gameWin( game.gameBoard, player.icon ) ) {
             return -10;
         } else if( game.gameWin( game.gameBoard, computer.icon ) ){
             return 10;
         } else {
             return 0;
         }
          
    },
    gameWin: function( board, player ){
        if( gameState.checkHorizontally( board, player )  
            || gameState.checkDiagonally( board, player ) 
            || gameState.checkVertically( board, player ) 
          ) {
            return true;
          } else {
            return false;
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
         
         this.gameBoard = boardState;
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
  
  function drawBoard() {
     
     context.clearRect( 0, 0, width, height );
     
     var column = 0,
                 row = 0;
     
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
     
     for ( row; row < 3; row++ ){
         for ( column; column < 3; column++ ){
              if( game.gameBoard[row][column] === "x" ) {
                   // console.log( "drawing x" );
                   drawSymbol( "x", column, row );
                   
              } else if( game.gameBoard[row][column] === "o" ){
                   // console.log( "drawing o" );
                   drawSymbol( "o", column, row )
              }
         }
         column = 0;
     }
      
  }
  
  function Circle( x, y, radius ) {
    this.x = 0 || x;
    this.y = 0 || y;
    this.radius = 30 || radius;
    this.lineWidth = 1;
    this.color = "blue";
  }
  
  Circle.prototype.draw = function() {
       var x;
       var y;
       
       if( this.x === 0 ){
          x = 50;
       } else if( this.x === 1 ){
          x = 150;
       } else if( this.x === 2 ){
         x = 250;
       }
       
       if( this.y === 0 ){
          y = 50;
       } else if( this.y === 1 ){
          y = 150;
       } else if( this.y === 2 ){
         y = 250;
       }

     context.beginPath();
     context.arc( x, y, this.radius, 0, Math.PI * 2, false );
     context.closePath();
     context.stroke();

  }
  
  function X( x, y ){
     this.width = this.height = 100 * .9;
     this.x = 0 || x;
     this.y = 0 || y;
     this.lineWidth = 1;
     this.color = "blue";
  }
  
  X.prototype.draw = function(){
       var x;
       var y;
       
       if( this.x === 0 ){
          x = 0;
       } else if( this.x === 1 ){
          x = 100;
       } else if( this.x === 2 ){
         x = 200;
       }
       
       if( this.y === 0 ){
          y = 0;
       } else if( this.y === 1 ){
          y = 100;
       } else if( this.y === 2 ){
         y = 200;
       }
       
       context.lineWidth = this.lineWidth;
       context.fillStyle = this.color;
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
  
  function handlePlayerSelection( x, y ) {
     var isPlayerX = false;
     
     if( x > checkBoxForX.x && x < checkBoxForX.x2 && y > checkBoxForX.y && y < checkBoxForX.y2 ){
         var width = checkBoxForX.x2 - checkBoxForX.x;
         var height = checkBoxForX.y2 - checkBoxForX.y;
         context.fillRect( checkBoxForX.x, checkBoxForX.y, width, height );         
         isPlayerX = true;
     
     } else if( x > checkBoxForO.x && x < checkBoxForO.x2 && y > checkBoxForO.y && y < checkBoxForO.y2 ) {
         var width = checkBoxForO.x2 - checkBoxForO.x;
         var height = checkBoxForO.y2 - checkBoxForO.y;
         context.fillRect( checkBoxForO.x, checkBoxForO.y, width, height );

     }
     
     return isPlayerX;
     
  }
  
  function randomlyChooseWhoGoesFirst() {
       return Math.random() > .5 ? true: false;
  }
  
  function handleSceneTwo( x, y ) {
       var computerChoice;
       console.log( "clicking..." );
       console.log( "Is player turn : " + game.player.turn );
       
       if ( !game.isGameOver( game ) ) {
           if( game.player.turn ) {
               updateGameState( player.icon, x, y );
               console.log( "Game board" + JSON.stringify( game.gameBoard ) );
               drawBoard();
               
               if( !game.isGameOver( game ) ){
                    game.player.turn = !game.player.turn;
                    computerChoice = minimax( game );
                    console.log( "Choice: " + game.choice );
                    console.log( "Computer move: " + JSON.stringify( computerChoice ) );
                    console.log( "Is player turn : " + game.player.turn );
                    updateGameState( computer.icon, game.choice.column, game.choice.row );
                    drawBoard();
                    game.player.turn = !game.player.turn;
               } else {
                    console.log( "game over" );
                    drawGameOver();
                    currentScene = 3;
               }
               
           } else {
               computerChoice = minimax( game );
               game.player.turn = !game.player.turn;
           }
       } else {
           console.log( "game over" );
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
  
  function drawPlayerChoice() {
       var text = "Player icon: " + player.icon;
       var textDimensions = context.measureText( "Player play as X." );
      
       context.clearRect( 0, 0, width, height );
       context.beginPath();
       context.fillText( text, ( width/2 ) - textDimensions.width / 2, height/2 );
       context.closePath(); 
       
  }
  
  function updateGameState( icon, x, y ) {
      
       if( game.player.turn ) {
           if( x <= 100 && y <= 100 ){
              game.gameBoard[0][0] = icon;
           } else if( x <= 200 && y <= 100) {
              game.gameBoard[0][1] = icon;
           } else if( x <= 300 && y <= 100 ){
               game.gameBoard[0][2] = icon;
           } else if( x <= 100 && y <= 200 ){
               game.gameBoard[1][0] = icon;
           } else if( x <= 200 && y <= 200 ){
               game.gameBoard[1][1] = icon;
           } else if( x <= 300 && y <= 200 ){
               game.gameBoard[1][2] = icon;
           } else if( x <=100 && y <= 300 ){
               game.gameBoard[2][0] = icon;
           } else if( x < 200 && y <= 300 ) {
               game.gameBoard[2][1] = icon;
           } else if( x < 300 && y <= 300 ){
              game.gameBoard[2][2] = icon;
           }
       } else {
            game.gameBoard[y][x] = icon;
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
  
  function getPossibleMoves( board ) {
       var possibleCoordinates = [],
                                    column = 0,
                                          row = 0; 
       
       for( row; row < 3; row++ ){
            for( column; column < 3; column++ ){
                if( board[row][column] === null ) {
                    possibleCoordinates.push( { 
                        row: row, column: column
                    })
                }
            }
            column = 0;
       }
       
       return possibleCoordinates;
  }
  
  function get_new_state( move, game ) {
      var column = 0,
                  row = 0,
                 icon = game.player.turn ? player.icon : computer.icon;
           
      game.gameBoard[move.row][move.column] = icon;
      
      return game;
     
  }
  
  function maxIdx ( previousValue, currValue, currIdx, arr ) {
    if( currValue > arr[previousValue] ) {
        return currIdx;
    } else {
        return previousValue;
    }
  }
  
  function minIdx( previousValue, currValue, currIdx, arr ) {
      if( currValue < arr[previousValue] ) {
           return currIdx;
      } else {
           return previousValue;
      }
  }
  
  function minimax ( game ) {
       
      if( game.isGameOver( game ) ){
           return game.getScore( game );
      }
       
      var scores = [];
      var moves = [];
 
      var nextMoves = getPossibleMoves( game.gameBoard );
      
      nextMoves.map( function( move ) {          
          var possible_game = get_new_state( move, game );
          // console.log( "Possible game: " + JSON.stringify( possible_game ) );
          possible_game.player.turn = !game.player.turn;
          scores.push( minimax( possible_game ) );
          moves.push( move );
          game.gameBoard[move.row][move.column] =  null;
          possible_game.player.turn = !game.player.turn;
      });
      
      console.log( "Moves: "  + JSON.stringify( moves ) );
      console.log( "Scores: "  + JSON.stringify( scores ) );
      
      if( !game.player.turn ) {
           var max = Math.max.apply( null, scores );
           var max_score_index = scores.reduce( maxIdx, 0 );
           game.choice = moves[max_score_index];     
           // console.log( game.choice );           
           return scores[max_score_index];      
      } else {
           var min = Math.min.apply( null, scores );
           var min_score_index = scores.reduce( minIdx, 0 );
           game.choice = moves[min_score_index];       
           // console.log( game.choice );           
           return scores[min_score_index];
      }
  }
  
  function clickHandler( e ){
       
       var canvasLeft = canvas.getBoundingClientRect().left,
             canvasTop = canvas.getBoundingClientRect().top,
                              x = e.clientX - canvasLeft,
                              y = e.clientY - canvasTop,
                isPlayerX;
       
       if( currentScene === 1 ){
           isPlayerX = handlePlayerSelection( x, y );
           assignXandO( isPlayerX );
           drawPlayerChoice();
           game.player.turn = randomlyChooseWhoGoesFirst();        
           currentScene = 2;
           console.log( "Player turn: " + game.player.turn );
           if ( game.player.turn ) {
               setTimeout( drawBoard, 2000 );
           } else {
               computerChoice = minimax( game );
               console.log( game.choice );
               updateGamesetTimeout( drawBoard, 2000 );State( computer.icon, game.choice.column, game.choice.row );
               setTimeout( drawBoard, 2000 );
               game.player.turn = !game.player.turn;
           }
       } else if( currentScene === 2 ){           
           handleSceneTwo( x, y );
       } else if( currentScene === 3 ){
           handleSceneThree();
       }
       
  }
  
  canvas.addEventListener( "click", clickHandler );
  
  window.addEventListener( "resize", function() {
      console.log( "resizing canvas... " );
  });
  
  
  var game = Object.create( gameState );
  game.initializeGameState();
  
  game.gameBoard[0][0] = "o";
  // game.gameBoard[0][1] = "x";
  game.gameBoard[0][2] = "x";
  game.gameBoard[1][0] = "x";
  // game.gameBoard[2][0] = "x";
  // game.gameBoard[2][1] = "o";
  game.gameBoard[2][2] = "o";
  
  drawFirstScreen( context, width, height );
  
}



