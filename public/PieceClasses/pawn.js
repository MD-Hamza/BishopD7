class Pawn extends Piece {
  constructor(x, y, piece, colourWhite) {
    super(x, y, piece, colourWhite);
  }
  allow(movedX, movedY){
    if (this.colourWhite== true){
      if(movedX==0){
        if ((movedY==1 || movedY==2)) {
          this.legal= true
        }
        else {
          this.legal= false 
        }
      }
      else {
        this.legal= false 
      }
    }
    else {
      if(movedX==0){
        if ((movedY==-1 || movedY==-2)) {
          this.legal= true
        }
        else {
          this.legal= false 
        }
      }
      else {
        this.legal= false 
      }
    }
    }
}