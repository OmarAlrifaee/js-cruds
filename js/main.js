// selecte elements
const addProductBtn = document.querySelector(".add-product");
const createBtn = document.querySelector(".create-btn");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const controlsContainer = document.querySelector(".controls");
const titleInput = document.querySelector("[name='title']");
const priceInput = document.querySelector("[name='price']");
const taxesInput = document.querySelector("[name='taxes']");
const adsInput = document.querySelector("[name='ads']");
const discountInput = document.querySelector("[name='discount']");
const countInput = document.querySelector("[name='count']");
const categoryInput = document.querySelector("[name='category']");
const totalSpan = document.querySelector(".total-value");
const searchInput = document.querySelector(".search-input");
const searchByCategoryInput = document.getElementById("category");
const searchByTitleInput = document.getElementById("title");
const radioInputs = document.getElementsByName("search-radio");
const table = document.querySelector("table");

// get the data from local storag
// window.addEventListener("load", getData);

// main options
let id = 1;
// hundle the add product button
addProductBtn.addEventListener("click", () => {
  controlsContainer.classList.remove("d-none");
  addProductBtn.remove();
});

// hundle the total span on input
priceInput.addEventListener("input", () => {
  getTotal(priceInput);
});
adsInput.addEventListener("input", () => {
  getTotal(adsInput);
});
taxesInput.addEventListener("input", () => {
  getTotal(taxesInput);
});
discountInput.addEventListener("input", () => {
  getTotal(discountInput);
  totalSpan.classList.remove("d-none");
});

// hundle the create button
createBtn.addEventListener("click", () => {
  createProduct();
  emptyInputs();
  // saveData();
});
// hundle the delete all button
deleteAllBtn.addEventListener("click", () => {
  deleteAll();
  // saveData();
});
// update button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("update-btn")) {
    updateProduct(e.target);
    scrollTo({
      top: 0,
    });
  }
});
// delete button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.parentElement.remove();
    // saveData();
    scrollTo({
      top: 0,
    });
  }
});
// search
searchInput.addEventListener("input", search);
// functions
// get total function
function getTotal(input) {
  if (
    priceInput.value !== "" &&
    taxesInput.value !== "" &&
    adsInput.value !== ""
  ) {
    totalSpan.innerHTML =
      +priceInput.value +
      +adsInput.value +
      +taxesInput.value -
      +discountInput.value;
    document.querySelector(".alert").classList.add("d-none");
  } else {
    totalSpan.innerHTML = "";
    document.querySelector(".alert").classList.remove("d-none");
  }
}

// main create function
function createProduct() {
  if (
    priceInput.value !== "" &&
    adsInput.value !== "" &&
    titleInput.value !== "" &&
    taxesInput.value !== "" &&
    categoryInput.value !== ""
  ) {
    checker();
    document.querySelector(".alert").classList.add("d-none");
  } else {
    document.querySelector(".alert").classList.remove("d-none");
  }
}
// checker function
function checker() {
  if (countInput.value !== "") {
    for (let i = 0; i < countInput.value; i++) {
      createElements();
    }
  } else {
    createElements();
  }
}
// create elements functions
function createElements() {
  // create main tr
  let tr = document.createElement("tr");
  tr.classList.add("text-white-50", "fs-4", "product");
  // create id td
  let idTd = document.createElement("td");
  idTd.innerHTML = id;
  id++;
  // create title td
  let titleTd = document.createElement("td");
  titleTd.innerHTML = titleInput.value;
  titleTd.classList.add("title");
  // create price td
  let priceTd = document.createElement("td");
  priceTd.innerHTML = priceInput.value;
  // create taxes td
  let taxesTd = document.createElement("td");
  taxesTd.innerHTML = taxesInput.value;
  // create ads td
  let adsTd = document.createElement("td");
  adsTd.innerHTML = adsInput.value;
  // create discount td
  let discountTd = document.createElement("td");
  discountTd.innerHTML = discountInput.value === "" ? "0" : discountInput.value;
  // create total td
  let totalTd = document.createElement("td");
  totalTd.innerHTML =
    +priceInput.value +
    +taxesInput.value +
    +adsInput.value -
    +discountInput.value;
  // create category td
  let categoryTd = document.createElement("td");
  categoryTd.innerHTML = categoryInput.value;
  // create update td
  let updateTd = document.createElement("td");
  let updateBtn = document.createElement("button");
  updateBtn.innerHTML = "update";
  updateBtn.classList.add(
    "btn",
    "update-btn",
    "rounded",
    "py-1",
    "px-2",
    "fw-bold",
    "text-uppercase"
  );
  updateTd.append(updateBtn);
  // create delete td
  let deleteTd = document.createElement("td");
  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "delete";
  deleteBtn.classList.add(
    "btn",
    "delete-btn",
    "rounded",
    "py-1",
    "px-2",
    "fw-bold",
    "text-uppercase",
    "text-light"
  );
  deleteTd.append(deleteBtn);
  // append all od the td's to the main tr
  tr.append(idTd);
  tr.append(titleTd);
  tr.append(priceTd);
  tr.append(taxesTd);
  tr.append(adsTd);
  tr.append(discountTd);
  tr.append(totalTd);
  tr.append(categoryTd);
  tr.append(updateTd);
  tr.append(deleteTd);
  // append the tr to the table
  table.append(tr);
}
// empty the inputs after create product
function emptyInputs() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  totalSpan.innerHTML = "";
  countInput.value = "";
  categoryInput.value = "";
}
// delete all function
function deleteAll() {
  let products = Array.from(table.children);
  products.forEach((element) => {
    if (element.classList.contains("product")) {
      element.remove();
    }
  });
}
// update btn function
function updateProduct(button) {
  // select the current tr
  let trElement = button.parentElement.parentElement;
  // update the inputs
  titleInput.value = trElement.children[1].innerHTML;
  priceInput.value = trElement.children[2].innerHTML;
  taxesInput.value = trElement.children[3].innerHTML;
  adsInput.value = trElement.children[4].innerHTML;
  discountInput.value = trElement.children[5].innerHTML;
  totalSpan.innerHTML = trElement.children[6].innerHTML;
  categoryInput.value = trElement.children[7].innerHTML;
  // delete the product
  trElement.remove();
  // click the add product button if exist
  if (addProductBtn) {
    addProductBtn.click();
  }
}
// set data in local storag
function saveData() {
  localStorage.setItem("products", table.innerHTML);
}
// get data from local storag
function getData() {
  if (localStorage.getItem("products")) {
    table.innerHTML = localStorage.getItem("products");
  }
}
// search function
function search() {
  let trs = Array.from(table.children);
  radioInputs.forEach((input) => {
    if (searchInput.value !== "") {
      if (input.checked) {
        if (input.id === "title") {
          trs.forEach((tr) => {
            if (tr.classList.contains("product")) {
              tr.classList.add("d-none");
              if (tr.children[1].innerHTML.includes(searchInput.value)) {
                tr.classList.remove("d-none");
              }
            }
          });
        } else {
          trs.forEach((tr) => {
            if (tr.classList.contains("product")) {
              tr.classList.add("d-none");
              if (tr.children[7].innerHTML.includes(searchInput.value)) {
                tr.classList.remove("d-none");
              }
            }
          });
        }
      }
    } else {
      trs.forEach((tr) => {
        tr.classList.remove("d-none");
      });
    }
  });
}
