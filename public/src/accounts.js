function findAccountById(accounts, id) {
  let result = accounts.find((account) => account.id === id) 
  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;                 // store account id in variable for easy access
  let borrows = 0;                              // declare accumulator
  for (let book in books) {                     // loop through each book object in books array
    let bookBorrows = books[book].borrows;      // bookBorrows is the 'borrows' array in each book object 
    for (let borrow in bookBorrows) {           // loop through each borrow object in 'borrows' array in book object in 'books' array
      let borrower = bookBorrows[borrow].id;    // borrower is the id contained in the borrow object
      if (borrower === accountId) {
        borrows++;
      }
    }
  }
  return borrows;
}



function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;                           // storing account id
  let booksPossessed = [];                                // creating empty 'booksPossessed' array
  for (let book in books) {                               // looping through each book object in the 'books' array
    let bookObject = books[book];                         // declaring a variable for the current book object
    let bookBorrows = books[book].borrows;                // declaring a variable for the 'borrows' array in the current book object
    for (let borrow in bookBorrows) {                     // looping through the 'borrows' array
      let borrower = bookBorrows[borrow].id;              // declaring the variable 'borrower' to store the account id of each borrow logged in the 'borrows' array
      let status = bookBorrows[borrow].returned           // storing the boolean value of 'returned' in the borrow of the 'borrows' array
      if (borrower === accountId && !status) {            // if the 'borrower' value and the 'accountId' match, this book was borrowed by the account passed into the function. if the status is falsy, the book has not been return and is currently in their possession.
        booksPossessed.push(bookObject);                  // if the book is currently in the possession of the account passed into the array, push the book object to the 'booksPossessed' array
      }
    }
  }
  for (let book in booksPossessed) {                      // looping through the 'booksPossessed' array which contains all books the account has not yet returned
    const bookObject = booksPossessed[book];              // storing the current book object as a constant variable
    const theAuthor = bookObject.authorId;                // storing the value of 'authorId' of the current book object to compare it against the list of authors
    for (let anAuthor in authors) {                       // looping through the array of author objects
      const authorObject = authors[anAuthor];             // storing the current author object as a constant variable
      if (authorObject.id === theAuthor) {                // checking if the 'authorId' value of the current book matches the id of the current author object...
        bookObject.author = authorObject;                 // ... if it does, add the author object to the current book object as a vaalue with the key 'author'
      }
    }
  }
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
