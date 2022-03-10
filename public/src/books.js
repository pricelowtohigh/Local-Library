function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id)
  return result;
}

function findBookById(books, id) {
  let result = books.find((book) => book.id === id); 
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let booksInLibrary = books.filter((book) => book.borrows[0].returned)
  let booksCheckedOut = books.filter((book) => !book.borrows[0].returned)
  let allBooks = [];
  allBooks.push(booksCheckedOut);
  allBooks.push(booksInLibrary);
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];                                      // final array
  let borrowerAcc = 0                                      // accumulator which increments until we hit out 10 account limit                           
    for (let borrow in book.borrows) {                     // looping through each "borrow" object in the 'borrows' array
      const theBorrow = book.borrows[borrow];              // assigning the "borrow" object to a variable. this object contains the ID of the borrower account and the 'return' status boolean
      const id = theBorrow.id;                             // storing the ID for this borrow in a const
      const returnStatus = theBorrow.returned;             // storing the return status to a const
      for (let each in accounts) {                         // looping through each account in 'accounts' array of objects
        const account = accounts[each];                    // declaring current account object as a variable
        let accountObject;                                 // declaring a new empty variable which we will use to create a new account object that also includes the return status
        if (account.id === id && borrowerAcc < 10) {       // if that account object matches the id of the borrower and we have not hi our 10 account limit
          accountObject = account;                         // set the new account object to equal this account object
          account['returned'] = returnStatus;              // create a new key:value pair, 'returned' whose value is the return status of the book
          borrowers.push(accountObject);                   // add this new account object to the 'borrowers' array
          borrowerAcc++;                                   // increment the accumulator
        }
      }      
    }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
