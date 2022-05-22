let myLibrary = [];

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
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    document.querySelector('#not_read').checked = false;
  }
}