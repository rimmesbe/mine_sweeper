describe("Board", function() {
  var newBoard;
  var board;
  var setCorner;
  var getCorner;

  beforeEach(function() {
    newBoard = new Board();
    board = newBoard.board;
    getCorner = function(val){return board[0][0];};
    setCorner = function(val){board[0][0]=val;};
  });

  it("should default to easy difficulty", function() {
    expect(newBoard.difficulty).toEqual(10);
  });

  it("should default to board size 5", function() {
    expect(board.length).toEqual(5);
  });

  it("should default to gameOver false", function() {
    expect(newBoard.gameOver).toEqual(false);
  });

  describe("#flagSpot", function(){
    it("should toggle Spot flagged status true/false", function(){
      setCorner(new Spot("0"));
      newBoard.flagSpot(0,0);
      expect(getCorner().flagged).toEqual(true);
      newBoard.flagSpot(0,0);
      expect(getCorner().flagged).toEqual(false);
    });
  });

  describe("#calculateDifficulty", function() {
    it("should be able to set difficulty to easy", function() {
      newBoard.difficulty = newBoard.calculateDifficulty('easy');
      expect(newBoard.difficulty).toEqual(10);
    });

    it("should be able to set difficulty to medium", function() {
      newBoard.difficulty = newBoard.calculateDifficulty('medium');
      expect(newBoard.difficulty).toEqual(7);
    });

    it("should be able to set difficulty to hard", function() {
      newBoard.difficulty = newBoard.calculateDifficulty('hard');
      expect(newBoard.difficulty).toEqual(5);
    });
  });

  describe("#createBoard", function() {
    it("should be able to create any size board", function() {
      expect(newBoard.createBoard(10).length).toEqual(10);
    });

    it("should default to size 5", function(){
      expect(newBoard.createBoard().length).toEqual(5);
    });
  });

  describe("#eachSpot", function() {
    it("should iterate over each spot on the board", function(){
      var count = 0;
      newBoard.eachSpot(function(){count++;})
      expect(count).toEqual(25);
    });
  });

  describe("#surroundingSpots", function(){
    beforeEach(function() {
      board = [[new Spot("0"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0")]];
    });

    it("should access all spots surrounding target spot", function(){
      expect(newBoard.surroundingSpots(1,1, function(x,y,r,c){
        if(board[r+x][c+y].val==="0"){return 1};
      })).toEqual('9');
    });

    it("should access all spots surrounding target spot on an edge spot", function(){
      expect(newBoard.surroundingSpots(0,0, function(x,y,r,c){
        if(board[r+x][c+y].val==="0"){return 1};
      })).toEqual('4');
    });
  });

  describe("when updating board", function(){
    beforeEach(function() {
      newBoard.seedBoard();
    });
    describe("#seedBoard", function() {
      it("should input a value for each spot on the board", function(){
        var count = 0;
        newBoard.eachSpot(function(row, col){if(this.board[row][col].val.length===1){count++;}}.bind(newBoard));
        expect(count).toEqual(25);
      });
    });

    describe("#calculateSpot", function() {
      it("should return B or number of bombs adjacent", function(){
        newBoard.calculateSpot(0,0);
        expect(board[0][0].val.toString()).toMatch(/^[B0-8]$/);
      });
    });

    describe("#calculateBoard", function() {
      it("should run calculateSpot on all board spots", function(){
        newBoard.calculateBoard();
        expect(board[0][0].val.toString()).toMatch(/^[B0-8]$/);
        expect(board[4][4].val.toString()).toMatch(/^[B0-8]$/);
      });
    });

    describe("#isGameOver", function(){
      it("should not be true if non-bomb spots still unrevealed", function(){
        expect(newBoard.isGameOver()).toEqual(false);
      });

      it("should return board.gameOver true if bomb revealed", function(){
        newBoard.revealedSpots.push("B");
        expect(newBoard.isGameOver()).toEqual(true);
      });

      it("should return board.gameOver true if only bombs not revealed", function(){
        newBoard.eachSpot(function(row,col){
          if(board[row][col].val!=="B"){newBoard.revealedSpots.push(newBoard.getSpotValue(row,col));}
        });
        expect(newBoard.isGameOver()).toEqual(true);
      });
    });
  });

  describe("#updateSpot", function(){
    it("should recursively reveal 0 value spots", function(){
      newBoard.board = [[new Spot("0"),new Spot("0"),new Spot("0"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0"),new Spot("1"),new Spot("1")],[new Spot("0"),new Spot("0"),new Spot("0"),new Spot("1"),new Spot("1")]];
      newBoard.updateSpot(1,1);
      var count = 0;
      newBoard.eachSpot(function(row,col){
        if(this.board[row][col].revealed===true){count++;}
      }.bind(newBoard));
      expect(count).toEqual(24);
      expect(newBoard.board[4][4].revealed).toEqual(false);
    });

    it("should not reveal spots with bombs", function(){
      newBoard.board = [[new Spot("B"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0")]];
      newBoard.updateSpot(1,1);
      expect(newBoard.board[0][0].revealed).toEqual(false);
    });

    it("should only reveal target spot if adjacent to a bomb", function(){
      newBoard.board = [[new Spot("B"),new Spot("0"),new Spot("0")],[new Spot("0"),new Spot("1"),new Spot("0")],[new Spot("0"),new Spot("0"),new Spot("0")]];
      newBoard.updateSpot(1,1);
      expect(newBoard.board[0][1].revealed).toEqual(false);
    });
  });
});