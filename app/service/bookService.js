app.service('bookService', function ($http) {
    const BASE_URL = 'https://www.googleapis.com/books/v1';  // Base URL for Google Books API
    const API_KEY = 'AIzaSyBLjQAZHyV88-LT5KSkXGfjDwU9co8bH8I';  // Your Google API Key
     
    this.searchBooks = function (query, page = 1, maxResults = 20, orderBy = 'relevance') {
        const searchUrl = `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&startIndex=${(page - 1) * maxResults}&maxResults=${maxResults}&orderBy=${orderBy}&key=${API_KEY}`;
        return $http.get(searchUrl)
            .then(response => {
                console.log(response.data);
                return response.data; 
            })
            .catch(error => {
                console.error(`Error searching for books with query "${query}" and order "${orderBy}":`, error);
                return null;
            });
    };
    
    // this.searchforBooks = function (query) {
    //     const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}+inauthor:${query}&key=${API_KEY}`;
    //     return $http.get(searchUrl)
    //         .then(response => {
    //             console.log("books", response.data);
    //             return response.data; // Ensure the data is returned
    //         })
    //         .catch(error => {
    //             console.error(`Error searching for books with query "${query}":`, error);
    //             return null;
    //         });
    // };
    
    // Fetch detailed information about a specific book by its ID
    this.getBookDetails = function (bookId) {
        const detailsUrl = `${BASE_URL}/volumes/${bookId}?key=${API_KEY}`;
        return $http.get(detailsUrl)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching book details for ID "${bookId}":`, error);
                return null;
            });
    };

    // Fetch books from the user's Google Books "My Library" bookshelves (
    
    this.getBooksFromLibrary = function () {
        const bookshelfUrl = `${BASE_URL}/mylibrary/bookshelves?key=${API_KEY}`;
        return $http.get(bookshelfUrl)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching bookshelves from My Library:', error);
                return null;
            });
    };

    this.getBooksWithSorting = function (page = 1, orderBy = 'relevance', maxResults = 12) {
        const query ='bestsellers'
        return this.searchBooks('bestsellers', page, maxResults, orderBy);
    };


    // Fetch popular books by searching for 'bestsellers' (public query, no authentication)
    this.getBooks = function (page = 1, maxResults = 10) {
        return this.searchBooks('bestsellers', page, maxResults);
    };
});
