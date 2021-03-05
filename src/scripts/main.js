'use strict';

const thead = document.querySelector('tr');
const tBody = document.querySelector('tbody');
const rowsList = [...tBody.querySelectorAll('tr')];

const regExpReplaceSymbols = /[^\d]/g;

function numbersFilter(value) {
  return Number(value.replace(regExpReplaceSymbols, ''));
}

function sortByHeadline(callback, tableRows, columnPosition, fieldName) {
  const sortStrings = (prevPerson, nextPerson) => {
    const prevProperty = prevPerson.children[columnPosition].textContent;
    const nextProperty = nextPerson.children[columnPosition].textContent;

    return prevProperty.localeCompare(nextProperty);
  };

  const sortNumbers = (prevPerson, nextPerson) => {
    const prevProperty = prevPerson.children[columnPosition].textContent;
    const nextProperty = nextPerson.children[columnPosition].textContent;

    if (prevProperty.match(regExpReplaceSymbols) !== null) {
      return callback(prevProperty) - callback(nextProperty);
    }

    return prevProperty - nextProperty;
  };

  let sortedColumn = null;

  switch (fieldName) {
    case 'Name':
    case 'Position':
      sortedColumn = tableRows.sort(sortStrings);
      break;

    case 'Age':
    case 'Salary':
      sortedColumn = tableRows.sort(sortNumbers);
      break;
  }

  return sortedColumn;
}

thead.addEventListener('click', e => {
  const selectedTarget = e.target.textContent;
  const column = e.target.cellIndex;

  const sortedColumn = sortByHeadline(
    numbersFilter, rowsList, column, selectedTarget
  );

  tBody.append(...sortedColumn);
});
