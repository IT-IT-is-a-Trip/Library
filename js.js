const addBookBtn = document.getElementById('add-book-btn');
const booksWrapper = document.getElementById('books-wrapper');

function Book(title, author, pages, isRead) {
    if (!title || !author || !pages || isRead !== true && isRead !== false) {
        throw Error('Missing required properties.');
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        if (isRead) {
            console.log(title + ' ' + author + ' ' + pages + " " + 'Already read')
        } else {
            console.log(title + ' by ' + author + ' ' + pages + " " + 'not read yet')
        }
    }
}

const book1 = new Book('Requiem for a dream', 'Hubert Selby Jr', 320, true);
const book2 = new Book('Fight club', 'chuck palahniuk', 256, true);
const book3 = new Book('The Call of Cthulhu', 'Howard Phillips "H. P." Lovecraft', 640, false)
Book.prototype.rateThis = function (rating) {
    this.rating = rating;
}

const library = [];

function AddBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    newBook.id = crypto.randomUUID();
    library.push(newBook);
    console.log(library);
}

library.push(book1);
library.push(book2);
library.push(book3);

function displayBooks() {
    for (let b of library) {
        const card = document.createElement('div');
        const bookInfo = document.createElement('div');
        const cardButtons = document.createElement('div');
        const isReadButton = document.createElement('button');
        const removeButton = document.createElement('button');
        
        const bookTitle = document.createElement('div');
        const bookAuthor = document.createElement('div');
        const bookPages = document.createElement('div');
        const bookIsRead = document.createElement('div');

        
        
        booksWrapper.appendChild(card);
        card.appendChild(bookInfo);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(bookIsRead);
        card.appendChild(cardButtons);
        cardButtons.appendChild(isReadButton);
        cardButtons.appendChild(removeButton);
        bookTitle.textContent = b.title;
        bookAuthor.textContent = b.author;
        bookPages.textContent = b.pages;
        bookIsRead.textContent = b.isRead;
        card.setAttribute('class', 'card');
        b.id = crypto.randomUUID();
        card.setAttribute('data-id', b.id);
        removeButton.textContent = 'remove'
        removeButton.addEventListener('click', () => {
            library.splice(library.findIndex(book => book.id === b.id), 1);
            const cards = document.querySelectorAll('.card');
            cards.forEach((card) => {
                card.remove();
            })
            displayBooks();
        })
    }
}

displayBooks()
const dialogForm = document.getElementById('dialogForm');
addBookBtn.addEventListener('click', () => {
    dialogForm.showModal();
})
const closeButton = document.getElementById('close-button');
const bookForm = document.getElementById('book-form');
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm)
    const newBook = {};
    formData.forEach((value, key) => {
        newBook[key] = value;
    });
    const isReadCheckbox = document.getElementById('isRead');
    newBook.isRead = isReadCheckbox.checked;

    const bookToAdd = new Book(newBook.title, newBook.author, newBook.pages, newBook.isRead);
    library.push(bookToAdd);

    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.remove());
    displayBooks();
    bookForm.reset();
    dialogForm.close();
})

//form close button 
const formCloseButton = document.getElementById('close-button');
formCloseButton.addEventListener('click', () => {
    dialogForm.close();
    bookForm.reset();
});

//book is read button 

