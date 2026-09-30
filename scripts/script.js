const myLibrary =[];
const form = document.querySelector('#add_book_form');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const author = form.querySelector('#book_author').value;
    const title = form.querySelector('#book_title').value;
    const pages = form.querySelector('#book_pages').value;
    const check = form.querySelector("#is_read").checked;
    
    form.reset();
    addBookToLibrary(author,title,pages, check);
    console.log(myLibrary)

    
});


function Book (author,title,pages, check){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title
    this.pages = pages;
    this.check = check;

}

function addBookToLibrary(author, title, pages, check){
    
    const newBook = new Book(author, title, pages, check); 

    myLibrary.push(newBook);

    displayBook();
    return newBook; 
}

function displayBook(){
    const libraryDiv = document.querySelector("#library");
    libraryDiv.innerHTML = "";

    myLibrary.forEach((book)=>{
        const card = document.createElement("div");
        card.className ="book_card";

        const bookTitle = document.createElement("h3");
        bookTitle.className = "book_title";
        bookTitle.textContent = `Title : ${book.title}`;

        const bookAuthor = document.createElement("p");
        bookAuthor.className ="book_author";
        bookAuthor.textContent = `Author : ${book.author}`;

        const bookPages = document.createElement("p");
        bookPages.className = "book_pages";
        bookPages.textContent = `Pages : ${book.pages}`;

        const statusBtn = document.createElement("button");
        statusBtn.className = book.check ? "status_btn read":"status_btn unread";
        statusBtn.textContent = book.check ? "Read" : "Not Read";

        statusBtn.addEventListener("click", function(){
            book.check = !book.check;
            statusBtn.textContent = book.check ? "Read":"Not Read";
        })
        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete_btn";
        deleteBtn.textContent = "X";

        deleteBtn.addEventListener("click", function(){
            const index = myLibrary.findIndex(item => item.id === book.id);
            myLibrary.splice(index, 1);
            displayBook();
        });

        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(statusBtn);
        card.appendChild(deleteBtn);
        libraryDiv.appendChild(card);
    }); 
}