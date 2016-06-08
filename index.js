/* Current a Work in Progress */

var currentScene;
var checkBoxForX;
var checkBoxForO;
var player;
var computer;
var game = { isOver: false };

/*
    First Screen
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
    // context.stroke();
    
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

  function draw() {
    context.clearRect( 0, 0, width, height );
    drawBoard( context );
  }
  
  function drawBoard( context ) {
     
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
       console.log( this.x );
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
     console.log( "x: " + x + " y: " + y );
     
     if( x > checkBoxForX.x && x < checkBoxForX.x2 && y > checkBoxForX.y && y < checkBoxForX.y2 ){
         console.log( "This is X: " + x + ". " + "This is Y: " + y );
         var width = checkBoxForX.x2 - checkBoxForX.x;
         var height = checkBoxForX.y2 - checkBoxForX.y;
         context.fillRect( checkBoxForX.x, checkBoxForX.y, width, height );
         player = { icon: "x" };
         computer = { icon: "o" };
     } else if( x > checkBoxForO.x && x < checkBoxForO.x2 && y > checkBoxForO.y && y < checkBoxForO.y2 ) {
         var width = checkBoxForO.x2 - checkBoxForO.x;
         var height = checkBoxForO.y2 - checkBoxForO.y;
         context.fillRect( checkBoxForO.x, checkBoxForO.y, width, height );
         player = { icon: "o" };
         computer = { icon: "x" };
     }
     
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
       if( !game.isOver ){
            if( player.turn ){
                drawSymbol( player.icon, x, y );
            } else{
                drawSymbol( computer.icon, x, y );
            }
       }
       
  }
  
  function drawSymbol( playerSymbol, x, y ){
       if ( playerSymbol === "x" ){
            var img = new X( x, y );
       } else if( playerSymbol === "o" ){
            var img = new Circle( x, y );
       }
       console.log(player);
       console.log(computer);
       console.log(img);
       if( x <= 100 && y <= 100 ){
          console.log( "upper left" );
                   
          img.draw();
       } else if( x <= 200 && y <= 100) {
          console.log( "upper mid" );
          
          img.draw();
       } else if( x <= 300 && y <= 100 ){
          console.log( "upper right" );
          
          img.draw();
       } else if( x <= 100 && y <= 200 ){
          console.log( "mid left" );
          
          img.draw();
       } else if( x <= 200 && y <= 200 ){
          console.log( "mid mid" );
          
          img.draw();
       } else if( x <= 300 && y <= 200 ){
          console.log( "mid-right" );
          
          img.draw();
       } else if( x <=100 && y <= 300 ){
          console.log( "bottom-left" );
          
          img.draw();
       } else if( x < 200 && y <= 300 ) {
          console.log( "bottom-mid" );
          
          img.draw();
       } else if( x < 300 && y <= 300 ){
          console.log( "bottom-right" );
          
          img.draw();
       }
  }
  
  function clickHandler( e ){
       
       var canvasLeft = canvas.getBoundingClientRect().left;
       var canvasTop = canvas.getBoundingClientRect().top;
       var x = e.clientX - canvasLeft;
       var y = e.clientY - canvasTop;
       
       if( currentScene === 1 ){
           handleSceneOne( x, y );
           if( player ){
              currentScene = 2;
              setTimeout( draw, 1000 );              
           }
           var first = whoGoesFirst();
       } else if( currentScene === 2 ){
           handleSceneTwo( x, y );
       }
       
  }
  
  canvas.addEventListener( "click", clickHandler );
  
  canvas.addEventListener( "resize", function() {
      console.log( "resizing canvas... " );
  });
  
  drawFirstScreen( context, width, height );
  
}














