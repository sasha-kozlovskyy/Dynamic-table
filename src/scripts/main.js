/* eslint-disable no-undef */
'use strict';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';
const headers = ['Имя', 'Ставка', 'Коэффициент', 'Итог'];
const table = document.body.appendChild(document.createElement('table'));
const thead = table.appendChild(document.createElement('thead'));
const tbody = table.appendChild(document.createElement('tbody'));
const tfoot = table.appendChild(document.createElement('tfoot'));

function createTable() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(res => {
      let data = [];

      data = res;

      data.forEach((i) => {
        const tr = tbody.appendChild(document.createElement('tr'));

        tr.insertAdjacentHTML(
          'beforeend',
          `
          <td class='name'>${i.name}</td>
        `
        );

        tr.insertAdjacentHTML(
          'beforeend',
          `
          <td class='rate'>
            <input value='' type='number' class='rate' id='rate' step='0.01'>
          </td>
        `
        );

        tr.insertAdjacentHTML(
          'beforeend',
          `
          <td class='koef'>
            <input value='' type='number' class='koef' id='koef' step='0.01'>
          </td>
        `
        );

        tr.insertAdjacentHTML(
          'beforeend',
          `
          <td class='result'></td>
        `
        );
      });

      headers.forEach((i) => {
        thead.appendChild(document.createElement('td')).textContent = i;
        tfoot.appendChild(document.createElement('td'));
      });

      tfoot.firstChild.textContent = 'Всего';

      table.addEventListener('focusout', function(e) {
        const inp = e.target;
        const fouthCol = document.querySelectorAll('.result');

        if (inp.tagName === 'INPUT') {
          inp.value = Number.parseFloat(inp.value).toFixed(2);

          const tr = inp.closest('tr');
          const rate = tr.querySelector('#rate');
          const koef = tr.querySelector('#koef');
          const result = tr.querySelector('.result');

          if (koef.value === '') {
            result.textContent = rate.value * 1;
          } else {
            result.textContent = Number.parseFloat(rate.value * koef.value)
              .toFixed(2);
          }
        }

        const arr = [];

        [...fouthCol].map((x) => arr.push(+x.textContent));

        tfoot.lastChild.textContent = Number.parseFloat(
          arr.reduce((x, y) => {
            return x + y;
          }, 0)
        ).toFixed(2);
      });
    });
}

createTable();

document.head.appendChild(document.createElement('style')).textContent = `
table, tr {
  border: 1px solid black;
  padding: 0;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 16px;
  font-family: sans-serif;
}
thead {
  font-size: 20px;
  font-weight: bold;
  border-collapse: separate;
}
td {
  border: 1px solid black;
  width: 200px;
  height: 30px;
  padding-left: 10px;
  border-spacing: 0;
  border-collapse: separate;
}

tfoot {
  border-spacing: 0;
  border-collapse: separate;
  font-size: 20px;
  font-weight: bold;
}

.result {
  color: grey;
  font-size: 16px;
}

input {
  border: none;
  outline: none;
  font-size: 16px;
  font-family: sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}

.name {
  color: #FF8C00;
}
  `;
