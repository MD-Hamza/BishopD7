class King extends Piece {
  constructor(x, y, piece, colourWhite) {
    super(x, y, piece, colourWhite);
     
  }
  allow(movedX, movedY){
    if ((Math.abs(movedX)==1 && Math.abs(movedY)==1) || (Math.abs(movedX)==1 && Math.abs(movedY)==0)|| (Math.abs(movedX)==0 && Math.abs(movedY)==1)) {
      this.movesMade+=1
      return true
    }
    else{
      return false
    }
  }
  wallBlocking(preX, preY, allLis){
    return false
  }
}
