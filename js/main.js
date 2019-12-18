let currentNum = '';
let hideNum = '';
let arithmeticOperator = '';
let isComma = false;
let isChooseOperator = false;

document.addEventListener('click', () => {
  let clickedBtn = event.target.textContent;
  const screen = document.querySelector('.myScreen');

  /* Add numbers to currentNum */
  if (Number(clickedBtn) && event.target.classList != 'myScreen')
    currentNum += clickedBtn;

  /* Add zero to number */
  if (clickedBtn === '0' && currentNum.length > 0) currentNum += clickedBtn;

  /* Only one comma in number */
  if (clickedBtn === ',' && isComma === false && parseFloat(currentNum)) {
    currentNum += clickedBtn;
    isComma = true;
  }

  /* View on screen */
  if (parseFloat(currentNum) || clickedBtn === ',')
    screen.innerHTML = currentNum;

  /* Choose arithmetic operator and move number to next one */
  if (
    clickedBtn === '+' ||
    clickedBtn === '-' ||
    clickedBtn === '/' ||
    clickedBtn === '*'
  ) {
    arithmeticOperator = clickedBtn;

    if (isChooseOperator === false) {
      hideNum = currentNum;
      currentNum = '';
      isComma = false;
      isChooseOperator = true;
    }
  }

  /* Delete last number */
  if (clickedBtn === 'CE') currentNum = '';

  /* Reset button */
  if (clickedBtn === 'C') {
    currentNum = '';
    hideNum = '';
    arithmeticOperator = '';
    isComma = false;
    screen.innerHTML = 'W tym roku dostanę prezentów...';
  }

  /* Functions return result of action */
  const operacje = zmienna => {
    if (zmienna === '+') return parseFloat(hideNum) + parseFloat(currentNum);
    else if (zmienna === '-')
      return parseFloat(hideNum) - parseFloat(currentNum);
    else if (zmienna === '*')
      return parseFloat(hideNum) * parseFloat(currentNum);
    else if (zmienna === '/')
      return parseFloat(hideNum) / parseFloat(currentNum);
  };

  /* View sum on screen */
  if (clickedBtn === '=' && parseFloat(hideNum)) {
    currentNum = currentNum.replace(',', '.');
    hideNum = hideNum.replace(',', '.');
    let sum = operacje(arithmeticOperator);
    sum = sum.toString();
    sum = sum.replace('.', ',');
    screen.innerHTML = sum;
    currentNum = sum;
    isComma = false;
    isChooseOperator = false;
  }
});
