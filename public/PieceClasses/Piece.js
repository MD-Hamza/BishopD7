class Piece{
  constructor(x, y, piece, colourWhite) {
    this.x = x
    this.y = y
    this.selected = false
    this.piece = piece
    this.colourWhite= colourWhite
    this.whiteMoves=true
    this.legal= false
  }

  drawPiece(ctx, width, height){
    ctx.drawImage(this.piece, (this.x - 1) * width / 8 + 18, (this.y - 1) * height / 8 + 7)
  }
  
  checkMouse(mouseX, mouseY, width, height){
    var left = (this.x - 1) * 61 + 18
    var right = this.x * 61 + 18
    var top = (this.y - 1) * 60.5 + 7
    var bottom = this.y * 60.5 + 7

    if (mouseX > right || mouseX < left || mouseY > bottom || mouseY < top){
      return false
    } else {
      return true
    }
  }
}