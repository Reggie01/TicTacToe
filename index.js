/* Current a Work in Progress */

var currentScene = 1,
//      checkBoxForX,
//      checkBoxForO,
      player,
      computer,
      gameState,
      chooseone = new Image(),
              arrow = new Image(),
 computerwins = new Image(),
                draw = new Image(),
       gameover = new Image(),
              oicon = new Image(),
       restart = new Image(),
         tictactoe = new Image(),
               xicon = new Image(),
             youwin = new Image(),
             // scene = 1,
 arrowDimensions = {x:"", y:""},
   arrowVisible = false,
             winner = false;

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
* Canvas & Canvas Dimensions
*/
  var canvas = document.getElementById( "canvas" );
  var width = canvas.width;
  var height = canvas.height;
  var board = [];
  
  if( canvas.getContext ){   
    var context = canvas.getContext( "2d" ); 
  } else {
    console.log("Your browser does not support canvas." );
  }
  
/*
    Canvas Buttons
*/
var buttons = [
        {    
            name: "oicon",
            width: 150,
          height: 40,
                  x: 60,
                  y: 120,
        },{    
            name: "xicon",
            width: 150,
          height: 40,
                  x: 60,
                  y: 160,
        },
        {
           name: "restart",
           width: 150,
           height: 40,
           x: 0,
           y: 80
        }
    ];

/* 
  * GameState Object
     keys: 
       isOver - boolean
       checkGameState - function
           parameters - array with gameboardState
           
*/  

gameState = {
    gameBoard: [],
    choice: { row: "", column: "" },
    player: { turn: false },
    checkHorizontally: function( board, icon ) {
        var    count = 0,
                    row = 0,
              column = 0;
        
        for ( row; row < 3; row++ ){
            for ( column; column < 3; column++ ){
                if( board[row][column] === icon  ) {
                    count += 1;
                }         
            }
            if ( count === 3 ) {
                 return true;
            } 
            column = 0;
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
            row = 0;
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
    isGameOver: function( board ) {
        
        if( this.gameWin( board, "x" ) ) {
            return true;
        } else if( this.gameWin( board, "o") ) {
            return true;
        } else if( this.draw( board ) ){
           return true;
        } else {
           return false;
        }
        
    },
    getScore: function( board ) {
         
         if( this.gameWin( board, computer.icon ) ) {
             return 10;
         } else if( this.gameWin( board, player.icon ) ){
             return -10;
         } else {
             return 0;
         }
          
    },
    gameWin: function( board, player ){
       
        if( this.checkHorizontally( board, player )  
            || this.checkDiagonally( board, player ) 
            || this.checkVertically( board, player ) 
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
         
         return boardState;
    }, 
    
}
  
  function drawGameOver() {
      var playAgainText = "Play again??",
            textDimensions,
            text;
            
      if( gameState.getScore( board ) > 0 ) {
          text = "Player won!!";
          textDimensions = context.measureText( text );
      } else if( gameState.getScore( board ) < 0 ) {
          text = "Computer won. :(";
          textDimensions = context.measureText( text );
      } else {
          text = "Draw";
          textDimensions = context.measureText( text );
      }
      
      context.beginPath();
      context.clearRect( 0, 0, width, height );
      context.fillText( text, 25, height / 4 );
      context.fillText( playAgainText, 25, height * ( 3 / 4 ) );
      context.closePath();
      
  }
   
  function handleSceneOne( x, y ) {
   
       var  playerGoesFirst,
              isPlayerX,
              button = filterButton( x, y );
       
       isPlayerX = handlePlayerSelection( button );
       assignXandO( isPlayerX );
       playerGoesFirst = randomlyChooseWhoGoesFirst();
       gameState.player.turn = playerGoesFirst;       
       console.log( "Player turn: " + gameState.player.turn );
       if ( !playerGoesFirst ) {
           var gameboard = gameState.initializeGameState();
           computerChoice = minimax( gameboard, true );
           console.log( "Choice: "  + JSON.stringify( gameState.choice, null, 2) );
           updateGameState( computer.icon, gameState.choice.column, gameState.choice.row );
           gameState.player.turn = !playerGoesFirst;
           currentScene = 2;
       }
       currentScene = 2;
  }
  
  function filterButton( mouseX, mouseY ) {
        var button = buttons.filter( function( button ) {
             if( mouseX >=  button.x &&
                 mouseX <= ( button.x + button.width ) &&
                 mouseY >= button.y &&
                 mouseY <= button.y + button.height) {
                      return button;
                 }
        });
        
        return button;
  }
  
  function handlePlayerSelection( button ) {
     var isPlayerX = false;
     
     if( button.length > 0 && button[0].name === "xicon" ){
         isPlayerX = true;
     }
     
     return isPlayerX;
     
  }
  
  function assignXandO( isPlayerX ) {
      if( isPlayerX ){
           player.icon = "x";
           computer.icon = "o";
      } else {
           player.icon = "o";
           computer.icon = "x";
      }
  }
  
  function randomlyChooseWhoGoesFirst() {
       return Math.random() > .5 ? true: false;
  }
  
  /* function setupBoard() {
       setTimeout( function() {
           drawBoard();
           currentScene = 2;
       }, 500 )
  } */
  
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
              if( board[row][column] === "x" ) {
                   
                   drawSymbol( "x", column, row );                
              } else if( board[row][column] === "o" ){
                   
                   drawSymbol( "o", column, row )
              }
         }
         column = 0;
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
  
  function minimax ( board, isPlayer ) {

      var opponent = !isPlayer;
      var playerIcon = isPlayer === true ? computer.icon : player.icon;
      var gameboard = board.slice();
      
      if( gameState.isGameOver( board ) ){
           return gameState.getScore( board );
      }
       
      var scores = [];
      var moves = [];
 
      var nextMoves = getPossibleMoves( gameboard );
      
      nextMoves.map( function( move ) {          
          
          var newBoard = get_new_state( gameboard, move, playerIcon );
          scores.push( minimax( newBoard, !isPlayer ) );
          moves.push( move );
          newBoard[move.row][move.column] =  null;
      });
      
      if( isPlayer ) {
           var max = Math.max.apply( null, scores );
           var max_score_index = scores.reduce( maxIdx, 0 );
           gameState.choice = moves[max_score_index];     
           // console.log( game.choice );           
           return scores[max_score_index];      
      } else {
           var min = Math.min.apply( null, scores );
           var min_score_index = scores.reduce( minIdx, 0 );
           gameState.choice = moves[min_score_index];       
           // console.log( game.choice );           
           return scores[min_score_index];
      }
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
  
  function get_new_state( board, move, playerIcon ) {

      var column = 0,
                  row = 0,
                 icon = playerIcon,
     gameboard = board.slice();
           
     gameboard[move.row][move.column] = icon;
      
     return gameboard;
     
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
  
  function updateGameState( icon, x, y ) {
      
       if( game.player.turn ) {
           if( x <= 100 && y <= 100 && board[0][0] === null ){
              board[0][0] = icon;
           } else if( x <= 200 && y <= 100 && board[0][1] === null) {
              board[0][1] = icon;
           } else if( x <= 300 && y <= 100 && board[0][2] === null ){
               board[0][2] = icon;
           } else if( x <= 100 && y <= 200 && board[1][0] === null){
               board[1][0] = icon;
           } else if( x <= 200 && y <= 200 && board[1][1] === null ){
               board[1][1] = icon;
           } else if( x <= 300 && y <= 200 && board[1][2] === null ){
               board[1][2] = icon;
           } else if( x <=100 && y <= 300 && board[2][0] === null ){
               board[2][0] = icon;
           } else if( x < 200 && y <= 300 && board[2][1] === null ) {
               board[2][1] = icon;
           } else if( x < 300 && y <= 300 && board[2][2] === null ){
              board[2][2] = icon;
           }
       } else {
            board[y][x] = icon;
       }
                  
  }
  
  function handleSceneTwo( x, y ) {
       var computerChoice;
       console.log( "clicking..." );
       console.log( "Is player turn : " + gameState.player.turn );
       var gameboard = board.slice();
       
       if ( !gameState.isGameOver( gameboard ) ) {
           if( gameState.player.turn ) {
               updateGameState( player.icon, x, y );
               console.log( "gameState board" + JSON.stringify( board, null, 2 ) );
               drawBoard();
               gameState.player.turn = !gameState.player.turn;
               if( !gameState.isGameOver( gameboard ) ){
                    // gameState.player.turn = !gameState.player.turn;
                    computerChoice = minimax( gameboard, true );
                    console.log( "gameState board" + JSON.stringify( board, null, 2 ) );
                    console.log( "Computer move: " + JSON.stringify( gameState.choice, null, 2 ) );
                    console.log( "Is player turn : " + gameState.player.turn );
                    updateGameState( computer.icon, gameState.choice.column, gameState.choice.row );
                    drawBoard();
                    gameState.player.turn = !gameState.player.turn;
               } else {
                    console.log( "game over" );
                    drawGameOver();
                    currentScene = 3;
               }
               
           } else {
               computerChoice = minimax( gameboard );
               console.log( "gameState board" + JSON.stringify( board, null, 2 ) );
               console.log( "Computer move: " + JSON.stringify( gameState.choice, null, 2 ) );
               updateGameState( computer.icon, gameState.choice.column, gameState.choice.row );
               gameState.player.turn = !gameState.player.turn;
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
  
  function clickHandler( e ){
       
       var canvasLeft = canvas.getBoundingClientRect().left,
             canvasTop = canvas.getBoundingClientRect().top,
                              x = e.clientX - canvasLeft,
                              y = e.clientY - canvasTop;
       
       if( currentScene === 1 ){
          handleSceneOne( x, y ); 
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
  
  function run() {
      if( currentScene === 1 ){
          drawScene1();
      } else if( currentScene === 2 ){
          drawScene2();
      } else if( currentScene === 3 ) {
          // drawScene3();
      }
       window.requestAnimationFrame( run )
  }
  
  function drawScene1() {
      clear();
      context.drawImage( tictactoe, 0, 0 );
      context.drawImage( chooseone, 0, 80 );
      context.drawImage( oicon, 60, 120 );
      context.drawImage( xicon, 60, 160 );
      // console.log( arrowVisible );
      if( arrowVisible ) {
          context.drawImage( arrow, arrowDimensions.x,  arrowDimensions.y ); 
      }
  }
  
  function drawScene2() {
      drawBoard();
  }
  
  function clear() {
      context.fillStyle = "#fff";
      context.fillRect( 0, 0, width, height );
    }
   
  /* board[0][0] = "o";
  board[0][1] = "x";
  board[0][2] = "x";
  board[1][0] = "x";
  board[2][0] = "x";
  board[2][1] = "o";
  board[2][2] = "o"; */
  
  console.log( board );
  
  function init() {
       loadImages();  
  }
  
  function loadImages() {
        tictactoe.src = "Images/tictactoe.png";
        tictactoe.onload = function() {
            context.drawImage( tictactoe, 0, 0 );
        }
        chooseone.src = "Images/chooseone.png";
        chooseone.onload = function() {
            context.drawImage( chooseone, 0, 80 );
        }
        oicon.src = "Images/oicon.png";
        oicon.onload = function() {
            context.drawImage( oicon, 60, 120 );
        }
        xicon.src = "Images/xicon.png";
        xicon.onload = function() {
            context.drawImage( xicon, 60, 160 );
        }
        arrow.src = "Images/arrow.png";
        computerwins.src = "Images/computerwins.png";
        youwin.src = "Images/youwin.png";
        draw.src = "Images/draw.png";
        gameover.src = "Images/gameover.png";
        restart.src = "Images/playagain.png";
        
  }
  
  var game = Object.create( gameState );
  var board = gameState.initializeGameState();
  
  init();
  run();
  
  canvas.addEventListener( "mousemove", handleMouseMove );
  
  function handleMouseMove( event ) {
        var mouseX, mouseY;
        
        if( event.pageX || event.pageY === 0 ){
             mouseX = event.pageX - this.offsetLeft;
             mouseY = event.pageY - this.offsetTop;
        } else if( event.offsetX || event.offsetY === 0 ) {
             mouseX = event.offsetX;
             mouseY = event.offsetY;
        }
        
        if( currentScene === 1 ) {
            handleMouseMoveScene1( mouseX, mouseY );
        } else if( currentScene === 3 ) {
            handleMouseMoveScene3( mouseX, mouseY );
        }
        
  }
  
   function handleMouseMoveScene1( mouseX, mouseY ) {
         var button = filterButton( mouseX, mouseY );
         
         if( button.length > 0 ) {
            if( button[0].name === "oicon" ) {
                setArrowDimensions( 0, 130 );
                // console.log( "oicon button" );
            } else if( button[0].name === "xicon" ){
                setArrowDimensions( 0, 170 );
                // console.log( "xicon button" );
            }  else {
                arrowVisible = false; 
            }
         } else {
            arrowVisible = false;
         }
         
         // console.log( "Mouse X: " + mouseX );
         // console.log( "Mouse Y: " + mouseY ); 
    }
  
function setArrowDimensions( mouseX, mouseY ) {
    arrowVisible = true;
    arrowDimensions.x = mouseX;
    arrowDimensions.y = mouseY;
}
  
function handleMouseMoveScene3( mouseX, mouseY ) {
         
    var button = filterButton( mouseX, mouseY );
         
    if( button.length > 0 ) {
        if( button[0].name === "restart" ){
            setArrowDimensions( 0, 90 );
            console.log( "restart button" );
        } else {
            arrowVisible = false;
        }
    } else {
        arrowVisible = false;
    }
         
}
  




