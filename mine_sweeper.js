"use strict";
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _td_ = document.createElement('td'),
    _span_ = document.createElement('span');

var MineSweeper = (function() {

  function userClick() {
    $('#game-div').on('mousedown', 'td', function(event) {
      switch (event.which) {
          case 1:
              leftClick(this);
              break;
          case 3:
              rightClick(this);
              break;
          default:
              alert('You have a strange Mouse!');
      }
    });
  };

  // handles user click on spot
  function leftClick(target) {
    var targetX = parseInt($(target).parent().attr('id').charAt(0)); //row id
    var targetY = parseInt($(target).attr('id').charAt(0));  //col id
    game.updateSpot(targetX, targetY);
    generateBoard();
    game.isGameOver();
    if(game.gameOver===true){
      $('#game-div').unbind('mousedown');
      game.getSpotValue(targetX,targetY)==="B" ? $('body').append('<h1>You blew up!</h1>') : $('body').append('<h1>You located all the bombs!</h1>');
    };
  };

  function rightClick(target) {
    $(target).toggleClass('flag');
    var targetX = parseInt($(target).parent().attr('id').charAt(0)); //row id
    var targetY = parseInt($(target).attr('id').charAt(0));  //col id
    game.flagSpot(targetX, targetY);
  };

  // generates DOM board, removes old board
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
        else if(board[row][col].flagged === true){$(td).addClass('flag')}
        $(td).append(span);
        $(tr).append(td);
      }
      $(table).append(tr);
      $(table).addClass('mineSweeper');
    }
    $('#game-div').append(table);
  }

  function setBoardForm(){
    $('form').submit(function(e){
      e.preventDefault();
      var size = $('#size').val();
      var difficulty = $('#difficulty').val();
      createBoard(size, difficulty);
      generateBoard();
      userClick();
    });
  };

  function createBoard(size, difficulty){
    game = new Board(size, difficulty);
    board = game.board;
    game.seedBoard();
    game.calculateBoard();
  };

  function init(){
    setBoardForm();
  }

  var
    board,
    game,
    publicApi = {
      init: init
    }
  ;

  return publicApi;
})();

$(document).ready(function(){
  MineSweeper.init();
});
