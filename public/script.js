var socket = io()
var board = document.getElementById("board")
var body = document.getElementById("body")
var gameBoard = []
var mouseX = 0
var mouseY = 0
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bp = document.getElementById("BP")
var br = document.getElementById("BR");
var bn = document.getElementById("BN")
var bb = document.getElementById("BB")
var bq = document.getElementById("BQ")
var bk = document.getElementById("BK")
var wp = document.getElementById("WP")
var wr = document.getElementById("WR");
var wn = document.getElementById("WN")
var wb = document.getElementById("WB")
var wq = document.getElementById("WQ")
var wk = document.getElementById("WK")
var mouseDown;
var inCheckBlack = false;
var inCheckWhite = false;
var draggedPiece
blackBackRank = [br, bn, bb, bq, bk, bb, bn, br]
whiteBackRank = [wr, wn, wb, wq, wk, wb, wn, wr]

//socket.emit("color", "white")
// socket.on('color', (player) => {
//   color = player
//   if (color == "black") {
//     for (let x = 1; x <= gameBoard.length; x++) {
//       gameBoard[x - 1].y = 9 - gameBoard[x - 1].y
//       gameBoard[x - 1].x = 9 - gameBoard[x - 1].x
//     }
//   }
// })

color = "white"

for (var y = 0; y < 8; y++){
  gameBoard.push([])
  for (var x = 0; x < 8; x++){
    gameBoard[y].push(0)
  }
}

var arrangement = [new Rook(), new Knight(), new Bish(), new Queen(), new King(), new Bish(), new Knight(), new Rook()]
var arrangement2 = [new Rook(), new Knight(), new Bish(), new Queen(), new King(), new Bish(), new Knight(), new Rook()]

window.addEventListener('load', (event) => {
  ctx.drawImage(board, 0, 0)

  for (let x = 1; x <= 8; x++) {
    pawn = new Pawn()
    pawn.x = x
    pawn.y = 2
    pawn.piece = bp
    pawn.colourWhite = false
    pawn.ind = (x - 1)
    gameBoard[1][x - 1] = pawn
    gameBoard[1][x - 1].drawPiece(ctx, 488, 488)
  }

  for (let x = 1; x <= 8; x++) {
    pawn = new Pawn()
    pawn.x = x
    pawn.y = 7
    pawn.piece = wp
    pawn.colourWhite = true
    pawn.ind = (x + 7)
    gameBoard[6][x - 1] = pawn
    gameBoard[6][x - 1].drawPiece(ctx, 488, 488)

  }
  for (let x = 1; x <= 8; x++) {
    arrangement[x - 1].x = x
    arrangement[x - 1].y = 1
    arrangement[x - 1].piece = blackBackRank[x - 1]
    arrangement[x - 1].colourWhite = false
    arrangement[x - 1].ind = (15 + x)
    gameBoard[0][x - 1] = arrangement[x - 1]
    gameBoard[0][x - 1].drawPiece(ctx, 488, 488)
  }

  for (let x = 1; x <= 8; x++) {
    arrangement2[x - 1].x = x
    arrangement2[x - 1].y = 8
    arrangement2[x - 1].piece = whiteBackRank[x - 1]
    arrangement2[x - 1].colourWhite = true
    arrangement2[x - 1].ind = (x + 23)
    gameBoard[7][x - 1] = arrangement2[x - 1]
    gameBoard[7][x - 1].drawPiece(ctx, 488, 488)
  }
})

function getSquare(x, y) {
  letter = ["a", "b", "c", "d", "e", "f", "g", "h"]
  var num = [0, 8, 7, 6, 5, 4, 3, 2, 1]
  var row = letter[x - 1]
  var col = num[y]
  var res = ("." + row + col + " ")
  return res;
}

var moves = 0 //Number of moves 
var picked = 0
var preX = 0 //Initial coordinates 
var preY = 0

setInterval(function() {
  if (moves % 2 == 0) {//If move is even white moves 
    var whiteMoves = true
  }
  else {// Otherwise black 
    var whiteMoves = false
  }

  ctx.drawImage(board, 0, 0)

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (gameBoard[y][x] == 0){
        continue
      }
      gameBoard[y][x].drawPiece(ctx, 488, 488)
      
      if (gameBoard[y][x].checkMouse(mouseX, mouseY, 488, 512)) {
        //Selecting the piece to move 
        if (mouseDown && whiteMoves == gameBoard[y][x].colourWhite && picked == 0) {
          picked += 1
          gameBoard[y][x].selected = true
        }
      }

      //While selected this allows the piece to be dragged 
      if (gameBoard[y][x].selected) {
        gameBoard[y][x].x = ((mouseX - 58) / 60) + 1
        gameBoard[y][x].y = ((mouseY - 47) / 60) + 1
        dragged = gameBoard[y][x]
      }

      //Dropping the piece to the destination
      if (!mouseDown && gameBoard[y][x].selected) {
        var newX = Math.floor(gameBoard[y][x].x + 0.4) - 1
        var newY = Math.floor(gameBoard[y][x].y + 0.4) - 1

        if (newX >= 8 || newY >= 8 || newX < 0 || newY < 0) {
          gameBoard[y][x].x = x + 1
          gameBoard[y][x].y = y + 1
          gameBoard[y][x].selected = false
          picked = 0
          break
        }
        
        var diffX = newX - x 
        var diffY = newY - y
        gameBoard[y][x].captures=0
        //Checks if you're capturing own piece
        if (gameBoard[newY][newX] != 0){
          if (gameBoard[newY][newX].colourWhite == whiteMoves) {
            gameBoard[y][x].legal = false
          } else {
            gameBoard[y][x].captures=2 
          }
        }
         //Checking if it is even allowed
        var allowed = gameBoard[y][x].allow(diffX, diffY)
        console.log(allowed)
        var blocked = gameBoard[y][x].wallBlocking(x, y, diffX, diffY, gameBoard)
        
        var start = gameBoard[y][x]
        var end = gameBoard[newY][newX]

        gameBoard[newY][newX] = gameBoard[y][x]
        gameBoard[y][x] = 0
        if (whiteMoves) {
          inCheckWhite = false
        } else {
          inCheckBlack = false
        }
        
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (gameBoard[i][j] == 0){
              continue
            }
            if (!gameBoard[i][j].colourWhite){
              inCheckWhite = gameBoard[i][j].killKing(j, i, gameBoard)
            } else {
              inCheckBlack = gameBoard[i][j].killKing(j, i, gameBoard)
            }

            if (inCheckBlack || inCheckWhite) {
              break
            }
          }
          if (inCheckBlack || inCheckWhite) {
            break
          }
        }
        gameBoard[y][x] = start
        gameBoard[newY][newX] = end

        if (inCheckBlack && !whiteMoves){
          gameBoard[y][x].legal = false
        } else if (inCheckWhite && whiteMoves){
          gameBoard[y][x].legal = false
        }

        //If the move is not legal it throws the piece back to x and y
        if (blocked || !allowed || !gameBoard[y][x].legal) {
          gameBoard[y][x].legal = true
          if (gameBoard[y][x].movesMade>0){
            gameBoard[y][x].movesMade-=1
          }
          gameBoard[y][x].x = x + 1
          gameBoard[y][x].y = y + 1
          gameBoard[y][x].selected = false
        } else {//Otherwise the move is executed 
          gameBoard[y][x].x = newX + 1
          gameBoard[y][x].y = newY + 1
          gameBoard[y][x].selected = false
          
          gameBoard[newY][newX] = gameBoard[y][x]
          gameBoard[y][x] = 0

          if (newX != x || newY != y) {
            moves += 1
            for (let i = 0; i < 8; i++) {
              for (let j = 0; j < 8; j++) {
                if (gameBoard[i][j] == 0){
                  continue
                }
                inCheck = gameBoard[i][j].killKing(j, i, gameBoard)
                if (inCheck) {
                  break
                }
              }
              if (inCheck) {
                break
              }
            }

            socket.emit("Game Board", gameBoard, moves, x, color)
          }
        }
        picked -= 1//Dropping the piece
      }
    }
  }

  if (dragged){
    dragged.drawPiece(ctx, 488, 488)
  }
}, 100 / 60);

// socket.on('Game Board', (board, gmoves, gPiece, playerColor) => {
//   for (let x = 1; x <= board.length; x++) {

//     gameBoard[x - 1].x = board[x - 1].x
//     gameBoard[x - 1].y = board[x - 1].y
//     /**
//     if (gameBoard[x - 1].captures==2){
//       var letter = ["a", "b", "c", "d", "e", "f", "g", "h"]
//       var row = (letter[preX-1]+"X")
//       console.log(row)
//     }
//     */
//   }
//   if (playerColor == "white" && color == "black") {
//     for (let x = 1; x <= gameBoard.length; x++) {
//       gameBoard[x - 1].y = 9 - gameBoard[x - 1].y
//       gameBoard[x - 1].x = 9 - gameBoard[x - 1].x
//     }
//   } else if (playerColor == "black" && color == "white") {
//     for (let x = 1; x <= gameBoard.length; x++) {
//       gameBoard[x - 1].y = 9 - gameBoard[x - 1].y
//       gameBoard[x - 1].x = 9 - gameBoard[x - 1].x
//     }
//   }
//   moves = gmoves
//   document.getElementById("line").innerHTML = (document.getElementById("line").innerHTML + moves + getSquare(board[gPiece - 1].x, board[gPiece - 1].y))
// });

canvas.addEventListener("click", () => {
  mouseX = event.clientX
  mouseY = event.clientY
  mouseClick = true
})

canvas.addEventListener("mousemove", () => {
  mouseX = event.clientX
  mouseY = event.clientY
})

canvas.addEventListener("mousedown", () => {
  mouseDown = true
})
canvas.addEventListener("mouseup", () => {
  mouseDown = false
})
