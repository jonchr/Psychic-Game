// VARIABLES
// ================================================================================

	//Array of alphabet letters to convert random number to letter
	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

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

	//variable representing the HTML progress bar
	var progressBar = document.querySelector(".progress-bar");

// FUNCTIONS
// ================================================================================

	//function for setting the page and functions up for a new game
	function newGame() {
		
		prevGuessedLetters = [];

		//Comes up with a random new letter to be guessed
		theLetter = alphabet[Math.floor(Math.random() * 25)];
		console.log("Guessed " + guessedLetter);
		//Logs the answer letter (yes, you can cheat using console)
		console.log("The letter is " + theLetter);

		//Sets or updates the displayed win/loss record
		updateWins();
		updateLosses();

		//Resets the guess attempts for the new game
		updateGuessesLeft(maxAttempts);
		
		//Clears the letters guessed for the new game
		updatePrevLetters("");

		//Makes the progress bar green and set to 0%
		progressBar.style.width = "0%";
		progressBar.style.backgroundColor = "green";
	}

	function win() {

		//Increases the number of wins recorded
		wincounter++;

		//Gives different messages based on how much you've won
		if (wincounter >= 5) {
			updateBoard("Wow! You're really good at this :) !");
		}
		else if (wincounter > 1) {
			updateBoard("You won again! Keep going?");
		}
		else {
			updateBoard("You won! Play again?");
		}

		newGame();
	}

	function lose() {

		//Increases the number of losses recorded
		losscounter++;

		//Gives different messages based on how much you've won
		if (losscounter >= 5) {
			updateBoard("As your resident psychic website, I must advise that you stop while you're behind");
		}
		else if (losscounter > 1) {
			updateBoard("You lost again! It was " + theLetter + ". Keep at it?");
		}
		else {
			updateBoard("You lost :( But I'm already thinking of a new letter! " + "(For the record, it was " + theLetter + ")");
		}

		newGame();
	}

	function update() {

		//Updates the guess attempts remaining in the game
		updateGuessesLeft(maxAttempts - prevGuessedLetters.length);
		
		//Updates the log of letters guessed by the player this game
		updatePrevLetters(prevGuessedLetters.join());

		//Warns if there's only 1 attempt left
		//Otherwise notifies their guessed letter is wrong
		if (maxAttempts - prevGuessedLetters.length === 1) {
			updateBoard("You have one attempt left. Make the most of it!");
		}
		else {
			updateBoard("You guessed " + guessedLetter + "! It's incorrect.");
		}

		//Updates the progress bar
		updateProgressBar();
	}

	//Functions to update HTML text on the page
	function updateWins () {
		document.getElementById("wins").innerHTML = "Wins: " + wincounter;
	}

	function updateLosses () {
		document.getElementById("losses").innerHTML = "Losses: " + losscounter;
	}

	function updateGuessesLeft (numGuessLeft) {
		document.getElementById("numGuesses").innerHTML = "Guesses left: " + numGuessLeft;
	}

	function updatePrevLetters (prevMessage) {
		document.getElementById("prevLetters").innerHTML = "Letters guessed thus far: " + prevMessage;
	}

	function updateBoard (boardMessage) {
		document.getElementById("updateBoard").innerHTML = boardMessage;
	}

	//Function to update progress bar based on number of guesses
	function updateProgressBar() {

		//If there's only 1 attempt left, makes the bar red
		//If used half your attempts, makes the bar yellow
		if (maxAttempts - prevGuessedLetters.length === 1) {
			progressBar.style.backgroundColor = "red";
		}
		else if (prevGuessedLetters.length / maxAttempts > 0.5) {
			progressBar.style.backgroundColor = "orange";
		}
		//Updates the percent of the progress bar
		progressBar.style.width = (prevGuessedLetters.length / maxAttempts * 100) + "%";
	}

// FUNCTION EXECUTION
// ================================================================================

	//On page load, sets up a new game
	newGame();

	document.onkeyup = function(event) {
		
		guessedLetter = event.key.toUpperCase();
	
		//Only activates if the key pressed is a letter
		if(alphabet.indexOf(guessedLetter) > -1) {
			//Logs the guessed letter
			console.log("Guessed " + guessedLetter);
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
			updateBoard("Please press a letter...");
		}
	};