var board = document.getElementById("board")
var body = document.getElementById("body")
var gameBoard = []
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
blackBackRank= [br, bn,bb,bk,bq, bb, bn,br]
whiteBackRank= [wr, wn,wb,wk,wq, wb, wn,wr]
//pic= [Rook, Knight, Bish, King, Queen, Bish, Knight, Rook]
ctx.drawImage(board, 0, 0)

for (let x = 1; x <= 8; x++){
  gameBoard.push(new Pawn(x, 2, bp, false))
  gameBoard[x - 1].drawPiece(ctx, 488, 488)
}

for (let x = 1; x <= 8; x++){
  gameBoard.push(new Pawn(x, 7, wp, true))
  gameBoard[7+x].drawPiece(ctx, 488, 488)

}

gameBoard.push(new Rook (1, 1, blackBackRank[0], false))
gameBoard[16].drawPiece(ctx, 488, 488)
gameBoard.push(new Knight (2, 1, blackBackRank[1], false))
gameBoard[17].drawPiece(ctx, 488, 488)
gameBoard.push(new Bish (3, 1, blackBackRank[2], false))
gameBoard[18].drawPiece(ctx, 488, 488)
gameBoard.push(new King (4, 1, blackBackRank[3], false))
gameBoard[19].drawPiece(ctx, 488, 488)
gameBoard.push(new Queen (5, 1, blackBackRank[4], false))
gameBoard[20].drawPiece(ctx, 488, 488)
gameBoard.push(new Bish (6, 1, blackBackRank[5], false))
gameBoard[21].drawPiece(ctx, 488, 488)
gameBoard.push(new Knight (7, 1, blackBackRank[6], false))
gameBoard[22].drawPiece(ctx, 488, 488)
gameBoard.push(new Rook (8, 1, blackBackRank[7], false))
gameBoard[23].drawPiece(ctx, 488, 488)


gameBoard.push(new Rook (1, 8, whiteBackRank[0], true))
gameBoard[24].drawPiece(ctx, 488, 488)
gameBoard.push(new Knight (2, 8, whiteBackRank[1], true))
gameBoard[25].drawPiece(ctx, 488, 488)
gameBoard.push(new Bish (3, 8, whiteBackRank[2], true))
gameBoard[26].drawPiece(ctx, 488, 488)
gameBoard.push(new King (4, 8, whiteBackRank[3], true))
gameBoard[27].drawPiece(ctx, 488, 488)
gameBoard.push(new Queen (5, 8, whiteBackRank[4], true))
gameBoard[28].drawPiece(ctx, 488, 488)
gameBoard.push(new Bish (6, 8, whiteBackRank[5], true))
gameBoard[29].drawPiece(ctx, 488, 488)
gameBoard.push(new Knight (7, 8, whiteBackRank[6], true))
gameBoard[30].drawPiece(ctx, 488, 488)
gameBoard.push(new Rook (8, 8, whiteBackRank[7], true))
gameBoard[31].drawPiece(ctx, 488, 488)
/** 
for (let x = 1; x <= 8; x++){
  let u= pic[x-1]
  gameBoard.push(new u (x, 1, blackBackRank[x-1], false))
  gameBoard[15+x].drawPiece(ctx, 488, 488)
}

for (let x = 1; x <= 8; x++){
  gameBoard.push(new pic[x-1](x, 8, whiteBackRank[x-1], true))
  gameBoard[23+x].drawPiece(ctx, 488, 488)
}
*/
/**
function createBoard(){
  var color = Math.floor(Math.random() * 2) == 1 && "Black" || "White"
  for(let y = 0; y < 8; y++){
    if (color == "White"){
      if (y == 0){
        gameBoard.push(new Piece(1, 1, 1))
      }
    }
  }
}
*/

function getSquare(x, y){
  letter = ["a", "b", "c", "d", "e", "f", "g", "h"]
  var num=[0,8,7,6,5,4,3,2,1]
  var row = letter[x]
  var col = num[y] 
  var res= ("."+ row + col+ " ")
  return res;
  }

var moves=0
var picked=0
var preX=0
var preY=0
setInterval(function(){
  if ( moves % 2 == 0){
    var whiteMoves= true
  }
  else{
    var whiteMoves= false 
  }
  for (let x = 1; x <= gameBoard.length; x++){
    if (gameBoard[x - 1].checkMouse(mouseX, mouseY, 488, 512)){
      if (mouseDown && whiteMoves==gameBoard[x - 1].colourWhite && picked==0){
          picked+=1
          gameBoard[x - 1].selected = true
          preX= Math.floor(gameBoard[x-1].x+0.4)
          preY= Math.floor(gameBoard[x-1].y+0.4)
    
      }
    }
    if (!mouseDown && gameBoard[x - 1].selected){
      let diffX= (Math.floor(gameBoard[x-1].x+0.4)-preX)
      let diffY= (preY- Math.floor(gameBoard[x-1].y+0.4))
      
      gameBoard[x - 1].allow(diffX, diffY)
      if (!gameBoard[x - 1].legal){
        gameBoard[x-1].x= preX
        gameBoard[x-1].y= preY
        gameBoard[x - 1].selected = false
      }
      else{
      gameBoard[x-1].x = Math.floor(gameBoard[x-1].x+0.4)
      gameBoard[x-1].y = Math.floor(gameBoard[x-1].y+0.4)
      gameBoard[x - 1].selected = false
      if (gameBoard[x-1].x != preX || gameBoard[x-1].y != preY){
      moves+=1
      document.getElementById("line").innerHTML= (document.getElementById("line").innerHTML+ moves+ getSquare(gameBoard[x-1].x , gameBoard[x-1].y))
      }
      }
      picked-=1
    }

    if (gameBoard[x - 1].selected){
      gameBoard[x - 1].x = ((mouseX-58) / 60) + 1
      gameBoard[x - 1].y = ((mouseY-47) / 60) + 1
    }

    ctx.drawImage(board, 0, 0)
    for (let x = 1; x <=gameBoard.length; x++){
        gameBoard[x - 1].drawPiece(ctx, 488, 488)
    }
  }
}, 100/60);


board.addEventListener("click",() => {
    
})

canvas.addEventListener("click", () => {
  mouseX = event.clientX
  mouseY = event.clientY
  mouseClick=true 
  //console.log(mouseX+ ".."+mouseY)
  console.log(moves)
  
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