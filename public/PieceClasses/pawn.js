class Pawn extends Piece {
  constructor(x, y, piece, colourWhite) {
    super(x, y, piece, colourWhite);
    this.enPassant=false
  }
  allow(movedX, movedY){
    if (this.colourWhite==true){
      if ((movedY==-1 || movedY==-2)&& movedX==0 && this.movesMade==0 && this.captures==0) {
        this.movesMade+=1
        return true
      }
      else if (movedY==-1 && movedX==0   && this.movesMade>0&& this.captures==0){
        this.movesMade+=1
        return true
      }
      else if (movedY==-1 && (movedX==1|| movedX==-1)&& this.captures== 2){
        this.movesMade+=1
        return true
      }
      else if (this.enPassant== true){
        this.movesMade+=1
        return true
      }
      else {
        return false
      }
  } else {
      if ((movedY==1 || movedY==2)&& movedX==0 && this.movesMade==0&& this.captures==0) {
        this.movesMade+=1
        return true
      }
      else if (movedY==1 && movedX==0   && this.movesMade>0&& this.captures==0){
        this.movesMade+=1
        return true
      }
      else if (movedY==1 && (movedX==1|| movedX==-1)&& (this.captures==2)){
        this.movesMade+=1
        return true
      }
      else if (this.enPassant== true){
        this.movesMade+=1
        return true
      }
      else {
        return false
      }
    }
  }

  wallBlocking(x, y, diffX, diffY, gameBoard){
    if (Math.abs(diffX) > 0 && Math.abs(diffY) > 0){
      if (gameBoard[y + diffY][x + diffX] == 0){
        return true
      } else {
        return false
      }
    }

    for (let i = 1; i <= Math.abs(diffY); i++) {
      //The coordinates in the pawns path
      var pathY = y + i * (Math.abs(diffY) / diffY)
      
      if (gameBoard[pathY][x] != 0) {
        return true
      }
    }

    return false
  }
  
  //Put kill in piece.js or script
  executeEnPassant(diffXc, diffYc){
    if (this.movesMade==0){
      if (this.colourWhite==true && diffYc==-2&&(diffXc==1 || diffXc==-1)){
        this.enPassant==true
        return -1
      }
      else if (this.colourWhite==false && diffYc==2&&(diffXc==1 || diffXc==-1)){
        this.enPassant==true
        return -1
      }
    }
    return -1  
  }
    
}