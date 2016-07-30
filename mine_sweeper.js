"use strict";
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _td_ = document.createElement('td'),
    _span_ = document.createElement('span');

var MineSweeper = (function() {

  function findSpot(row, col){
    var spot = $('#'+row+"r").find('#'+col+"c").find('span');
    return spot;
  }

  // reveals location, recurses if adjacent spot has 0 bomb count
  function reveal(target) {
    target.addClass('revealed');
    if($(target).text() === "B"){
      console.log("You Looooose!");
      $('table').unbind('click');
    } else if($(target).text() === "0") {
      var targetX = parseInt($(target).parent().parent().attr('id').charAt(0)); //row id
      var targetY = parseInt($(target).parent().attr('id').charAt(0)); //col id
      var startX, startY, endX, endY;

      targetX === 0 ? startX = 0 : startX = -1;
      targetY === 0 ? startY = 0 : startY = -1;
      targetX === parseInt($('tr').last().attr('id').charAt(0)) ? endX = 1 : endX = 2;
      targetY === parseInt($('td').last().attr('id').charAt(0)) ? endY = 1 : endY = 2;

      for(var x = startX; x < endX; x++) {
        for(var y = startY; y < endY; y++) {
          var currentSpot = findSpot((targetX+x), (targetY+y));
          if($(currentSpot).text() === "0" && !($(currentSpot).hasClass("revealed"))) {
            reveal(currentSpot);
          }
          if($(currentSpot).text() !== "B" && (!(y===0 && x===0))) {
            $(currentSpot).addClass('revealed');
          }
        }
      }
    }
    return;
  };

  function generateBoard() {
    var table = $("table");
    for(var row=0; row<board.length; row++) {
      var tr = _tr_.cloneNode(false);
      $(tr).attr('id', (row+"r"));
      for(var col=0; col<board[row].length; col++) {
        var td = _td_.cloneNode(false);
        $(td).attr('id', (col+"c"));
        var span = _span_.cloneNode(false);
        $(span).text(board[row][col].val);
        $(td).append(span);
        $(tr).append(td);
      }
      $(table).append(tr);
    }
  }

  function userClick() {
      $('table').on('click', 'td', function(){
        var target = $(this).find('span');
        reveal(target);
      });
  };

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