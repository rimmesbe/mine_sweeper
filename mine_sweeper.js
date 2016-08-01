"use strict";
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _td_ = document.createElement('td'),
    _span_ = document.createElement('span');

var MineSweeper = (function() {

  function userClick() {
    $(document).on('click', 'td', function(){
      var targetX = parseInt($(this).parent().attr('id').charAt(0)); //row id
      var targetY = parseInt($(this).attr('id').charAt(0));  //col id
      game.updateSpot(targetX, targetY);
      generateBoard();
      if(game.gameOver===true){$(document).unbind('click');}
    });
  };

  function generateBoard() {
    $('.mineSweeper').remove();
    var table = _table_.cloneNode(false);
    for(var row=0; row<board.length; row++) {
      var tr = _tr_.cloneNode(false);
      $(tr).attr('id', (row+"r"));
      for(var col=0; col<board[row].length; col++) {
        var td = _td_.cloneNode(false);
        $(td).attr('id', (col+"c"));
        var span = _span_.cloneNode(false);
        $(span).text(board[row][col].val);
        if(board[row][col].revealed === true){$(span).addClass('revealed')}
        $(td).append(span);
        $(tr).append(td);
      }
      $(table).append(tr);
      $(table).addClass('mineSweeper');
    }
    $('body').append(table);
  }

  function init(){
    game = new Board(10);
    board = game.board;
    game.seedBoard();
    game.calculateBoard();
  }

  var
    board,
    game,
    publicApi = {
      init: init,
      generateBoard: generateBoard,
      userClick: userClick
    }
  ;

  return publicApi;
})();

$(document).ready(function(){
  MineSweeper.init();
  MineSweeper.generateBoard();
  MineSweeper.userClick();
});
