"use strict";

function Spot(val) {
  this.val = val;
  this.revealed = false;
  this.flagged = false
}

function Board(size, difficulty) {
  this.difficulty = this.calculateDifficulty(difficulty);
  this.board = this.createBoard(parseInt(size));
  this.gameOver = false;
  this.revealedSpots = [];
  this.bombCount = 0;
};

Board.prototype.calculateDifficulty = function(difficulty) {
  switch(difficulty) {
    case 'easy':
      return 6;
    case 'medium':
      return 4;
    case 'hard':
      return 3;
    default:
      return 6;
  };
};

// generates board of custom size
Board.prototype.createBoard = function(size) {
  if(isNaN(size)){size=5;}
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
    if(random%this.difficulty === 0){
      this.board[row][col] = new Spot("B");
      this.bombCount++;
    }else{
      this.board[row][col] = new Spot(" ");
    };
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
  if(this.getSpotValue(row,col) !== "B") {
    var bombCount = this.surroundingSpots(row,col, function(x,y,r,c){
      if(this.getSpotValue(r+x, c+y)==="B") {return 1;}
    }.bind(this));
    this.setSpotValue(row,col, bombCount);
  };
};

// reveals spot, and recursively reveals adjacent spots if bomb count 0
Board.prototype.updateSpot = function(row, col) {
  this.revealedSpots.push(this.getSpotValue(row,col));
  this.revealSpot(row, col);
  if(this.getSpotValue(row,col)==='0') {
    this.surroundingSpots(row,col, function(x,y,r,c){
      if(this.getSpotValue(r+x,c+y)==='0' && this.getSpot(r+x,c+y).revealed===false) {
        this.updateSpot((r+x),(c+y));
      }
      if((!(x===0&&y===0))&&this.getSpotValue(r+x,c+y)!=='B'&&this.getSpot(r+x,c+y).revealed===false){
        this.getSpot(r+x,c+y).revealed = true;
        this.revealedSpots.push(this.getSpotValue(r,c));
      }
    }.bind(this));
  };
};

// toggles flagged status of spot
Board.prototype.flagSpot = function(row, col) {
  this.getSpot(row,col).flagged===true ? this.getSpot(row,col).flagged=false : this.getSpot(row,col).flagged=true
}

// checks if game is over
Board.prototype.isGameOver = function(){
  var spotCount = this.board.length**2;
  if(this.revealedSpots.includes("B")){
    this.gameOver = true;
  }else if((this.revealedSpots.length + this.bombCount)===spotCount){
    this.gameOver = true;
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
      var temp = func(x, y, row, col); // holds return value of passes function
      if(!(isNaN(temp))){val = val + temp;} // if temp is a number add it to val
    }
  }
  return val.toString();
};

// loops through each spot in board
Board.prototype.eachSpot = function(func){
  for(var i=0; i<this.board.length; i++) {
    for(var j=0; j<this.board[i].length; j++) {
      func(i,j);
    }
  }
};

Board.prototype.getSpot = function(row, col) {
  return this.board[row][col];
};

Board.prototype.revealSpot = function(row, col) {
  this.getSpot(row,col).revealed = true;
};

Board.prototype.getSpotValue = function(row, col){
  return this.getSpot(row,col).val;
}

Board.prototype.setSpotValue = function(row, col, val){
  this.getSpot(row,col).val = val;
}

Board.prototype.displayBoard = function() {
  for(var i=0; i<this.board.length; i++) {
    console.log(this.board[i]);
  }
};
