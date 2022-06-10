// DOM elements
var newBookBtn = document.querySelector('#new-book-btn');
var newBookForm = document.querySelector('#new-book-form');
var newBookTitle = document.querySelector('#new-book-title');
var newBookAuthor = document.querySelector('#new-book-author');
var newBookCategory = document.querySelector('#new-book-category');
var addBookBtn = document.querySelector('#add-book-btn');
var bookList = document.querySelector('#book-list');
var errorMessageDiv = document.querySelector('#error-message');


// Book() constructor function
function Book(title, author, category) {
  this.title = title;
  this.author = author;
  this.category = category;
}

// first time page is loaded
if (localStorage.getItem('books') != null) {
  showBookList();
}

// display book list
function showBookList() {
  // fetch data from localStorage
  var books = JSON.parse(localStorage.getItem('books'));

  // the data is an array of book objects
  for (var i = 0; i < books.length; i++) {
    createListItem(books[i]);
  }
}

// toggle the form display
newBookBtn.addEventListener('click', function() {
  if (newBookForm.style.display === 'block') {
    newBookForm.style.display = 'none';
    newBookBtn.textContent = 'New book';
    newBookBtn.setAttribute('class', 'generic-button');
    resetForm();
  } else {
    newBookForm.style.display = 'block';
    newBookBtn.textContent = 'Cancel';
    newBookBtn.setAttribute('class', 'generic-button-red');
    resetForm();
  }
});

// validate form and save the book
addBookBtn.addEventListener('click', function(e) {
  var errorMessage = '';
  var invalidFields = '';

  if (newBookTitle.value === '') {
    invalidFields += '<p>Title is missing!</p>';
  }

  if (newBookAuthor.value === '') {
    invalidFields += '<p>Author is missing!</p>';
  }

  if (newBookCategory.value === '') {
    invalidFields += '<p>Category is missing!</p>';
  }

  // update error messages
  if (invalidFields != '') {
    errorMessage += invalidFields;
  }

  // if all fields are OK
  if (errorMessage === '') {
    // save new book 
    saveBook();
    // and hide the form
    newBookForm.style.display = 'none';
    newBookBtn.textContent = 'New book';
    newBookBtn.setAttribute('class', 'generic-button');
  } else {
    // or display the errors
    errorMessageDiv.innerHTML = errorMessage;
  }

  // prevent form submit
  e.preventDefault();
});

// create new book object and save it to localStorage
function saveBook() {
  // get values from form elements
  var title = newBookTitle.value;
  var author = newBookAuthor.value;
  var category = newBookCategory.options[newBookCategory.selectedIndex].text;

  // create the new book object with those values
  var newBook = new Book(title, author, category);

  // check if the localStorage has a books data
  if (localStorage.getItem('books') === null) {
    // if not, create one
    var books = [];
    // and add the new book object to it
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    // otherwise, add the new book object to the existing data
    var books = JSON.parse(localStorage.getItem('books'));
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // add the new book object to the book list too
  createListItem(newBook);
}

// format every item of the book list
function createListItem(book) {
  // a single item contains div1 and ul
  var listItem = document.createElement('li');
  listItem.setAttribute('class', 'book-item');

  // div1 contains p and div2
  var div1 = document.createElement('div');
  div1.setAttribute('class', 'book-item-content clearfix');

  var p = document.createElement('p');
  p.setAttribute('class', 'book-item-text');
  p.textContent = book.author + ', ';

  var it = document.createElement('i');
  it.textContent = book.title;

  // div2 contains button1 and button2
  var div2 = document.createElement('div');
  div2.setAttribute('class', 'book-item-buttons');

  // more info button
  var button1 = document.createElement('button');
  button1.setAttribute('class', 'show-details-btn');
  button1.textContent = 'i';

  // remove book button
  var button2 = document.createElement('button');
  button2.setAttribute('class', 'delete-item-btn');
  button2.textContent = 'X';

  // list with more information about a specific book
  var ul = document.createElement('ul');
  ul.setAttribute('class', 'book-item-details');
  ul.style.display= 'none';

  var li = document.createElement('li');
  li.innerHTML = '<b>Category: </b>' + book.category;


  div2.appendChild(button1);
  div2.appendChild(button2);
  p.appendChild(it);

  div1.appendChild(p);
  div1.appendChild(div2);

  ul.appendChild(li);

  listItem.appendChild(div1);
  listItem.appendChild(ul);

  // last book added is on top of the list
  bookList.insertBefore(listItem, bookList.firstChild);

  // toggles ul info panel
  button1.onclick = function() {
    if (ul.style.display === 'none') {
      ul.style.display = 'block';
    } else {
      ul.style.display = 'none';
    }
  }

  // remove book from list and from localStorage
  button2.onclick = function() { 
    bookList.removeChild(listItem);
    removeBook(book);
  }
}

// remove book from localStorage
function removeBook(book) {
  // fetch data from localStorage
  var books = JSON.parse(localStorage.getItem('books'));

  // if there is only 1 book
  if (books.length === 1) {
    // empty the localStorage
    localStorage.removeItem('books');
  } else {
    for (var i = 0; i < books.length; i++) {
      // delete the choosed one otherwise
      if (books[i].isbn === book.isbn) {
        books.splice(i, 1);
        // and update the data on the localStorage
        localStorage.setItem('books', JSON.stringify(books));
      }
    }
  }  
}

// resetting form values
function resetForm() {
  newBookTitle.value = '';
  newBookAuthor.value = '';
  newBookCategory.value = '';
  errorMessageDiv.textContent = '';
}

let myWindow;
function ClosePopUp() {
  myWindow.close();
}
