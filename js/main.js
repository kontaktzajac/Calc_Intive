let currentNum = '';
let myNums = [];
let arithmeticOperator = '';
let isComma = false;
let isChooseOperator = false;
let isBracket = '';
const smallScreen = document.querySelector('.smallScreen');

document.addEventListener('click', () => {
  /* Get clicked button and screen to view numbers */
  let clickedBtn = event.target.textContent;
  const screen = document.querySelector('.myScreen');

  /* Negative numbers */
  if (clickedBtn === '-' && currentNum.length === 0) currentNum += clickedBtn;

  /* Add numbers to currentNum */
  if (Number(clickedBtn) && event.target.classList != 'myScreen' && event.target.classList != 'smallScreen' && currentNum != '0' && clickedBtn != 'x2') currentNum += clickedBtn;

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
    clickedBtn === '+' ||
    clickedBtn === '-' ||
    clickedBtn === '/' ||
    clickedBtn === '*' ||
    clickedBtn === 'x2' ||
    clickedBtn.charCodeAt() === 8730
  ) {
    arithmeticOperator = clickedBtn;
    if (currentNum.length > 0) {
      myNums.push(currentNum);
      currentNum = '';
    }
    if (isChooseOperator === false) {
      currentNum = '';
      isComma = false;
      isChooseOperator = true;
    }
  }

  /*  Add brackets */
  if (clickedBtn === '(' || clickedBtn === ')') {
    isBracket = clickedBtn;
  }

  /* Push arithmetic operator to array  */
  if (isChooseOperator && +currentNum) {
    myNums.push(arithmeticOperator);
    //myNums.push(isBracket);
    //isBracket = '';
    isChooseOperator = false;
  }

  /* Delete last number */
  if (clickedBtn === 'CE') currentNum = '';

  /* Reset button */
  if (clickedBtn === 'C') {
    currentNum = '';
    arithmeticOperator = '';
    isComma = false;
    myNums = [];
    screen.innerHTML = 'Ilość prezentów...';
    smallScreen.innerHTML = '';
  }

  viewSmallScreen(myNums);

  /* View sum on screen */
  if (clickedBtn === '=' && (parseFloat(currentNum) || currentNum === '0')) {
    myNums.push(currentNum);

    let pomocnicze = '';
    myNums.forEach((el, i) => {
      pomocnicze = el.replace(',', '.');
      myNums.splice(i, 1, pomocnicze);
    });

    viewSmallScreen(myNums);
    myNums.forEach(el => {
      if (el === '(') brackets(myNums);
    })

    let sum = mathematicalOperations(myNums);

    sum = sum.replace('.', ',');
    screen.innerHTML = sum;
    myNums = [];
    myNums.push(sum);
    if (sum == 'Nie można dzielić przez zero') {
      currentNum = '';
      arithmeticOperator = '';
      isComma = false;
    }
    isComma = false;
    isChooseOperator = false;
  }
});

/* View string above main screen */
const viewSmallScreen = tab => {
  smallScreen.innerHTML = '';
  tab.forEach(el => {
    smallScreen.innerHTML += el;
  })
}

/* Functions return result of mathematic actions */
function mathematicalOperations(tab) {
  let sum = 0;

  while (tab.length > 1) {

    tab.forEach((el, i) => {
      if (el.charCodeAt() === 8730) {
        sum = Math.pow(+tab[i - 1], 1 / +tab[i + 1]);
        tab.splice(i - 1, 3, (Number.isInteger(sum)) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === 'x2') {
        sum = Math.pow(+tab[i - 1], +tab[i + 1]);
        tab.splice(i - 1, 3, (Number.isInteger(sum)) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '*') {
        sum = +tab[i - 1] * +tab[i + 1];
        tab.splice(i - 1, 3, (Number.isInteger(sum)) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '/') {
        sum = +tab[i - 1] / +tab[i + 1];
        tab.splice(i - 1, 3, (Number.isInteger(sum)) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '+') {
        sum = +tab[i - 1] + +tab[i + 1];
        tab.splice(i - 1, 3, (Number.isInteger(sum)) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '-') {
        sum = +tab[i - 1] - +tab[i + 1];
        tab.splice(i - 1, 3, (Number.isInteger(sum)) ? sum : sum.toFixed(2));
      }
    });
  }
  return tab.toString();
}

/* Make mathematic operations in brackets */
function brackets(myNums) {
  let newTab = [];
  let secondNewTab = [];

  for (let i = 0; i < myNums.length; i++) {
    if (myNums[i] === '(' || myNums[i] === ')') {
      newTab.push(i);
    }
    if (newTab.length === 2) {
      for (let i = newTab[0] + 1; i < newTab[1]; i++) {
        secondNewTab.push(myNums[i]);
      }
      myNums.splice(newTab[0], secondNewTab.length + 2, mathematicalOperations(secondNewTab));
      newTab = [];
      secondNewTab = [];
      break;
    }
  }
  return myNums;
}