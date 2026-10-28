let myLibrary = [];

class Book {
  constructor(title, author, pages, status, id) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

  }

  toggleRead() {
    if (this.status == "not read yet") {
      this.status = "Read"
    }
    else this.status = "not read yet";
    return this.status;
  }

  static addToLib(title, author, pages, status, id) {
    const newBook = new Book(title, author, pages, status, id);
    myLibrary.push(newBook);
  }
}

Book.addToLib("The Hobbit", "J.R.R Tolkein", 295, "not read yet", crypto.randomUUID());
Book.addToLib("1984", "George Orwell", 288, "read", crypto.randomUUID());
Book.addToLib("The Witcher", "Andrzej Sapkowski", 235, "not read yet", crypto.randomUUID());
Book.addToLib("Harry Potter", "J.K Rowling", 223, "read", crypto.randomUUID());
Book.addToLib("Mein Kampf", "Adolf Hitler", 295, "not read yet", crypto.randomUUID());
Book.addToLib("Atomic Habits", "James Clear", 265, "not read yet", crypto.randomUUID());

let catalogOfBooks = document.querySelector(".catalog");

function displayBooks() {
  catalogOfBooks.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
    <h3>${book.title}</h3>
    <p>By ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <button class="status" data-id=${book.id}>${book.status}</button>
    <button class="remove" data-id=${book.id}>Remove Book</button>
    `;

    catalogOfBooks.appendChild(card);
  });
}

displayBooks();


//Selecting these three input elements to perform custom validity checks on them. Of course they will also be used later to add a book to the catalogue
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const form = document.querySelector("form");

function validateTitle(){
  title.setCustomValidity('');
  
  if (title.validity.tooShort){
    title.setCustomValidity('Please enter a proper book name.');
  }
  else if (title.validity.tooLong){
    title.setCustomValidity("No book with that long of a name even exists.");
  }
}

function validateAuthor(){
  author.setCustomValidity('');
  
  if (author.validity.patternMismatch){
    author.setCustomValidity("Please properly enter the author's name");
  }
}

function validatePages(){
    pages.setCustomValidity('');

    if (pages.validity.rangeUnderflow){
      pages.setCustomValidity("A book with one page isn't a book now is it?");
    }
    else if (pages.validity.rangeOverflow){
      pages.setCustomValidity("Let's be honest, You're not reading a book that long.");
    }
    else if (pages.validity.stepMismatch){
      pages.setCustomValidity("Whole Numbers only, please.")
    }
}
title.addEventListener("input", validateTitle);
author.addEventListener("input", validateAuthor);
pages.addEventListener("input", validatePages);

//This function adds a new book and will be used in the event listener for the submit button that adds a new book
function addNewBook() {
  Book.addToLib(title.value, author.value, pages.value, "not read yet", crypto.randomUUID());
  displayBooks();
}
// Here's the submit button that'll use the above func
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewBook();
  form.reset();
  document.querySelector("#new-book").hidePopover();
})

//button for removing a book
catalogOfBooks.addEventListener("click", (e) => {

  if (e.target.classList.contains("remove")) {
    const bookId = e.target.getAttribute("data-id")
    myLibrary = myLibrary.filter((book) => book.id !== bookId);
    displayBooks();
    console.log(myLibrary);
  }
})

//button to toggle read status
catalogOfBooks.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    // get the data-id attribute
    const bookId = e.target.getAttribute("data-id");
    // search myLibrary for the object with the same property as the data-id attribute
    const myLibId = myLibrary.find((book) => book.id === bookId);
    myLibId.toggleRead();
    displayBooks();
  }
})