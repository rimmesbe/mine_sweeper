"use strict";

function Spot(val) {
  this.val = val;
  this.revealed = false;
}

function Board(size) {
  this.board = this.createBoard(size);
  this.gameOver = false;
}

// generates board of custom size
Board.prototype.createBoard = function(size) {
  var rows = [];
  for(var i=0; i<size; i++) {
    rows.push(new Array(size));
  }
  return rows;
};

// seeds board with random bomb placement
Board.prototype.seedBoard = function() {
  this.eachSpot(function(row,col){
    var random = Math.ceil(Math.random()*10);
    (random % 4 === 0) ? (this.board[row][col] = new Spot("B")) : (this.board[row][col] = new Spot(" "));
  }.bind(this));
};

// fills in non-bomb spots with bomb-count
Board.prototype.calculateBoard = function() {
  this.eachSpot(function(row, col){
    this.calculateSpot(row, col);
  }.bind(this));
};

// calculates/sets number of bombs around spot
Board.prototype.calculateSpot = function(row, col) {
  if(this.board[row][col].val !== "B") {
    var bombCount = this.surroundingSpots(row, col, function(x,y,r,c){
      if(this.board[r+x][c+y].val==="B") {return 1;}
    }.bind(this));
    this.board[row][col].val = bombCount;
  };
};

// reveals spot, and recursively reveals adjacent spots if bomb count 0
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

// checks if game is over
Board.prototype.isGameOver = function(){
  // TODO: possible refactor here, cutting down to 1 loop
  this.eachSpot(function(row, col){
    if(this.board[row][col].val==='B' && this.board[row][col].revealed===true){this.gameOver=true;}
  }.bind(this));
  if(this.gameOver!==true){
    this.gameOver = true;
    this.eachSpot(function(row, col){
      if(this.board[row][col].val!=='B' && this.board[row][col].revealed===false){this.gameOver=false;}
    }.bind(this));
  }
  return this.gameOver;
};

// loops through a spots adjacent spots
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

// loops through each spot in board
Board.prototype.eachSpot = function(func){
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      func(i,j, val);
    }
  }
}

// sets a spot to status revealed
Board.prototype.revealSpot = function(row, col) {
  this.board[row][col].revealed = true;
};

Board.prototype.displayBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    console.log(this.board[i]);
  }
};
