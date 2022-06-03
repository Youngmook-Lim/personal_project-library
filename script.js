"use strict";

const libraryContainer = document.querySelector(".library__container");

let myLibrary = [];

const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

const addBookToLibrary = function (book) {
  myLibrary.push(book);
};

const newBook1 = new Book("lord of the rings", "tolkien", 10, false);
const newBook2 = new Book("star wars", "darth vader", 30, true);
const newBook3 = new Book("art of the deal", "trump", 100, false);
const newBook4 = new Book("how to get fucked up", "conor mcgregor", 52, true);

addBookToLibrary(newBook1);
addBookToLibrary(newBook2);
addBookToLibrary(newBook3);
addBookToLibrary(newBook4);

console.log(myLibrary);

const showLibraryBooks = function () {
  myLibrary.forEach((book) => {
    const html = `
    <div class="book">
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <p>${book.read === true ? "Read" : "Not Read"}</p>
    </div>
    `;
    libraryContainer.insertAdjacentHTML("beforeend", html);
  });
};

showLibraryBooks();
