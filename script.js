// The following function will be executed when the DOM is ready
$(function () {
  
    // Initializing variables with initial values.
    var squares = [],  // An empty array to store available squares
        SIZE = 3,   // The size of the board
        EMPTY = "&nbsp;", // A constant variable for storing an empty square's HTML content
        score,  // Object to keep track of the score for each player
        moves,  // Total moves made by both players
        turn = "X",  // Current player's turn
        gameScore = { "X": 0, "O": 0 },  // Game scores for both players
        wins = [7, 56, 448, 73, 146, 292, 273, 84],  // All possible winning combinations

        // Function to start a new game
        startNewGame = function () {
            turn = "X";   // Resets the current player's turn to "X"
            score = { "X": 0, "O": 0 };  // Resets the score for both players
            moves = 0;   // Resets the total number of moves
            squares.forEach(function (square) { square.html(EMPTY); });  // Clears the board by setting all the squares to EMPTY
        },

        // Function to update the score display in the UI
        updateScoreDisplay = function () {
            $("#scoreX").text(gameScore["X"]);  // Updates Player X's score on the UI
            $("#scoreO").text(gameScore["O"]);  // Updates Player O's score on the UI
        },

        // Checks whether a player has won or not
        win = function (score) {
            for (var i = 0; i < wins.length; i += 1) {
                if ((wins[i] & score) === wins[i]) {
                    return true;
                }
            }
            return false;
        },

        // Function to set a square with the current player's marker
        set = function () {
            if ($(this).html() !== EMPTY) {  // If the selected square is not empty, then return
                return;
            }
            $(this).html(turn);   // Sets the HTML content of the selected square to the current player's marker (X or O)
            moves += 1;   // Increment the total number of moves by 1
            score[turn] += $(this)[0].indicator;   // Adds the square's indicator value to the current player's score
            if (win(score[turn])) {   // Checks whether the current player has won or not
                setTimeout(function () {
                    alert(turn + " wins! Congratulations!");   // Shows a popup message declaring the winner
                    gameScore[turn]++;   // Increases the winning player's score by one
                    updateScoreDisplay();   // Updates the score display in the UI
                    startNewGame();   // Starts a new game
                }, 100);
            } else if (moves === SIZE * SIZE) {   // If all squares are filled and nobody won, it results in a draw
                setTimeout(function () {
                    alert("It's a draw! Try again!");   // Shows a popup message declaring the result as a draw
                    startNewGame();   // Starts a new game
                }, 100);
            } else {
                turn = turn === "X" ? "O" : "X";   // Switches the turn to the other player
            }
        },

        // Function to create the tic-tac-toe board on the UI
        play = function () {
            var board = $("<table cellspacing=0 cellpadding=0>"), indicator = 1;
            for (var i = 0; i < SIZE; i += 1) {
                var row = $("<tr>");
                board.append(row);
                for (var j = 0; j < SIZE; j += 1) {
                    var cell = $("<td height=50 width=50 align=center valign=center></td>");
                    cell[0].indicator = indicator;   // Adds an indicator property to the cell that will be used to calculate the score
                    cell.click(set);   // Attaches the set function as a click event listener
                    row.append(cell);
                    squares.push(cell);  // Adds the cell to the squares array
                    indicator += indicator;   // Calculates the indicator value for the next cell
                }
            }

            $(document.getElementById("tictactoe") || document.body).append(board);  // Adds the board HTML to the UI
            startNewGame();   // Starts a new game
        };

    play();

    // Attaches a click event listener to the reset button which resets the scores and starts a new game
    $("#reset").click(function () {
        gameScore = { "X": 0, "O": 0 };   // Resets the game scores for both players
        updateScoreDisplay();   // Updates the score display in the UI
        startNewGame();   // Starts a new game
    });

    updateScoreDisplay(); // Initialize the score display
});
