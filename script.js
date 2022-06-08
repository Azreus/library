/*
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}.`;
  }
}
*/

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}.`;
  }
}

let myLibrary = [];

let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 300, true);
let book2 = new Book('Skulduggery Pleasant', 'Derek Landy', 200, true);
let book3 = new Book('American Gods', 'Neil Gaiman', 600, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

let cardScreen = document.querySelector('.card-screen');

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', addBookToLibrary);

let toggleForm = document.querySelector('.toggle-form');
toggleForm.addEventListener('click', () => {
  if (document.querySelector('.form').style.display === "block") { document.querySelector('.form').style.display = "none" }
  else { document.querySelector('.form').style.display = "block" }
});

loadBooksDiplays();

Book.prototype.changeReadStatus = function(index) {
  console.log(index);
  // Finding the card element linked to the current object
  let btn = document.querySelector(`[data-index="${index}"]`);
  // And then finding the div element with the read status
  let readStatus = btn.parentNode.querySelector('.read-status');
  if (this.read) {
    this.read = false;
    readStatus.textContent = 'Not read';
  } else {
    this.read = true;
    readStatus.textContent = 'Read';
  }
  console.log(readStatus);
}

function addBookToLibrary() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let pages = document.querySelector('#pages').value;
  let readStatusY = document.querySelector('#read');
  let readStatusN = document.querySelector('#not_read');
  let readStatus = true;
  if (title === '' || author === '' || pages === '' || (!readStatusY.checked && !readStatusN.checked)) {
    alert('Please complete the form.');
  } else {
    if (readStatusY.checked) {
      readStatus = true;
    } else {
      readStatus = false;
    }
    let book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    // Clear input values
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    document.querySelector('#not_read').checked = false;
  }
  clearBooksDisplay();
  loadBooksDiplays();
}

function loadBooksDiplays() {
  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement('div');
    // Loading book info
    let titleDisplay = document.createElement('div');
    let authorDisplay = document.createElement('div');
    let pagesDisplay = document.createElement('div');
    let readDisplay = document.createElement('div');
    titleDisplay.textContent = myLibrary[i].title;
    authorDisplay.textContent = myLibrary[i].author;
    pagesDisplay.textContent = `${myLibrary[i].pages} pages`;
    readDisplay.textContent = myLibrary[i].read ? 'Read' : 'Not read';
    readDisplay.classList.add('read-status');
    card.appendChild(titleDisplay);
    card.appendChild(authorDisplay);
    card.appendChild(pagesDisplay);
    card.appendChild(readDisplay);
    // Adding delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-index', i)
    deleteButton.addEventListener('click', () => {
      myLibrary.splice(i, 1);
      clearBooksDisplay();
      loadBooksDiplays();
    });
    card.appendChild(deleteButton);
    // Adding 'change read status' button
    let chgReadStatusBtn = document.createElement('button');
    chgReadStatusBtn.textContent = 'Change Read Status';
    chgReadStatusBtn.classList.add('read-button');
    chgReadStatusBtn.addEventListener('click', () => {
      myLibrary[i].changeReadStatus(i);
    });
    card.appendChild(chgReadStatusBtn);
    card.classList.add('card');
    cardScreen.appendChild(card);
  }
}

function clearBooksDisplay() {
  let card = cardScreen.lastElementChild;
  while (card) {
    cardScreen.removeChild(card);
    card = cardScreen.lastElementChild;
  }
}