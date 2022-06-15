"use strict";

const books = document.querySelector(".books");
const btnRemoveLocal = document.querySelector(".btn__remove-local");
const btnAdd = document.querySelector(".btn__add");
const btnSubmit = document.querySelector(".btn__submit");
const btnCloseModal = document.querySelector(".btn__close-modal");
// const btnRead = document.querySelector(".read");
// const btnRemove = document.querySelectorAll(".btn__remove");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const inputTitle = document.querySelector(".form-input--title");
const inputAuthor = document.querySelector(".form-input--author");
const inputPages = document.querySelector(".form-input--pages");
const inputRead = document.querySelector(".form-input--read");
const inputAll = document.querySelectorAll(".form-input");
const form = document.querySelector(".add-book");
const library = document.querySelector(".library");

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id =
      myLibrary.length === 0 ? 0 : myLibrary[myLibrary.length - 1].id + 1;
  }

  changeRead() {
    if (this.read == true) {
      this.read = false;
    } else this.read = true;
  }
}

// Functions

const addBookToLibrary = function (book) {
  myLibrary.push(book);
};

const showBook = function (book) {
  let html;
  if (document.location.pathname.includes("korean")) {
    html = `
    <div data-id="${book.id}" class="book">
      <p class="title">"${book.title}"</p>
      <p><span class="author">${book.author}</span></p>
      <p class="pages">${book.pages} 페이지</p>
      <button class="btn read ${
        book.read === true ? "read-true" : "read-false"
      }">${book.read === true ? "다 읽음" : "읽는 중"}</button>
      <button class="btn btn__remove">책 삭제</button>
    </div>
    `;
  } else {
    html = `
    <div data-id="${book.id}" class="book">
      <p class="title">"${book.title}"</p>
      <p>By <span class="author">${book.author}</span></p>
      <p class="pages">${book.pages} pages</p>
      <button class="btn read ${
        book.read === true ? "read-true" : "read-false"
      }">${book.read === true ? "Read" : "Not Read"}</button>
      <button class="btn btn__remove">Remove Book</button>
    </div>
    `;
  }

  books.insertAdjacentHTML("beforeend", html);
};

const showLibraryBooks = function () {
  myLibrary.forEach(showBook);
};

const clearInput = function () {
  inputAll.forEach((input) => {
    if (input.getAttribute("type") === "checkbox") {
      input.checked = false;
    } else input.value = "";
  });
};

const setLocalStorage = function () {
  localStorage.setItem("books", JSON.stringify(myLibrary));
};

const getLocalStorage = function (book) {
  const data = JSON.parse(localStorage.getItem("books"));
  if (!data) return;
  const newData = data.map((book) => {
    const newBook = new Book(book.title, book.author, book.pages, book.read);
    myLibrary.push(newBook);
    return newBook;
  });

  myLibrary = newData;
  showLibraryBooks();
};

const reset = function () {
  localStorage.removeItem("books");
  location.reload();
  // myLibrary = [];
  // showLibraryBooks();
};

// Examples

// const newBook1 = new Book("lord of the rings", "tolkien", 10, false);
// const newBook2 = new Book("star wars", "darth vader", 30, true);
// const newBook3 = new Book("art of the deal", "trump", 100, false);
// const newBook4 = new Book("how to get fucked up", "conor mcgregor", 52, true);

// addBookToLibrary(newBook1);
// addBookToLibrary(newBook2);
// addBookToLibrary(newBook3);
// addBookToLibrary(newBook4);

// Modal Window
const toggleHidden = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnAdd.addEventListener("click", function () {
  toggleHidden();
});

btnCloseModal.addEventListener("click", function () {
  clearInput();
  toggleHidden();
});
overlay.addEventListener("click", function () {
  clearInput();
  toggleHidden();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    clearInput();
    toggleHidden();
  }
});

// Event Listeners

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const read = inputRead.checked;

  if (myLibrary.find((book) => book.title === title)) {
    alert("The book already exists!");
    return;
  }
  if (title === "") {
    alert("Title field is required!");
    return;
  }
  if (author === "") {
    alert("Author field is required!");
    return;
  }
  if (pages === "") {
    alert("Pages field is required!");
    return;
  }
  if (isNaN(pages)) {
    alert("Page numbers should be numbers!");
    return;
  }
  if (pages < 0) {
    alert("Page numbers can't be negative!");
    return;
  }

  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  showBook(newBook);
  toggleHidden();
  clearInput();
  setLocalStorage();
  console.log(myLibrary);
});

library.addEventListener("click", function (e) {
  const btn = e.target;
  if (!btn.closest(".btn__remove")) return;

  const book = btn.closest(".book");
  const id = +book.dataset.id;
  const bookInLibrary = myLibrary.find((item) => item.id === id);
  const indexLib = myLibrary.indexOf(bookInLibrary);

  myLibrary.splice(indexLib, 1);
  book.remove();
  setLocalStorage();
});

library.addEventListener("click", function (e) {
  const btn = e.target;
  if (!btn.closest(".read")) return;
  const bookID = +btn.closest(".book").dataset.id;
  const thisBook = myLibrary.find((el) => el.id === bookID);
  thisBook.changeRead();
  console.log(thisBook);
  if (thisBook.read === false) {
    btn.textContent = "Not Read";
    btn.classList.add("read-false");
    btn.classList.remove("read-true");
  } else {
    btn.textContent = "Read";
    btn.classList.add("read-true");
    btn.classList.remove("read-false");
  }
  setLocalStorage();
});

btnRemoveLocal.addEventListener("click", reset);

// Init

showLibraryBooks();
getLocalStorage();
