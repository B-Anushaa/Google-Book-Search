app.controller('bookDetailsController', function ($scope, $routeParams, bookService) {
    const bookTitle = $routeParams.bookTitle.replace(/-/g, ' '); // Decode the title
    $scope.loading = true;

    bookService.searchBooks(bookTitle).then(function (data) {
        if (data && data.items && data.items.length > 0) {
            const book = data.items.find(item => item.volumeInfo.title.toLowerCase() === bookTitle.toLowerCase());
            if (book) {
                $scope.book = {
                    title: book.volumeInfo.title,
                    description: book.volumeInfo.description || 'No description available',
                    thumbnail: book.volumeInfo.imageLinks?.thumbnail || '',
                    authors: book.volumeInfo.authors?.join(', ') || 'No authors available'
                };
            } else {
                console.error('Book not found');
            }
        } else {
            console.error('No books found for the given title');
        }
        $scope.loading = false;
    }).catch(function (error) {
        console.error('Error fetching book details:', error);
        $scope.loading = false;
    });
});
