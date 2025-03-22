app.controller('viewBooksController', function ($scope, $location, bookService) {
    $scope.books = [];
    $scope.currentPage = 1;
    $scope.loading = true;

    $scope.fetchBooks = function (page) {
        $scope.loading = true;
        console.log(`Fetching books for page: ${page}`); // Debugging log

        bookService.getBooks(page).then(function (data) {
            console.log('Raw API Response:', data); // Log the raw response

            if (data && data.items && Array.isArray(data.items)) {
                $scope.books = data.items.map(function (item) {
                    if (item.volumeInfo) {
                        return {
                            title: item.volumeInfo.title || 'Title Not Available',
                            thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
                            authors: item.volumeInfo.authors?.join(', ') || 'Author Not Available'
                        };
                    } else {
                        console.warn('Missing volumeInfo for item:', item);
                        return {
                            title: 'Title Not Available',
                            thumbnail: '',
                            authors: 'Author Not Available'
                        };
                    }
                }); // Map data to match view structure
                console.log('Mapped Books:', $scope.books); // Debugging log
            } else {
                console.error('Invalid or empty book data received. Response:', data);
            }
            $scope.loading = false;
        }).catch(function (error) {
            console.error('Error fetching books:', error);
            $scope.loading = false;
        });
    };

    $scope.goToDetails = function (bookTitle) {
        if (bookTitle) {
            var formattedTitle = bookTitle.replace(/\s+/g, '-').toLowerCase(); // Format title for URL
            console.log(`Navigating to details for: ${formattedTitle}`); // Debugging log
            $location.path('/book/' + formattedTitle); // Redirect to book details
        } else {
            console.error('Book title is missing');
        }
    };

    $scope.nextPage = function () {
        if (!$scope.loading) {
            $scope.currentPage++;
            $scope.fetchBooks($scope.currentPage);
        }
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1 && !$scope.loading) {
            $scope.currentPage--;
            $scope.fetchBooks($scope.currentPage);
        }
    };

    // Initial fetch of books
    $scope.fetchBooks($scope.currentPage);
});
