"use strict";
var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _td_ = document.createElement('td'),
    _span_ = document.createElement('span'),
    _h1_ = document.createElement('h1');

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
    var targetX = parseInt($(target).parent().attr('id')); //row id
    var targetY = parseInt($(target).attr('id'));  //col id
    game.updateSpot(targetX, targetY);
    generateBoard();
    game.isGameOver();
    if(game.gameOver===true){
      $('#game-div').unbind('mousedown');
      game.getSpotValue(targetX,targetY)==="B" ? explosionTimer() : wonGame()
    };
  };

  function wonGame() {
    setTimeout(function(){
      $('.menu').append('<h1 class="win-message">You disarmed all the bombs!</h1>')
      $('body').addClass('winner');
      $('body').append("<a href='javascript:history.go(0)' class='retry'>play again?</a>")
    }, 1000)
  }

  function rightClick(target) {
    $(target).toggleClass('flag');
    var targetX = parseInt($(target).parent().attr('id')); //row id
    var targetY = parseInt($(target).attr('id'));  //col id
    game.flagSpot(targetX, targetY);
  };

  function explosionTimer(){
    var number = _h1_.cloneNode(false);
    $('#game-div').addClass('fade-out');
    $(number).addClass('number');
    $('body').append(number);

    var counter = 3;
    var timer = setInterval(function(){
      $(number).text(counter.toString());
      counter--;
      checkInterval(counter);
    }, 1000);
    function checkInterval(count){
      if(count<0){
        clearInterval(timer);
        $(number).hide();
        $('body').empty();
        $('body').addClass('explosion');
        $('body').append("<a href='javascript:history.go(0)' class='retry'>play again?</a>")
      };
    }
  };

  // generates DOM board, removes old board
  function generateBoard() {
    $('.mineSweeper').remove();
    var table = _table_.cloneNode(false);
    for(var row=0; row<board.length; row++) {
      var tr = _tr_.cloneNode(false);
      $(tr).attr('id', (row));
      for(var col=0; col<board[row].length; col++) {
        var td = _td_.cloneNode(false);
        $(td).attr('id', (col));
        var span = _span_.cloneNode(false);
        $(span).text(board[row][col].val);
        if(board[row][col].revealed === true){
          if(board[row][col].val==='0'){$(span).addClass('blue')};
          board[row][col].val==='B' ? $(td).addClass('bomb') : $(span).addClass('revealed')
        }
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
      $(this).hide();
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
