  // Check Horizontal
  
  var gameboard = gameState.initializeGameState();
  gameboard[0][0] = "x";
  gameboard[0][1] = "x";
  gameboard[0][2] = "x";
  
  console.log( "Gameboard: " + gameState.checkHorizontally( gameboard, "x" ) );
  
  var gameboard1 = gameState.initializeGameState();
  gameboard1[1][0] = "x";
  gameboard1[1][1] = "x";
  gameboard1[1][2] = "x";
  
  console.log( "Gameboard1: " + gameState.checkHorizontally( gameboard1, "x" ) );
  
  var gameboard2 = gameState.initializeGameState();
  gameboard2[2][0] = "x";
  gameboard2[2][1] = "x";
  gameboard2[2][2] = "x";
  
  console.log( "Gameboard2: " + gameState.checkHorizontally( gameboard2, "x" ) );
  
  var gameboard3 = gameState.initializeGameState();
  gameboard3[0][0] = "x";
  gameboard3[1][0] = "x";
  gameboard3[2][0] = "x";
  
  console.log( "Gameboard3: " + gameState.checkHorizontally( gameboard3, "x" ) );
  
  var gameboard4 = gameState.initializeGameState();
  gameboard4[0][1] = "x";
  gameboard4[1][1] = "x";
  gameboard4[2][1] = "x";
  
  console.log( "Gameboard4: " + gameState.checkHorizontally( gameboard4, "x" ) );
  
  var gameboard5 = gameState.initializeGameState();
  gameboard5[0][2] = "x";
  gameboard5[1][2] = "x";
  gameboard5[2][2] = "x";
  
  console.log( "Gameboard5: " + gameState.checkHorizontally( gameboard5, "x" ) );
  
  // Check Vertically
  
  console.log( "Gameboard3: " + gameState.checkVertically( gameboard3, "x" ) );
  
  console.log( "Gameboard4: " + gameState.checkVertically( gameboard4, "x" ) );
  
  console.log( "Gameboard5: " + gameState.checkVertically( gameboard5, "x" ) );
  
  // Check Diagonally 
  console.log( "Gameboard3: " + gameState.checkDiagonally( gameboard3, "x" ) );
  
  console.log( "Gameboard4: " + gameState.checkDiagonally( gameboard4, "x" ) );
  
  var gameboard5 = gameState.initializeGameState();
  gameboard5[0][0] = "x";
  gameboard5[1][1] = "x";
  gameboard5[2][2] = "x";
  
  console.log( "Gameboard5: " + gameState.checkDiagonally( gameboard5, "x" ) );
  
  var gameboard6 = gameState.initializeGameState();
  gameboard6[0][2] = "x";
  gameboard6[1][1] = "x";
  gameboard6[2][0] = "x";
  
  console.log( "Gameboard6: " + gameState.checkDiagonally( gameboard6, "x" ) );
  
  // Game gameState.draw
  var gameboard7 = gameState.initializeGameState();
  gameboard7[0][2] = "x";
  gameboard7[1][1] = "x";
  gameboard7[2][0] = "x";
  
  console.log( "Game draw: " + gameState.draw( gameboard7, "x" ) );
  
  var gameboard8 = gameState.initializeGameState();
  gameboard8[0][0] = "x";
  gameboard8[0][1] = "o";
  gameboard8[0][2] = "x";
  gameboard8[1][0] = "x";
  gameboard8[1][1] = "x";
  gameboard8[1][2] = "o";
  gameboard8[2][0] = "o";
  gameboard8[2][1] = "x";
  gameboard8[2][2] = "o";
  
  console.log( "Gameboard8 draw: " + gameState.draw( gameboard8, "x" ) );
  
  // Game Win function
  console.log( "Gameboard1 won: " + gameState.gameWin( gameboard1, "x" ) );
  
  console.log( "Gameboard3 won: " + gameState.gameWin( gameboard3, "x" ) );
  
  console.log( "Gameboard5 won: " + gameState.gameWin( gameboard5, "x" ) );
  
  var player = { icon: "x" };
  var computer = { icon : "o" };
  var isPlayerTurn = false;
  
  console.log( "Get game score for player: " + gameState.getScore( gameboard8, player.icon ) );
  console.log( "Get game score for opponent: " + gameState.getScore( gameboard8, computer.icon ) );

  var gameboard9 = gameState.initializeGameState();
  gameboard9[0][0] = "o";
  gameboard9[0][1] = "x";
  gameboard9[0][2] = "x";
  gameboard9[1][0] = "x";
  gameboard9[1][1] = "x";
  gameboard9[1][2] = "o";
  gameboard9[2][0] = "o";
  gameboard9[2][1] = "x";
  gameboard9[2][2] = "o";
  
  console.log( "Get game score for computer: " + gameState.getScore( gameboard9 ) ); 
