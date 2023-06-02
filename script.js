'use strict';
// selecting elements
const newGameButton = document.querySelector('.btn--new');
const rollGameButton = document.querySelector('.btn--roll');
const holdGameButton = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const inputOne = document.querySelector('.input-name--0');
const inputTwo = document.querySelector('.input-name--1');
const submitButton = document.querySelector('.submit');
const overlay = document.querySelector('.overlay');
let playerOneScore = document.querySelector('#score--0');
let playerTwoScore = document.querySelector('#score--1');
let playerOneName = document.querySelector('#name--0');
let playerTwoName = document.querySelector('#name--1');
submitButton.addEventListener('click', function () {
  if (inputOne.value.trim() !== '' && inputTwo.value.trim() !== '') {
    playerOneName.textContent = inputOne.value;
    playerTwoName.textContent = inputTwo.value;
    overlay.style.display = 'none';
  }
});
let score, currentPlayer, playing;
dice.style.display = 'none';
const startAgain = function () {
  score = 0;
  currentPlayer = 0;
  playing = true;
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  rollGameButton.style.display = 'block';
  holdGameButton.style.display = 'block';
  dice.style.display = 'clock';
  dice.style.display = 'none';
  playerOne.classList.remove('player--winner');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.add('player--active');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
};
startAgain();
function switchPlayer() {
  score = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = score;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
}

// let game = true;
rollGameButton.addEventListener('click', function () {
  let rendomDiceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.style.display = 'block';
  dice.src = `dice-${rendomDiceNumber}.png`;
  score += rendomDiceNumber;

  if (rendomDiceNumber !== 1) {
    document.getElementById(`current--${currentPlayer}`).textContent = score;
  } else {
    switchPlayer();
  }
});
const checkGame = function (highScore) {
  if (highScore >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    rollGameButton.style.display = 'none';
    holdGameButton.style.display = 'none';
    dice.style.display = 'none';
  } else {
    switchPlayer();
  }
};
holdGameButton.addEventListener('click', function () {
  let now = document.getElementById(`score--${currentPlayer}`);
  now.textContent = Number(now.textContent) + score;
  checkGame(Number(now.textContent));
});
newGameButton.addEventListener('click', startAgain);
