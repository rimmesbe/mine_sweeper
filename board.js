"use strict";

function Spot(val) {
  this.val = val;
  this.revealed = false;
}

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
      (random % 4 === 0) ? (this.board[i][j] = new Spot("B")) : (this.board[i][j] = new Spot(" "));
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

Board.prototype.calculateSpot = function(row, col) {
  if(this.board[row][col].val !== "B") {
    var bombCount = this.surroundingSpots(row, col, function(x,y,r,c){
      if(this.board[r+x][c+y].val==="B") {return 1;}
    }.bind(this));
    this.board[row][col].val = bombCount;
  }
}

Board.prototype.surroundingSpots = function(row, col, func){
  var val = 0;
  var startX, startY, endX, endY;
  row === 0 ? startX = 0 : startX = -1;
  col === 0 ? startY = 0 : startY = -1;
  row === this.board.length-1 ? endX = 1 : endX = 2;
  col === this.board.length-1 ? endY = 1 : endY = 2;

  for(var x = startX; x < endX; x++) {
    for(var y = startY; y < endY; y++) {
      var temp = func(x, y, row, col);
      if(!(isNaN(temp))){val = val + temp;}
    }
  }
  return val;
}

Board.prototype.revealSpot = function(row, col) {
  this.board[row][col].revealed = true;
}

Board.prototype.displayBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    console.log(this.board[i]);
  }
}

// var b = new Board(10);
// b.seedBoard();
// b.calculateBoard();
// b.displayBoard();