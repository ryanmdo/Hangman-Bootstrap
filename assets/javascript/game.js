$(document).ready(function(){

	//Set variables
	var winCount = 0;
	var selectedWord = [];
	var lettersGuessed = [];
	var guessesRemaining;
	var revealedWord = [];
	var usedLetters = []; //list of used up, but useless, letters
	var revealedArr = []; //boolean array, of what letters to show. All false to begin, then flip as guess are correct.


	//Set word lists, alphabet, game alphabet(alphabet - used letters)
	var wordArr = ['arm','back','ears','eyes','face','feet','stomach','teeth','thumbs','toes','tongue','tooth','fingers','foot','hair','hands','head','knees','legs','mouth','neck','nose','shoulders','skin'];
	var alphabetComplete = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var alphabetGame = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];	


	//Grab game element
	var gameInfo = $('#game-info');
	var gameWord = $('#game-word');


	// String.prototype.replaceAt=function(index, replacement) {
	// 	return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
	// }//Lifted from stackoverflow. It's to replace the specific character with '-' when making the revealedWord


	//Update the HTML to show wins, remaining guesses
	function resetGame(){
		console.log('==============================GAME HAS BEEN RESET, OR JUST STARTED UP.')
		

		//reset all arrays and variables
		guessesRemaining = 8;
		selectedWord = [];
		lettersGuessed = [];
		usedLetters = [];
		revealedArr = [];
		alphabetGame = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
		
		setRandomWord()
		updateGameHTML()
		updateGameWord()
		
		
	}


	//choose random word and put into array
	var setRandomWord = function() {
		
		guessesRemaining = 8;
		var wordString = wordArr[Math.floor(Math.random()*wordArr.length)];
		console.log('The random word is: ' + wordString);

			selectedWord = [];
			for (var i = 0;i < wordString.length; i++){
				selectedWord[i] = wordString.charAt(i);

			}//fill selected word with the selected word
			
			revealedArr = [];
			for(var j = 0; j < selectedWord.length; j++){
				revealedArr[j] = false;
			}//reset and fill revealed Arr with falses

		console.log('The random word as an array(what you want) is: ' + selectedWord);
		console.log('The revealedArray: ' + revealedArr);
		console.log('Number of remaining guesses = ' + guessesRemaining);

	}

	var checkWinLoss = function(){
		//win condition
		if(revealedWord.join() === selectedWord.join()){
			win();
		}

		//lose condition
		if (guessesRemaining === 0){
			lose()
		}

	}


	//Update the HTML to show the word wins, remaining guesses, and already guessed letters
	var updateGameHTML = function() {
		console.log('---------UPDATING GAME HTML---------')
		gameInfo.html('<h3>Guessed Letters: '+lettersGuessed+'</h1>'
		+ '<h3>Guess Remaining: '+guessesRemaining+'</h31>'
		+ '<h3>Win Count: '+winCount+'</h31>');
		console.log('lettersGuessed: '+lettersGuessed);
		console.log('guessesRemaining: '+guessesRemaining);
		console.log('winCount: '+winCount);
		console.log('---------GAME HTML UPDATED----------')
		

	}


	//update the word indicator
	var updateGameWord = function() {
		console.log('---------UPDATING GAME WORD---------')

		//Recreate the revealed word
		revealedWord =[]

		for (var i = 0; i < revealedArr.length; i++){
			if (revealedArr[i] === false){
				revealedWord[i] = '-';
			}
			else {
				revealedWord[i] = selectedWord[i];

			}
		}

		gameWord.html('<h1>'+revealedWord+'</h1>')
		// check for win condition
		console.log('compare '+revealedWord+' with '+selectedWord);
		


		console.log('word to reveal: '+ revealedWord)
		console.log('---------GAME WORD UPDATED----------')
	}


	//remove the key from the alphabetGame array
	var removeFromAlpha = function(keyPress){
		console.log('removing key '+keyPress+ ' from alphabetGame')
		//console.log(alphabetGame)

		for (var i = 0; i < alphabetGame.length; i++){
			
			if(alphabetGame[i] === keyPress){
				alphabetGame.splice(i,1);
			}
			else{

			}

		}

		//console.log(alphabetGame)
		console.log('allowable characters should be 1 item shorter')
		
	}

	//check the input key to see whether or not to flip the appropriate letters in revealedArr
	var checkGuess = function(key){
		checkWinLoss();
		console.log('+++++++++Checking the key: ' +key);
		removeFromAlpha(key);
		console.log(selectedWord)
		var isCorrect = false;


		for ( var i = 0; i < selectedWord.length; i++){
			//console.log('Comparing '+ key+ ' with ' + selectedWord[i])
			if(key === selectedWord[i]){
				revealedArr[i] = true;
				isCorrect = true;
			}
			else{
			}
		}


		if (isCorrect === false){
			badLetter(key); 
		}
		console.log('was a correct guess chosen? '+isCorrect)
		console.log('+++++++++Checked the key')
		updateGameWord();

	}

	var badLetter = function(key){
		guessesRemaining--;
		lettersGuessed.push(key)
		updateGameHTML();
		

	}

	var lose = function(){
		alert('YOU ARE A LOSER.');
		resetGame();
	}

	var win = function(){
		updateGameHTML();
		alert('YOU ARE A WINNER.');
		winCount++;
		resetGame();
	}



	//Recieve key presses and determine whether or not to process
	$(document).on("keyup", function(event){
		console.log(event.key + ' has been pressed');
		for(var i=0; i <alphabetGame.length;i++){
			if(event.key === alphabetGame[i]){
				//Pass event.key into the game logic
				console.log('Passing the valid key, ' + event.key + ', into the process')
				checkGuess(event.key);
			}
			else{

			}
		}

	})

	resetGame();

});