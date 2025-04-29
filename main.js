const container = document.getElementsByClassName("container")[0];
const row = document.getElementsByClassName("row")[0];
const cartContainer = document.getElementsByClassName("cartContainer")[0];
const myList = document.getElementById("myList");
let cart = [];

const populateLibrary = function (array) {
  console.log(array);
  array.forEach((element) => {
    let col = document.createElement("div");
    col.classList.add("col-md-3");

    col.innerHTML = `<div class="card">
    <img src="${element.img}" class="card-img-top img-fluid" alt="book cover">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.price}</p>
      <button class="btn btn-primary">Scarta</button>
      <button class="btn btn-success">Compra ora</button>
    </div>
  </div>`;

    row.appendChild(col);
  });
  checkstorage();
  addEvents();
};

const checkstorage = function () {
  if (localStorage.length != 0) {
    cart = JSON.parse(localStorage.getItem("myBooks"));
  }
};

const fetchBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      populateLibrary(data);
    })
    .catch((error) => console.error(error));
};

const updateCart = function () {
  myList.innerHTML = "";
  cart.forEach((book) => {
    let listItem = document.createElement("li");
    listItem.innerText = book;
    let removeCartBtn = document.createElement("button");
    removeCartBtn.innerText = "Rimuovi dal carello";
    removeCartBtn.addEventListener("click", removeFromCart);
    listItem.appendChild(removeCartBtn);
    myList.appendChild(listItem);
  });
};

const removeFromCart = function (event) {
  let bookToRemoveFromCart = this.parentElement;
  bookToRemoveFromCart.remove();
};

const saveCart = function () {
  localStorage.setItem("myBooks", JSON.stringify(cart));
};

const discard = function () {
  const cardToRemove = this.parentElement.parentElement;
  cardToRemove.remove();
};

const addToCart = function (event) {
  let bookToAdd = this.parentElement.querySelector(".card-title").innerText;
  cart.push(bookToAdd);
  updateCart();
  saveCart();
};

const addEvents = function () {
  const btnsRemove = document.querySelectorAll(".btn-primary");
  btnsRemove.forEach((btn) => btn.addEventListener("click", discard));
  const btnsBuy = document.querySelectorAll(".btn-success");
  btnsBuy.forEach((btn) => btn.addEventListener("click", addToCart));
};

window.addEventListener("load", fetchBooks);
