class Rook extends Piece {
  constructor(x, y, piece, colourWhite) {
    super(x, y, piece, colourWhite);
  }
  allow(movedX, movedY, gameBoard){
    if (((Math.abs(movedY)>0 && movedX==0 ) || (Math.abs(movedX)>0 && movedY==0 ))&&(this.captures==2 ||this.captures==0) ){
      return true
    }
    else{ 
      return false
    }
  }
  wallBlocking(x, y, diffX, diffY, gameBoard, needPath){
    var path = [[x, y]]
    //If y is greater then the rook moved up/down 
    //if X is greater then it moved right/left
    var direction = Math.max(Math.abs(diffX), Math.abs(diffY))

    for (let i = 1; i < direction; i++) {
      if (diffX == 0){
        //The coordinates in the rooks path
        var pathY = y + i * (Math.abs(diffY) / diffY)
        var pathX = x
        if (needPath){
          path.push([pathX, pathY])
        }
      } else {
        //The coordinates in the rooks path
        var pathY = y
        var pathX = x + i * (Math.abs(diffX) / diffX)
        if (needPath){
          path.push([pathX, pathY])
        }
      }
      
      if (gameBoard[pathY][pathX] != 0 && !needPath) {
        return true
      }
    }

    if (needPath){
        return path
    }
    return false
  }
}