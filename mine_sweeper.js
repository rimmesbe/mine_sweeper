"use strict";
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _td_ = document.createElement('td'),
    _span_ = document.createElement('span');

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
    $(tr).attr('id', row);
    for(var col=0; col<this.board[row].length; col++) {
      var td = _td_.cloneNode(false);
      $(td).attr('id', col);
      var span = _span_.cloneNode(false);
      $(span).text(this.board[row][col]);
      $(td).append(span);
      $(tr).append(td);
    }
    $(table).append(tr);
  }
}

MineSweeper.prototype.reveal = function() {
  $('table').on('click', 'td', function(){
    $(this).find('span').addClass('revealed');
  })


}

$(document).ready(function(){
  var mine = new MineSweeper(10);
  mine.mineBoard.seedBoard();
  mine.mineBoard.calculateBoard();
  mine.generateBoard();

  mine.reveal();
});