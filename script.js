const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const clearAll = document.querySelector(".clear");
const tacoAll = document.querySelector(".tacoAll");
const untacoAll = document.querySelector(".unTaco");

let items = JSON.parse(localStorage.getItem("items")) || [];

function additem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset(); //for reseting the form
}

function populateList(plates = [], plateList) {
  plateList.innerHTML = plates
    .map((plate, i) => {
      return `
            <li>
                <input type='checkbox' data-index='${i}' id='item${i}' ${
        plate.done ? "checked" : ""
      }>
                <label for="item${i}">${plate.text}</label>    
            </li> 
            `;
    })
    .join("");
  console.table(plates);
}

function togglePlate(e) {
  if (!e.target.matches("input")) return; //skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
}

function funcClearAll(e) {
  const perm = confirm("Do you really wish to clear your list");
  if (!perm) {
    return;
  } else {
    items = [];
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  }
}

function funcTacoAll() {
  items.forEach((obj) => {
    obj.done = true;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function funcUntacoAll() {
  items.forEach((obj) => {
    obj.done = false;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

populateList(items, itemsList);

addItems.addEventListener("submit", additem);
itemsList.addEventListener("click", togglePlate);
clearAll.addEventListener("click", funcClearAll);
tacoAll.addEventListener("click", funcTacoAll);
untacoAll.addEventListener("click", funcUntacoAll);
