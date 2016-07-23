"use strict";

function Board(size) {
  this.createBoard = function() {
    var rows = [];
      for(var i=0; i<10; i++) {
        rows.push(new Array(10));
      }
    return rows;
  };
  this.board = this.createBoard();
}

Board.prototype.seedBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      var random = Math.ceil(Math.random()*10);
      (random % 3 === 0) ? (this.board[i][j] = "B") : (this.board[i][j] = "_");
    }
  }
}

Board.prototype.calculateBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      this.calculateSpot(i, j);
    }
  }
}

Board.prototype.calculateSpot = function(curX, curY) {
  if(this.board[curX][curY] !== "B") {
    var bombCount = 0;
    var startX, startY, endX, endY;
    curX === 0 ? startX = 0 : startX = -1;
    curY === 0 ? startY = 0 : startY = -1;
    curX === 9 ? endX = 1 : endX = 2;
    curY === 9 ? endY = 1 : endY = 2;

    for(var x = startX; x < endX; x++) {
      for(var y = startY; y < endY; y++) {
        if(this.board[curX+x][curY+y] === "B") { bombCount++; }
      }
    }
    this.board[curX][curY] = bombCount;
  }
}

Board.prototype.displayBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    console.log(this.board[i]);
  }
}