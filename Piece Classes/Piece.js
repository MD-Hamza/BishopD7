class Piece{
  constructor(x, y, piece) {
    this.x = x
    this.y = y
    this.selected = false
    this.piece = piece
  }

  drawPiece(ctx, width, height){
    ctx.drawImage(this.piece, this.x * (width / 8), this.y * (height / 8))
  }
}