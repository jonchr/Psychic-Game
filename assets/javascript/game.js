// VARIABLES
// ================================================================================

	//Array of alphabet letters to convert random number to letter
	var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

	//Variable for the randomly generated secret letter
	var theLetter;

	//Variables for the player's win and lose record since the page was loaded
	var wincounter = 0;
	var losscounter = 0;

	//Varianble for the letter the player currently guessed
	var guessedLetter;

	//Array for holding letters the player has previously guessed
	var prevGuessedLetters = [];

	//Variable for the number of attempts a player has
	//Someone editing the number of attempts only needs to edit the number here below
	//Must be greater than 0;
	var maxAttempts = 9;


// FUNCTIONS
// ================================================================================

	//function for setting the page and functions up for a new game
	function newGame() {
		
		prevGuessedLetters = [];

		//Comes up with a random new letter to be guessed
		theLetter = alphabet[Math.floor(Math.random()*25)];

		//Sets or updates the displayed win/loss record
		updateWins("Wins: " + wincounter);
		updateLosses("Losses: " + losscounter);

		//Resets the guess attempts for the new game
		updateGuesses("Guesses left: " + maxAttempts);
		
		//Clears the letters guessed for the new game
		updatePrevLetters("Letters guessed thus far:");
	}

	function win() {

		//Increases the number of wins recorded, and calls for a new game
		wincounter++;
		newGame();

		//Gives different messages based on how much you've won
		if (wincounter > 5) {
			updateBoard("Wow! You're really good at this :) !");
		}
		else if (wincounter > 1) {
			updateBoard("You won again! Keep going?");
		}
		else {
			updateBoard("You won! Play again?");
		}

	}

	function lose() {

		//Increases the number of losses recorded, and calls for a new game
		losscounter++;
		newGame();

		//Gives different messages based on how much you've won
		if (losscounter > 5) {
			updateBoard("As your resident psychic website, I must advise that you stop while you're behind");
		}
		else if (losscounter > 1) {
			updateBoard("You lost again! Keep at it?");
		}
		else {
			updateBoard("You lost :( But I'm already thinking of a new letter!");
		}
	}

	function update() {

		//Updates the guess attempts remaining in the game
		updateGuesses("Guesses left: " +  (maxAttempts - prevGuessedLetters.length));
		
		//Updates the log of letters guessed by the player this game
		updatePrevLetters("Letters guessed thus far: " + prevGuessedLetters.join());

		if (maxAttempts - prevGuessedLetters.length === 1) {
			updateBoard("You have one attempt left. Make the most of it!");
		}
		else {
			updateBoard("You guessed " + guessedLetter + "! It's incorrect.");
		}
	}

	//Functions to update HTML text on the page
	function updateWins (winMessage) {
		document.getElementById("wins").innerHTML = winMessage;
	}

	function updateLosses (lossMessage) {
		document.getElementById("losses").innerHTML = lossMessage;
	}

	function updateGuesses (guessMessage) {
		document.getElementById("numGuesses").innerHTML = guessMessage;
	}

	function updatePrevLetters (prevMessage) {
		document.getElementById("prevLetters").innerHTML = prevMessage;
	}

	function updateBoard (boardMessage) {
		document.getElementById("updateBoard").innerHTML = boardMessage;
	}


// FUNCTION EXECUTION
// ================================================================================

	//On page load, sets up a new game
	newGame();

	document.onkeyup = function(event) {
		
		guessedLetter = event.key.toLowerCase();

		//Only activates if the key pressed is a letter
		if(alphabet.indexOf(guessedLetter) > -1) {
		
			//Only activates the function if the letter hasn't already been guessed      			
	      	if (prevGuessedLetters.indexOf(" " + guessedLetter) === -1) {
				
				//Adds the guess to the registry of guessed letters
				prevGuessedLetters.push(" " + guessedLetter);

				//Processes if the guess was correct and responds accordingly
				if (guessedLetter === theLetter) {
					win();
				}
				else if (prevGuessedLetters.length === maxAttempts) {
					lose();
				}
				else {
					update();
				}
			}
			else {
				//Adds snarky comment if letter was already guessed
				updateBoard("You already guessed " + guessedLetter + "!");
			}
		}
		else {
			//Adds snarky comment if button pressed isn't a letter
			updateBoard("Please. press. a letter...");
		}
	};