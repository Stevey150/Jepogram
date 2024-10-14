// Game Variables
let selectedTheme;
let scrambledWord;
let correctWord;
let guessesRemaining = 3;
let score = 0;
let timerInterval;
let timeLeft = 60; // 1 minute
let roundNumber = 1;
const maxRounds = 6;

const themeWords = {
    sports: ['basketball', 'soccer', 'tennis', 'skateboarding', 'football'],
    fruit: ['apple', 'banana', 'cherry', 'grape', 'orange', 'pear'],
    animals: ['elephant', 'giraffe', 'penguin', 'zebra', 'lion', 'tiger'],
    countries: ['canada', 'brazil', 'germany', 'japan', 'nigeria', 'mexico', 'peru', 'belgium']
};

// HTML Elements
const themeSelect = document.getElementById('theme-select');
const startGameBtn = document.getElementById('start-game');
const scrambleSection = document.getElementById('scramble-section');
const scrambledWordElem = document.getElementById('scrambled-word');
const guessInput = document.getElementById('guess');
const submitGuessBtn = document.getElementById('submit-guess');
const messageElem = document.getElementById('message');
const resultMessageElem = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');
const resultsSection = document.getElementById('results-section');
const currentScoreElem = document.getElementById('current-score');
const timerElem = document.getElementById('timer');

// Event Listeners
startGameBtn.addEventListener('click', startGame);
submitGuessBtn.addEventListener('click', submitGuess);
playAgainBtn.addEventListener('click', resetGame);

// Game Functions
function startGame() {
    selectedTheme = themeSelect.value;
    correctWord = selectRandomWord(selectedTheme);
    scrambledWord = scrambleWord(correctWord);
    
    scrambledWordElem.textContent = scrambledWord;
    scrambleSection.classList.remove('hidden');
    messageElem.textContent = '';
    resultsSection.classList.add('hidden');
    guessInput.value = '';
    
    startTimer();  // Start the timer
    roundNumber = 1;
    updateRound();  // Start the first round
}

function updateRound() {
    if (roundNumber <= maxRounds && timeLeft > 0) {
        guessesRemaining = 3;
        correctWord = selectRandomWord(selectedTheme);
        scrambledWord = scrambleWord(correctWord);
        scrambledWordElem.textContent = scrambledWord;
        guessInput.value = '';
        messageElem.textContent = '';
    } else {
        endGame();
    }
}

function selectRandomWord(theme) {
    const words = themeWords[theme];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function scrambleWord(word) {
    let letters = word.split('');
    letters = [...letters, ...getRandomLetters(3)]; // Add 3 random letters
    return shuffleArray(letters).join('');
}

function getRandomLetters(num) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let randomLetters = [];
    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomLetters.push(alphabet[randomIndex]);
    }
    return randomLetters;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function submitGuess() {
    const userGuess = guessInput.value.toLowerCase();
    
    if (userGuess === correctWord) {
        messageElem.textContent = 'Correct! You guessed the word!';
        updateScore(guessesRemaining);
        nextRound();
    } else {
        guessesRemaining--;
        messageElem.textContent = `Incorrect. ${guessesRemaining} guesses remaining.`;
        
        if (guessesRemaining === 0) {
            nextRound();
        }
    }
}

function nextRound() {
    roundNumber++;
    updateRound();
}

function updateScore(remainingGuesses) {
    score += remainingGuesses * 10; // Example scoring system
    currentScoreElem.textContent = score; // Update the score on the screen
}

function startTimer() {
    timeLeft = 60;
    timerElem.textContent = formatTime(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElem.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function endGame() {
    messageElem.textContent = 'Game over! Your time is up or max rounds completed.';
    scrambleSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    clearInterval(timerInterval); // Stop the timer
}

function resetGame() {
    score = 0;
    currentScoreElem.textContent = score;
    scrambleSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    startGameBtn.disabled = false;
}
