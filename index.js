'use strict';
let player = 'circle';

const fieldEls = document.querySelectorAll('.board__field');
const imageEl = document.querySelector('.icon-hra');

const onClick = (event) => {
  const fieldEl = event.target;

  fieldEl.classList.add(`board__field--${player}`);
  fieldEl.disabled = true;

  if (player === 'circle') {
    player = 'cross';
  } else {
    player = 'circle';
  }

  imageEl.src = `images/${player}.svg`;
  win(fieldEl);
};

for (let i = 0; i < fieldEls.length; i++) {
  fieldEls[i].addEventListener('click', onClick);
}

// ukol 5.

//funkce, která pro číslo řádku a sloupce vrátí příslušný prvek.
const boardSize = 10;
const fields = document.querySelectorAll('.board__field');
const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

//funkce, která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.
const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
  //-----------------------------------------------------------------------------------
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1)) //
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolů
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //bonus
  // Koukni sikmo nahoru doleva
  let j;
  i = origin.column;
  j = origin.row;

  let inDiaLeft = 1;

  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i - 1))) {
    inDiaLeft++;
    i--;
    j--;
  }
  // Koukni sikmo dolu doprava
  i = origin.column;
  j = origin.row;
  while (
    j < boardSize - 1 &&
    i < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i + 1)) //
  ) {
    inDiaLeft++;
    i++;
    j++;
  }

  if (inDiaLeft >= symbolsToWin) {
    return true;
  }

  let inDiaRight = 1;

  // Koukni sikmo nahoru doprava
  i = origin.column;
  j = origin.row;
  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i + 1))) {
    inDiaRight++;
    i++;
    j--;
  }

  // Koukni sikmo dolu doleva
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize - 1 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i - 1)) //
  ) {
    inRow++;
    i--;
    j++;
  }

  if (inDiaRight >= symbolsToWin) {
    return true;
  }
  return false;
};

const processWin = (whoWon) => {
  setTimeout(() => {
    const newGame = confirm(`Vyhrává ${whoWon}! Spustit novou hru?`);
    if (newGame) {
      location.reload();
    } else {
      fieldEls.forEach((el) => {
        el.disabled = true;
      });
    }
  }, 200);
};

const win = (field) => {
  if (isWinningMove(field) === true) {
    if (getSymbol(field) === 'circle') {
      processWin('kolečko');
    } else if (getSymbol(field) === 'cross') {
      processWin('křížek');
    }
  }
};
