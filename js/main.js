let currentNum = '';
let hideNum = '';
let arithmeticOperator = '';
let isComma = false;
let isChooseOperator = false;

document.addEventListener('click', () => {
  /* Get clicked button and screen to view numbers */
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
    screen.innerHTML = 'Ilość prezentów...';
  }

  /* Functions return result of mathematic actions */
  const operacje = arithmeticOperator => {
    if (arithmeticOperator === '+')
      return parseFloat(hideNum) + parseFloat(currentNum);
    else if (arithmeticOperator === '-')
      return parseFloat(hideNum) - parseFloat(currentNum);
    else if (arithmeticOperator === '*')
      return parseFloat(hideNum) * parseFloat(currentNum);
    else if (arithmeticOperator === '/') {
      if (!currentNum.length) return 'Nie można dzielić przez zero';
      else return parseFloat(hideNum) / parseFloat(currentNum);
    }
  };

  /* View sum on screen */
  if (clickedBtn === '=' && parseFloat(hideNum)) {
    currentNum = currentNum.replace(',', '.');
    hideNum = hideNum.replace(',', '.');
    let sum = operacje(arithmeticOperator);
    sum = sum.toString();
    sum = sum.replace('.', ',');
    screen.innerHTML = sum;
    (sum != 'Nie można dzielić przez zero') ? currentNum = sum : sum = '';
    isComma = false;
    isChooseOperator = false;
  }
});
