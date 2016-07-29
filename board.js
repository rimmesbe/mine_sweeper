"use strict";

function Board(size) {
  this.board = this.createBoard(size);
}

Board.prototype.createBoard = function(size) {
  var rows = [];
  for(var i=0; i<size; i++) {
    rows.push(new Array(size));
  }
  return rows;
};

Board.prototype.seedBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      var random = Math.ceil(Math.random()*10);
      (random % 4 === 0) ? (this.board[i][j] = new Spot("B")) : (this.board[i][j] = new Spot(""));
    }
  }
};

Board.prototype.calculateBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      this.calculateSpot(i, j);
    }
  }
};

Board.prototype.calculateSpot = function(curX, curY) {
  if(this.board[curX][curY].val !== "B") {
    var bombCount = 0;
    var startX, startY, endX, endY;
    curX === 0 ? startX = 0 : startX = -1;
    curY === 0 ? startY = 0 : startY = -1;
    curX === this.board.length-1 ? endX = 1 : endX = 2;
    curY === this.board.length-1 ? endY = 1 : endY = 2;

    for(var x = startX; x < endX; x++) {
      for(var y = startY; y < endY; y++) {
        if(this.board[curX+x][curY+y].val === "B") { bombCount++; }
      }
    }
    this.board[curX][curY].val = bombCount;
  }
}

Board.prototype.displayBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    console.log(this.board[i]);
  }
}