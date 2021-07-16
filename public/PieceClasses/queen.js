class Queen extends Piece {
  constructor(x, y, piece, colourWhite) {
    super(x, y, piece, colourWhite);
  }

  allow(movedX, movedY){
    if ((Math.abs(movedX)==Math.abs(movedY))|| (Math.abs(movedY)>0 && movedX==0 ) || (Math.abs(movedX)>0 && movedY==0 )){
      return true 
    }
    else {
      return false
    }
  }
  
  wallBlocking(x, y, diffX, diffY, gameBoard){
    //If y is greater then the queen moved up/down 
    //if X is greater then it moved right/left
    //If they're the same the Queen moved diagonal
    var direction = Math.max(Math.abs(diffX), Math.abs(diffY))

    for (let i = 1; i < direction; i++) {
      if (diffX == 0){
        //The coordinates in the Queens path if it moved up/down
        var pathY = y + i * (Math.abs(diffY) / diffY)
        var pathX = x
      } else if (diffY == 0) {
        //The coordinates in the Queens path if it moved left/right
        var pathY = y
        var pathX = x + i * (Math.abs(diffX) / diffX)
      } else {
        //The coordinates in the Queens path if it moved diagonally
        var pathY = y + i * (Math.abs(diffY) / diffY)
        var pathX = x + i * (Math.abs(diffX) / diffX)
      }
      
      if (gameBoard[pathY][pathX] != 0) {
        return true
      }
    }
    return false
  }
  
}