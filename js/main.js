let currentNum = '';
let hideNum = '';
let arithmeticOperator = '';
let isComma = false;
let isChooseOperator = false;

document.addEventListener('click', () => {
  /* Get clicked button and screen to view numbers */
  let clickedBtn = event.target.textContent;
  const screen = document.querySelector('.myScreen');

  /* Negative numbers */
  if (clickedBtn === '-' && currentNum.length === 0) currentNum += clickedBtn;

  /* Add numbers to currentNum */
  if (Number(clickedBtn) && event.target.classList != 'myScreen' && currentNum != '0' && clickedBtn != 'x2')
    currentNum += clickedBtn;

  /* Add zero to number */
  if (clickedBtn === '0' && currentNum != '0') currentNum += clickedBtn;

  /* Only one comma in number */
  if (clickedBtn === ',' && isComma === false && parseFloat(currentNum) && currentNum.length > 0) {
    currentNum += clickedBtn;
    isComma = true;
  }

  /* View on screen */
  if (parseFloat(currentNum) || currentNum === '0' || currentNum === '-')
    screen.innerHTML = currentNum;

  /* Choose arithmetic operator and move number to next one */
  if (
    Number(currentNum) &&
    (clickedBtn === '+' ||
      clickedBtn === '-' ||
      clickedBtn === '/' ||
      clickedBtn === '*' ||
      clickedBtn === 'x2') ||
    clickedBtn.charCodeAt() === 8730
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
  const mathematicalOperations = arithmeticOperator => {
    if (arithmeticOperator === '+')
      return parseFloat(hideNum) + parseFloat(currentNum);
    else if (arithmeticOperator === '-')
      return parseFloat(hideNum) - parseFloat(currentNum);
    else if (arithmeticOperator === '*')
      return parseFloat(hideNum) * parseFloat(currentNum);
    else if (arithmeticOperator === '/') {
      if (currentNum === '0') return 'Nie można dzielić przez zero';
      else return parseFloat(hideNum) / parseFloat(currentNum);
    } else if (arithmeticOperator === 'x2')
      return Math.pow(parseFloat(hideNum), parseFloat(currentNum));
    else if (arithmeticOperator.charCodeAt() === 8730) {
      if (currentNum === '0') return 'Nie można dzielić przez zero';
      else return Math.pow(parseFloat(hideNum), 1 / parseFloat(currentNum));
    }

  };

  /* View sum on screen */
  if (clickedBtn === '=' && parseFloat(hideNum) && (parseFloat(currentNum) || currentNum === '0')) {
    currentNum = currentNum.replace(',', '.');
    hideNum = hideNum.replace(',', '.');
    let sum = mathematicalOperations(arithmeticOperator);
    sum = sum.toString();
    sum = sum.replace('.', ',');
    screen.innerHTML = sum;
    currentNum = sum;
    if (sum == 'Nie można dzielić przez zero') {
      currentNum = '';
      hideNum = '';
      arithmeticOperator = '';
      isComma = false;
    }
    isComma = false;
    isChooseOperator = false;
  }
});