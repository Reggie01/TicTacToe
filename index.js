/* Current a Work in Progress */

var currentScene,
      checkBoxForX,
      checkBoxForO,
      player,
      computer,
      gameState;

/* 
  * GameState Object
     keys: 
       isOver - boolean
       checkGameState - function
           parameters - array with gameboardState
           
*/  

gameState = {
    gameBoardState: [],
    checkHorizontally: function() {
        var countX = 0,
              countO = 0,
                    row = 0,
              column = 0;
        
        for ( row; row < 3; row++ ){
            for ( column; column < 3; column++ ){
                if( this.gameBoardState[row][column] === "x"  ) {
                    countX += 1;
                }
            
                if( this.gameBoardState[row][column] === "o" ) {
                    countO += 1;
                }           
            }
            
            if ( countX === 3 ){
                 return player.icon === "x" ? 10 : -10;
            }
            
            if( countO === 3 ) {
                return player.icon === "o" ? 10 : -10;
            }
            
            countX = 0;
            countO = 0;
        }
        
        return -10;
        
    },
    checkDiagonally: function() {
         var countO = 0,
               countX = 0;
                         
         if( this.gameBoardState[0][0] === "x"  &&
             this.gameBoardState[1][1] === "x"  &&
             this.gameBoardState[2][2] === "x"
            ) {
             countX = 3;
            }
                   
         if( this.gameBoardState[0][0] === "o"  &&
             this.gameBoardState[1][1] === "o"  &&
             this.gameBoardState[2][2] === "o"
           ) {
             countO = 3;
           }
                   
         if ( countX === 3 ){
            return player.icon === "o" ? 10 : -10;
         } else if ( countO === 3 ){
             return player.icon === "o" ? 10 : -10;
         } else {
             countX = 0;
             countO = 0;
         }
                                    
         if( this.gameBoardState[2][0] === "x"  &&
             this.gameBoardState[1][1] === "x"  &&
             this.gameBoardState[0][2] === "x"
         ) {
             countX = 3;
         }
                   
         if( this.gameBoardState[2][0] === "o"  &&
             this.gameBoardState[1][1] === "o"  &&
             this.gameBoardState[0][2] === "o"
         ) {
             countO = 3;
         }
         
         if ( countX === 3 ){
            return player.icon === "o" ? 10 : -10;
         } else if ( countO === 3 ){
             return player.icon === "o" ? 10 : -10;
         } 
                                         
        return 0;
    },
    checkVertically: function() {
        var countX = 0,
              countO = 0,
                    row = 0,
              column = 0;
        
        for ( column; column < 3; column++ ){
            for ( row; row < 3; row++ ){
                if( this.gameBoardState[row][column] === "x"  ) {
                    countX += 1;
                }
            
                if( this.gameBoardState[row][column] === "o" ) {
                    countO += 1;
                }           
            }
            if ( countX === 3 ){
                 return player.icon === "x" ? 10 : -10;
            }
            
            if ( countO === 3 ) {
                 return player.icon === "o" ? 10 : -10;
            }
            countX = 0;
            countO = 0;            
        }
        
        return -10;
    },
    isGameOver: function() {
        var count = 0;
              
        if( gameState.checkHorizontally() ){
             return true;
        } else if ( gameState.checkVertically() ) {
             return true;
        } else {
            return gameState.checkDiagonally();
        }
        
    },
    initializeGameState: function() {
         var           row = 0,
                    column = 0,
             boardState = [];          
         
         for( row; row < 3; row++ ){
             boardState.push([]);
             for ( column; column < 3; column++ ){
                    boardState[row][column] = 0;
             }
             column = 0;
         }
         
         this.gameBoardState = boardState;
    }
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
  
  function handleSceneOne( x, y ) {
     // console.log( "x: " + x + " y: " + y );
     
     if( x > checkBoxForX.x && x < checkBoxForX.x2 && y > checkBoxForX.y && y < checkBoxForX.y2 ){
         // console.log( "This is X: " + x + ". " + "This is Y: " + y );
         var width = checkBoxForX.x2 - checkBoxForX.x;
         var height = checkBoxForX.y2 - checkBoxForX.y;
         context.fillRect( checkBoxForX.x, checkBoxForX.y, width, height );
         player = { icon: "x" };
         computer = { icon: "o" };
         var msg = new SpeechSynthesisUtterance( "You chose x. \n Guess I'm o." );
         window.speechSynthesis.speak(msg);        
     } else if( x > checkBoxForO.x && x < checkBoxForO.x2 && y > checkBoxForO.y && y < checkBoxForO.y2 ) {
         var width = checkBoxForO.x2 - checkBoxForO.x;
         var height = checkBoxForO.y2 - checkBoxForO.y;
         context.fillRect( checkBoxForO.x, checkBoxForO.y, width, height );
         player = { icon: "o" };
         computer = { icon: "x" };
         var msg = new SpeechSynthesisUtterance( "You chose o. \n Guess I'm o." );
         window.speechSynthesis.speak(msg);
     }
     
     return player;
     
  }
  
  function whoGoesFirst() {
       if(Math.random() > .5) {
          player.turn = "true";
          computer.turn = "false";
          return "player";
       } else {
          player.turn = "false";
          computer.turn = "true";
          return "computer";
       }
  }
  
  function handleSceneTwo( x, y ) {
       // console.log( "Player turn: " + player.turn );
       // console.log( "Computer turn: " + computer.turn );
       if( !gameState.isGameOver() ){
            if( player.turn ){
                
                drawSymbol( player.icon, x, y );
            } else{               
                drawSymbol( computer.icon, x, y );
            }
       } else {
            drawGameOver();
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
      } else if( computer.won ){
          text = "Computer won. :(";
          textDimensions = context.measureText( text );
      }
      
      context.beginPath();
      context.clearRect( 0, 0, width, height );
      context.fillText( text, 25, height / 4 );
      context.fillText( playAgainText, 25, height * ( 3 / 4 ) );
      context.closePath();
      
      currentScene = 3;
  }
  
  function drawPlayerDecision( player ) {
       var text = "Player icon: " + player.icon;
       var textDimensions = context.measureText( "Player play as X." );
      
       context.clearRect( 0, 0, width, height );
       context.beginPath();
       context.fillText( text, ( width/2 ) - textDimensions.width / 2, height/2 );
       context.closePath(); 
       
       player.info = true;       
  }
  
  function drawPlayerChoice( player ) {
       setTimeout( function() { drawPlayerDecision( player ); }.bind( this ), 500 );
  }
  
  function drawSymbol( playerSymbol, x, y ){
       if ( playerSymbol === "x" ){
            var img = new X( x, y );
       } else if( playerSymbol === "o" ){
            var img = new Circle( x, y );
       }
       // console.log(player);
       // console.log(computer);
       // console.log(img);
       
       if( x <= 100 && y <= 100 ){
          // console.log( "upper left" );                  
          img.draw();
          gameState.gameBoardState[0][0] = playerSymbol;
       } else if( x <= 200 && y <= 100) {
          // console.log( "upper mid" );         
          img.draw();
          gameState.gameBoardState[0][1] = playerSymbol;
       } else if( x <= 300 && y <= 100 ){
          // console.log( "upper right" );         
          img.draw();
          gameState.gameBoardState[0][2] = playerSymbol;
       } else if( x <= 100 && y <= 200 ){
          // console.log( "mid left" );          
          img.draw();
          gameState.gameBoardState[1][0] = playerSymbol;
       } else if( x <= 200 && y <= 200 ){
          // console.log( "mid mid" );          
          img.draw();
          gameState.gameBoardState[1][1] = playerSymbol;
       } else if( x <= 300 && y <= 200 ){
          // console.log( "mid-right" );         
          img.draw();
          gameState.gameBoardState[1][2] = playerSymbol;
       } else if( x <=100 && y <= 300 ){
          // console.log( "bottom-left" );         
          img.draw();
          gameState.gameBoardState[2][0] = playerSymbol;
       } else if( x < 200 && y <= 300 ) {
          // console.log( "bottom-mid" );         
          img.draw();
          gameState.gameBoardState[2][1] = playerSymbol;
       } else if( x < 300 && y <= 300 ){
          // console.log( "bottom-right" );          
          img.draw();
          gameState.gameBoardState[2][2] = playerSymbol;
       }
  }
  
  function clickHandler( e ){
       
       var canvasLeft = canvas.getBoundingClientRect().left,
             canvasTop = canvas.getBoundingClientRect().top,
                              x = e.clientX - canvasLeft,
                              y = e.clientY - canvasTop,
                         currentPlayerTurn;
       
       if( currentScene === 1 ){
           var playerChoice = handleSceneOne( x, y );
           drawPlayerChoice( playerChoice );
           if( player ){
              currentScene = 2;
              setTimeout( setUpGameBoard, 3000 );              
           }
           currentPlayerTurn = whoGoesFirst();
       } else if( currentScene === 2 ){
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
  
  console.log("Check Horizontal: " +  game2.checkHorizontally() );
  console.log("Check Diagonally: " +  game2.checkDiagonally() );
  console.log("Check Vertically: " +  game2.checkVertically() );
}















