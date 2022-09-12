// Unordered list where the player’s guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it
const guessLetterButton = document.querySelector(".guess");
// Text input where the player will guess a letter
const letterInput = document.querySelector(".letter");
// Empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display
const remainingGuessesElement = document.querySelector(".remaining");
// Span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");
// Empty paragraph where messages will appear when player guesses a letter
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// Starting word to test out the game
const word = "magnolia";
// Array to contain guessed letters
const guessedLetters = [];

// Display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e) {
    // Prevent default reloading of page; form submission/ button click behavior
    e.preventDefault();
    // Empty text of message element
    message.innerText = "";
    // Get what was entered in the input
    const guess = letterInput.value;
    // Make sure a single letter was entered
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        // Guessing with acceptable letter
        makeGuess(guess);
    }
    letterInput.value = "";
});

// Fx to validate the player's input as acceptable letters
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter at once.";
        // match() method works with reg ex to search strings (player inputs) to match it to the reg ex
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter a-z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Guess a different letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Function to show the guessed letters
const showGuessedLetters = function () {
    // First clear the list
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) { 
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Function to update the word in progress, replaces dot placeholder with letter
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    // Split word string into array so letter appears in guessedLetters array
    const wordArray = wordUpper.split("");
    // wordArray();
    const revealWord = []; // New array with updated characters
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
};