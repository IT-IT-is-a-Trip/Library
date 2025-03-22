function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        if (isRead) {
            console.log(title + ' ' + author + ' ' + pages + " " + 'Already read')
        } else {console.log(title + ' ' + author + ' ' + pages + " " + 'not read yet')
        }
    }
}

const book1 = new Book('Requiem for a dream', 'Hubert Selby Jr', 320, true)

Book.prototype.rateThis = function(rating) {
    this.rating = rating;
}