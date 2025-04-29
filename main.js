const container = document.getElementsByClassName("container")[0];

const populateLibrary = function (array) {
  console.log(array);
  array.forEach((element) => {
    let card = document.createElement("div");
    card.innerHTML = `<div class="card">
    <img src="${element.img}" class="card-img-top img-fluid" alt="book cover">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.price}</p>
      <a href="#" class="btn btn-primary">Scarta</a>
    </div>
  </div>`;
    container.appendChild(card);
  });
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

window.addEventListener("load", fetchBooks);
