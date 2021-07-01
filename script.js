var board = document.getElementById("board")
var gameBoard = []

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
function getSquare(x, y, width, height, mouseX, mouseY){
  letter = ["a", "b", "c", "d", "e", "f", "g", "h"]
  var row = letter[Math.floor((mouseX - x) / (width / 8))]
  var col = Math.floor((mouseY - y) / (height / 8)) + 1
  console.log(row + col)
}

setInterval(function(){ 
    
    
}, 100/6);

board.addEventListener("click",() => {
    getSquare(board.x, board.y, board.width, board.height, event.clientX, event.clientY)
})

