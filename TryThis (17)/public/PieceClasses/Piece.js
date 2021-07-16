class Piece {
  constructor(x, y, piece, colourWhite, ind) {
    this.x = x
    this.y = y
    this.selected = false
    this.piece = piece
    this.colourWhite = colourWhite
    this.ind = ind
    this.whiteMoves = true
    this.legal = true
    this.movesMade = 0
    this.captures = 0 //0 means neutral, 1 means trying to capture their own piece and 2 means a legal capture 
    this.underAttack = false
    this.controled = []
  }

  drawPiece(ctx, width, height) {
    ctx.drawImage(this.piece, (this.x - 1) * width / 8 + 18, (this.y - 1) * height / 8 + 7)
  }

  checkMouse(mouseX, mouseY, width, height) {
    var left = (this.x - 1) * 61 + 18
    var right = this.x * 61 + 18
    var top = (this.y - 1) * 60.5 + 7
    var bottom = this.y * 60.5 + 7

    if (mouseX > right || mouseX < left || mouseY > bottom || mouseY < top) {
      return false
    } else {
      return true
    }
  }

  killKing(pieceX, pieceY, gameBoard) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (gameBoard[y][x] == 0){
          continue
        }
        if (gameBoard[y][x].piece.id == "BK" && this.colourWhite){
          var kingX = x - pieceX
          var kingY = y - pieceY
          gameBoard[pieceY][pieceX].captures = 2
          var allowed = gameBoard[pieceY][pieceX].allow(kingX, kingY)
          var blocked = gameBoard[pieceY][pieceX].wallBlocking(pieceX, pieceY, kingX, kingY, gameBoard)
          gameBoard[pieceY][pieceX].captures = 0
          return (allowed && !blocked)

        } else if (gameBoard[y][x].piece.id == "WK" && !this.colourWhite){
          var kingX = x - pieceX
          var kingY = y - pieceY
          gameBoard[pieceY][pieceX].captures = 2
          var allowed = gameBoard[pieceY][pieceX].allow(kingX, kingY)
          var blocked = gameBoard[pieceY][pieceX].wallBlocking(pieceX, pieceY, kingX, kingY, gameBoard)
          gameBoard[pieceY][pieceX].captures = 0
          return (allowed && !blocked)

        }
      }
    }
  }

  checkMate(gameBoard){
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (gameBoard[y][x] == 0) {
          continue
        }

      }
    }
  }
}