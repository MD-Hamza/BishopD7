class Rook extends Piece {
  constructor( name, price, weight, stock, stringLength, 
  lengthOfRacket,stringMass, stringTension=274) {
    super(name, price, weight, stock);
   this.lengthOfRacket= lengthOfRacket; 
   this.stringTension= stringTension; 
   this.stringMass=stringMass; 
   this.stringLength= stringLength; 
  
  }