"use strict";

function Spot(val) {
  this.val = val;
  this.revealed = false;
  // TODO maybe hold coordinates?
}

function Board(size) {
  this.board = this.createBoard(size);
  this.gameOver = false;
}

Board.prototype.eachSpot = function(func){
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      func(i,j);
    }
  }
}

Board.prototype.createBoard = function(size) {
  var rows = [];
  for(var i=0; i<size; i++) {
    rows.push(new Array(size));
  }
  return rows;
};

Board.prototype.seedBoard = function() {
  this.eachSpot(function(row,col){
    var random = Math.ceil(Math.random()*10);
    (random % 4 === 0) ? (this.board[row][col] = new Spot("B")) : (this.board[row][col] = new Spot(" "));
  }.bind(this));
};

Board.prototype.calculateBoard = function() {
  this.eachSpot(function(row, col){
    this.calculateSpot(row, col);
  }.bind(this));
};

Board.prototype.calculateSpot = function(row, col) {
  if(this.board[row][col].val !== "B") {
    var bombCount = this.surroundingSpots(row, col, function(x,y,r,c){
      if(this.board[r+x][c+y].val==="B") {return 1;}
    }.bind(this));
    this.board[row][col].val = bombCount;
  };
};

Board.prototype.updateSpot = function(row, col) {
  this.revealSpot(row, col);
  if(this.board[row][col].val==='0') {
    this.surroundingSpots(row, col, function(x,y,r,c){
      var currentLocation = this.board[r+x][c+y];
      if(currentLocation.val==='0' && currentLocation.revealed===false) {
        this.updateSpot((r+x),(c+y));
      }
      if((!(x===0&&y==0))&&currentLocation.val!=='B'){currentLocation.revealed=true}
    }.bind(this));
  }else if(this.board[row][col].val==='B') {
    this.gameOver = true;
  };
};

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
  return val.toString();
};

Board.prototype.revealSpot = function(row, col) {
  this.board[row][col].revealed = true;
};

Board.prototype.displayBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    console.log(this.board[i]);
  }
};
