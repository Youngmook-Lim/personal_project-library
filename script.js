"use strict";

let myLibrary = [];

const Book = function (author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
};

const addBookToLibrary = function (book) {
  myLibrary.push(book);
};
