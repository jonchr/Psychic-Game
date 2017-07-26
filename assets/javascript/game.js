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
	var maxAttempts = 9;


// FUNCTIONS
// ================================================================================

	//function for setting the page and functions up for a new game
	function newGame() {
		
		prevGuessedLetters = [];

		//Comes up with a random new letter to be guessed
		theLetter = alphabet[Math.floor(Math.random()*25)];

		//Resets the guess attempts for the new game
		document.getElementById("numGuesses").innerHTML = "Guesses left: " + maxAttempts;
		
		//Clears the letters guessed for the new game
		document.getElementById("guesses").innerHTML = "Letters guessed thus far:";
	}

	function win() {

		//Increases the number of wins recorded and displayed, and calls for a new game
		wincounter++;
		document.getElementById("wins").innerHTML = "Wins: " + wincounter;
		newGame();

	}

	function lose() {

		//Increases the number of losses recorded and displayed, and calls for a new game
		losscounter++;
		document.getElementById("losses").innerHTML = "Losses: " + losscounter;
		newGame();
	}

	function update() {

		//Updates the guess attempts remaining in the game
		document.getElementById("numGuesses").innerHTML = "Guesses left: " +  (maxAttempts - prevGuessedLetters.length);
		
		//Updates the log of letters guessed by the player this game
		document.getElementById("guesses").innerHTML = "Letters guessed thus far: " + prevGuessedLetters.join();

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
					console.log("You win!");
					win();
				}
				else if (prevGuessedLetters.length === maxAttempts) {
					console.log("You lost");
					lose();
				}
				else {
					console.log("Updating...");
					update();
				}
				
			}
		}
	};