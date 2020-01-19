let currentNum = '';
let myNums = [];
let arithmeticOperator = '';
let isComma = false;
let isChooseOperator = false;
let isBracket = '';
let typeTable = '';
let codeCurrency = '';
const smallScreen = document.querySelector('.smallScreen');

document.addEventListener('click', () => {
  /* Get clicked button and screen to view numbers */
  let clickedBtn = event.target.textContent;
  const screen = document.querySelector('.myScreen');
  const btnWaluta = document.querySelector('.chooseCurrency');

  /* Display div with currency */
  if (clickedBtn === 'Waluta') {
    btnWaluta.style.display = 'block';
    nbpAPI();
  }

  /* Read code of currency and hide div */
  if (clickedBtn === 'Wybierz') {
    codeCurrency = event.target.parentNode.children[0].textContent;
    if (
      event.target.parentNode.parentNode.parentNode.className ===
      'leftTableCurrency'
    )
      typeTable = 'a';
    else typeTable = 'b';
    btnWaluta.style.display = 'none';
  }

  /* Negative numbers */
  if (clickedBtn === '-' && currentNum.length === 0) currentNum += clickedBtn;

  /* Add numbers to currentNum */
  if (
    Number(clickedBtn) &&
    event.target.classList != 'myScreen' &&
    event.target.classList != 'smallScreen' &&
    currentNum != '0' &&
    clickedBtn != 'x2'
  )
    currentNum += clickedBtn;

  /* Add zero to number */
  if (clickedBtn === '0' && currentNum != '0') currentNum += clickedBtn;

  /* Only one comma in number */
  if (
    clickedBtn === ',' &&
    isComma === false &&
    parseFloat(currentNum) &&
    currentNum.length > 0
  ) {
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
    /*
    myNums.push(isBracket);
    isBracket = '';
    if (codeCurrency.length > 0)
      myNums.push(typeTable + ' ' + codeCurrency + ' ');
    codeCurrency = '';
    typeTable = '';*/
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

    let changedElement = '';
    myNums.forEach((el, i) => {
      changedElement = el.replace(',', '.');
      myNums.splice(i, 1, changedElement);
    });

    viewSmallScreen(myNums);
    myNums.forEach(el => {
      if (el === '(') brackets(myNums);
    });

    let tabWithCurrency = [];

    myNums.forEach((el, i) => {
      if (el[0] === 'a' || el[0] === 'b') {
        codeCurrency = el[2] + el[3] + el[4];
        tabWithCurrency.push(el[0] + codeCurrency + i);
        codeCurrency = '';
      }
    });

    //console.log(tabWithCurrency);
    //await getRateCurrency(el[0], codeCurrency, i);

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
  });
};

/* Functions return result of mathematic actions */
function mathematicalOperations(tab) {
  let sum = 0;

  while (tab.length > 1) {
    tab.forEach((el, i) => {
      if (el.charCodeAt() === 8730) {
        sum = Math.pow(+tab[i - 1], 1 / +tab[i + 1]);
        tab.splice(i - 1, 3, Number.isInteger(sum) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === 'x2') {
        sum = Math.pow(+tab[i - 1], +tab[i + 1]);
        tab.splice(i - 1, 3, Number.isInteger(sum) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '*') {
        sum = +tab[i - 1] * +tab[i + 1];
        tab.splice(i - 1, 3, Number.isInteger(sum) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '/') {
        sum = +tab[i - 1] / +tab[i + 1];
        tab.splice(i - 1, 3, Number.isInteger(sum) ? sum : sum.toFixed(2));
      }
    });

    tab.forEach((el, i) => {
      if (el === '+') {
        sum = +tab[i - 1] + +tab[i + 1];
        tab.splice(i - 1, 3, Number.isInteger(sum) ? sum : sum.toFixed(2));
        return;
      }
    });

    tab.forEach((el, i) => {
      if (el === '-') {
        sum = +tab[i - 1] - +tab[i + 1];
        tab.splice(i - 1, 3, Number.isInteger(sum) ? sum : sum.toFixed(2));
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
      myNums.splice(
        newTab[0],
        secondNewTab.length + 2,
        mathematicalOperations(secondNewTab)
      );
      newTab = [];
      secondNewTab = [];
      break;
    }
  }
  return myNums;
}

//View tables with codes
function nbpAPI() {
  viewTableData('a');
  viewTableData('b');
}

async function viewTableData(typeTable) {
  try {
    const response = await fetch(
      `http://api.nbp.pl/api/exchangerates/tables/${typeTable}/`
    );
    let data = await response.json();
    let rates = data[0].rates;
    let viewTable = '';
    if (typeTable === 'a') viewTable = document.querySelector('.listCurrency');
    else viewTable = document.querySelector('.listCurrencyB');
    viewTable.innerHTML = '';
    rates.map(el => {
      viewTable.innerHTML += `
      <div class="listElementCurrency">
        <div class="codeCurrency">${el.code}</div>
        <div class="nameCurrency">${el.currency}</div>
        <div class="buttonChoose">Wybierz</div>
        </div>`;
    });
  } catch (e) {
    alert('Nie udało się pobrać danych z API. ' + e);
  }
}

/* Count rates */
async function getRateCurrency(table, code, index) {
  let rate = '';
  try {
    const response = await fetch(
      `http://api.nbp.pl/api/exchangerates/rates/${table}/${code}`
    );
    let data = await response.json();
    rate = data.rates[0].mid;
  } catch (e) {
    alert('Nie można pobrać aktualnego kursu waluty. ' + e);
  }

  let value = rate * myNums[index + 1];
  //splice
  return value;
}
