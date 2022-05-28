let myLibrary = [];

let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 300, true);
let book2 = new Book('Skulduggery Pleasant', 'Derek Landy', 200, true);
let book3 = new Book('American Gods', 'Neil Gaiman', 600, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}.`;
  }
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
}

let cardScreen = document.querySelector('.card-screen');

function loadBooksDiplays() {
  for (let i = 0; i < myLibrary.length; i++) {
    let card = document.createElement('div');
    let titleDisplay = document.createElement('div');
    let authorDisplay = document.createElement('div');
    let pagesDisplay = document.createElement('div');
    let readDisplay = document.createElement('div');
    titleDisplay.textContent = myLibrary[i].title;
    authorDisplay.textContent = myLibrary[i].author;
    pagesDisplay.textContent = `${myLibrary[i].pages} pages`;
    readDisplay.textContent = myLibrary[i].read ? 'Read' : 'Not read';
    card.appendChild(titleDisplay);
    card.appendChild(authorDisplay);
    card.appendChild(pagesDisplay);
    card.appendChild(readDisplay);
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

loadBooksDiplays();