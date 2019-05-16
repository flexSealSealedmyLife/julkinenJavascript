window.addEventListener('load', initialize)

const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words =['message', 'infect','coffin','myth','danger','related','announcement','motorist','privilege','acute',
'magazine','depart','kitchen','raise','notebook','arrogant','environmental','joint','person','carve','gasp','bloody',
'salon','visit','achievement','speaker','ballot','form','sofa','part','craft','outfit','simplicity','manufacturer',
'allowance','main','black','arch','wine','prosecution','slot','banish','ambiguity','delivery'
]

function initialize() {
    seconds.innerHTML = currentLevel;
    getWord(words);
    wordInput.addEventListener('input', isMatch);
    setInterval(countDown, 1000);
    setInterval(checkPlaying, 50);
    
}

function isMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel+1;
        getWord(words);
        wordInput.value = '';
        score++;
    }
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    }else {
    scoreDisplay.innerHTML = score;
    }
}

function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Good job';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

function getWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

function countDown() {
    if (time > 0) {
        time--;
    }else if (time === 0) {
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

function checkPlaying() {
    if (!isPlaying && time === 0 ) {
        message.innerHTML = 'Game over';
        score = -1;
    } 
}