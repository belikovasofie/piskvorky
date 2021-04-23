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
};

for (let i = 0; i < fieldEls.length; i++) {
  fieldEls[i].addEventListener('click', onClick);
}
