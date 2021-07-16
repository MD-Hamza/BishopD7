class Rook extends Piece {
  constructor(x, y, piece, colourWhite) {
    super(x, y, piece, colourWhite);
  }
  allow(movedX, movedY){
    if (((Math.abs(movedY)>0 && movedX==0 ) || (Math.abs(movedX)>0 && movedY==0 ))&&(this.captures==2 ||this.captures==0) ){
      return true
    }
    else{ 
      return false
    }
  }
  wallBlocking(x, y, diffX, diffY, gameBoard){
    //If y is greater then the rook moved up/down 
    //if X is greater then it moved right/left
    var direction = Math.max(Math.abs(diffX), Math.abs(diffY))

    for (let i = 1; i < direction; i++) {
      if (diffX == 0){
        //The coordinates in the rooks path
        var pathY = y + i * (Math.abs(diffY) / diffY)
        var pathX = x
      } else {
        //The coordinates in the rooks path
        var pathY = y
        var pathX = x + i * (Math.abs(diffX) / diffX)
      }
      
      if (gameBoard[pathY][pathX] != 0) {
        return true
      }
    }
    return false
  }
}