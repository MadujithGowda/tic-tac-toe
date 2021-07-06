'use strict';

const XClass = 'x';
const OClass = 'o';

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');

const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);

const btnRestart = document.getElementById('restartButton');
let oTurn;

function handleClick(e) {
  //place the mark
  const cell = e.target;
  const currentClass = oTurn ? OClass : XClass;
  placeMark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
    //check for Draw
  } else if (isDraw()) {
    endGame(true);
  } else {
    //switchTurns
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = 'Draw!';
  } else {
    winningMessageTextElement.innerHTML = `${oTurn ? 'O' : 'X'}'s Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(XClass) || cell.classList.contains(OClass);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(OClass);
  board.classList.remove(XClass);

  board.classList.add(oTurn ? OClass : XClass);
}

function checkWin(currentClass) {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(XClass);
    cell.classList.remove(OClass);
    cell.removeEventListener('click', handleClick);

    cell.addEventListener('click', handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

startGame();

btnRestart.addEventListener('click', startGame);
