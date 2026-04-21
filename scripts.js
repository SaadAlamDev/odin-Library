let myLibrary = [];

function Book(title, author, pages, status, id){
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleRead = function(){
  if(this.status == "not read yet"){
    this.status = "Read"
  }
  else this.status = "not read yet";
  return this.status
}

function addToLibrary(title, author, pages, status,id){
  const newBook = new Book(title, author, pages, status, id);
  myLibrary.push(newBook);
}

addToLibrary("The Hobbit", "J.R.R Tolkein", 295, "not read yet",crypto.randomUUID());
addToLibrary("1984", "George Orwell", 288, "read",crypto.randomUUID());
addToLibrary("The Witcher", "Andrzej Sapkowski", 235, "not read yet",crypto.randomUUID());
addToLibrary("Harry Potter", "J.K Rowling", 223, "read",crypto.randomUUID());
addToLibrary("Mein Kampf", "Adolf Hitler", 295, "not read yet",crypto.randomUUID());
addToLibrary("Atomic Habits", "James Clear", 265, "not read yet",crypto.randomUUID());


let catalogOfBooks = document.querySelector(".catalog");

function displayBooks(){
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

//Button for adding a new book
const btn = document.querySelector(".submit-button");
btn.addEventListener("click", (e) => {

  e.preventDefault()
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");

  if(!title.value || !author.value || !pages.value){
    alert("Please fill all the fields gandu.")
    return;
  }

  addToLibrary(title.value, author.value, pages.value, "not read yet", crypto.randomUUID());
  displayBooks();
 })

//button for removing a book
catalogOfBooks.addEventListener("click", (e) => {
  
  if(e.target.classList.contains("remove")){
    const bookId = e.target.getAttribute("data-id")
    myLibrary = myLibrary.filter((book) => book.id !== bookId);
    displayBooks();
    console.log(myLibrary);
  }
})

//button to toggle read status
catalogOfBooks.addEventListener("click", (e) => {
  if(e.target.classList.contains("status")){
    // get the data-id attribute
    const bookId = e.target.getAttribute("data-id"); 
    // search myLibrary for the object with the same property as the data-id attribute
    const myLibId = myLibrary.find((book) => book.id === bookId);
    myLibId.toggleRead();
    displayBooks();
  }
})
