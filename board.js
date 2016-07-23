function Board(size) {
  this.board = this.createBoard(size);
}

Board.prototype.createBoard = function(size) {
  var rows = [];
    for(var i=0; i<size; i++) {
      rows.push(new Array(size));
    }
  return rows;
}

Board.prototype.seedBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      var random = Math.ceil(Math.random()*10);
      (random % 3 === 0) ? (this.board[i][j] = "B") : (this.board[i][j] = "_");
    }
  }
}

var b = new Board(10);
b.seedBoard();
console.log(b.board);