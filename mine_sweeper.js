"use strict";

function MineSweeper(size) {
  var results = "";
  this.board = new Board(size);
  this.setResults = function(status) {
    results = status;
  };
}