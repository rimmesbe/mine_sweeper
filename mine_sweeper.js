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

  function revealSpot(target) {
    $(target).addClass('revealed');
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
    $('table').remove();
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
    }
    $('body').append(table);
  }

  function userClick() {
      $(document).on('click', 'td', function(){
        console.log("this "+$(this).attr('id'));
        var targetX = parseInt($(this).parent().attr('id').charAt(0));
        var targetY = parseInt($(this).attr('id').charAt(0));
        console.log("X: "+targetX+" Y: "+targetY);
        game.updateSpot(targetX, targetY);
        generateBoard();
        // reveal(target);
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