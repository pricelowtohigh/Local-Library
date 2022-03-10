function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedCount = 0;
  for (let each in books) {                   // loop through each book
    const book = books[each];
    if (!book.borrows[0].returned) {          // check the boolean value of the most recent borrow (first item in array)
      borrowedCount++;
    }
  }
  return borrowedCount;
}

    function getUniqueItems(items) {                              // helper function
      let uniqueItems = [];
      for (let book in items) {
          if (!uniqueItems.includes(items[book].genre)) {
              uniqueItems.push(items[book].genre);
          }
      }
      return uniqueItems;
    }

    function nameAndCountify(items) {                             // helper function
      let nameified = [];
      for (let item in items) {
          let named = {};
          named['name'] = items[item];
          named['count'] = 0;
          nameified.push(named);
      }
      return nameified;
    }

    function countEm(items, itemList) {                             // helper function
      for (let item in items) {               
          for (let otherItem in itemList) {
              if (items[item].name === itemList[otherItem].genre) {
                  items[item].count++
              }
          }
      }
      return items;
    }

    function topFive(items) {                             // helper function
      let topFive = [];
      for (let i = 0; i < 5; i++) {
        topFive.push(items[i]);
      }
      return topFive;
    }

function getMostCommonGenres(books) {
  const unique = getUniqueItems(books);
  const named = nameAndCountify(unique);
  const counted = countEm(named, books);
  counted.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  const result = topFive(counted);
  return result;
}

    function extractTitleAndBorrows (book) {                             // helper function
      let extracted = {};
      extracted['name'] = book.title;
      extracted['count'] = book.borrows.length;
      return extracted;
    }

function getMostPopularBooks(books) {
  const bookList = books.map((book) => {
    const extracted = extractTitleAndBorrows(book);
    return extracted;
    });
  bookList.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  const result = topFive(bookList);
  return result;
}

    function getAuthorNameFromId (id, authors) {                             // helper function
      let name = "";
      for (let author in authors) {
          if (authors[author].id === id) {
              name = `${authors[author].name.first} ${authors[author].name.last}`
          }
      }
      return name;
    }

    function getBorrows(book) {                             // helper function
      const borrows = book.borrows.length;
      return borrows;
    }

    function getIdsAndCount(authors) {                             // helper function
      let authorList = []
      for (let author in authors) {
          let authorObject = {};
          const authorId = authors[author].id;
          authorObject['name'] = authorId;
          authorObject['count'] = 0;
          authorList.push(authorObject);
      }
      return authorList
    }

function getMostPopularAuthors(books, authors) {
  let authorList = getIdsAndCount(authors);
  for (let author in authorList) {                            
    for (let book in books) {                                 
      if (books[book].authorId === authorList[author].name) {       
        const borrows = getBorrows(books[book]);              
        authorList[author].count += borrows;                  
      }
    }
  }
  authorList.reduce((result, author) => {
    author['name'] = getAuthorNameFromId(author.name, authors);
    return result;
  });
  authorList.sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1));
  const result = topFive(authorList);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
