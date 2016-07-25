"use strict";
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _td_ = document.createElement('td');

function MineSweeper(size) {
  var results = "";
  this.mineBoard = new Board(size);
  this.board = this.mineBoard.board;
  this.setResults = function(status) {
    results = status;
  };
}

MineSweeper.prototype.generateBoard = function() {
  var table = $("table");
  for(var row=0; row<this.board.length; row++) {
    var tr = _tr_.cloneNode(false);
    for(var col=0; col<this.board[row].length; col++) {
      var td = _td_.cloneNode(false);
      $(td).text(this.board[row][col]);
      $(tr).append(td);
    }
    $(table).append(tr);
  }
}