app.controller('sortController', function ($scope, bookService) {
    $scope.sortOptions = [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Newest', value: 'newest' }
    ];
    $scope.selectedSort = '';
    $scope.books = [];
    $scope.currentPage = 1;
    $scope.loading = true;

    $scope.fetchBooks = function () {
        $scope.loading = true;
        bookService.getBooksWithSorting(1, $scope.selected).then(function (data) {
            if (data && data.items && Array.isArray(data.items)) {
                $scope.books = data.items.map(function (item) {
                        return {
                            title: item.volumeInfo?.title || 'Title Not Available',
                            thumbnail: item.volumeInfo?.imageLinks?.thumbnail || '',
                            authors: item.volumeInfo.authors?.join(', ') || 'Author Not Available',
                            publishedDate: item.volumeInfo?.publishedDate || 'Date Not Available',
                        };
                    
                });
            } else {
                $scope.books = [];
                console.error('Invalid or empty book data received. Response:', data);
                
            }
            $scope.loading = false;
        }).catch(function (error) {
            console.error('Error fetching books:', error);
            $scope.books = [];
            $scope.loading = false;
        });
    };

    $scope.updateSorting = function () {
        $scope.currentPage = 1; // Reset to the first page
        $scope.fetchBooks($scope.currentPage, $scope.selectedSort);
    };

    $scope.nextPage = function () {
        if (!$scope.loading) {
            $scope.currentPage++;
            $scope.fetchBooks($scope.currentPage, $scope.selectedSort);
        }
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 1 && !$scope.loading) {
            $scope.currentPage--;
            $scope.fetchBooks($scope.currentPage, $scope.selectedSort);
        }
    };

    // Initial fetch of books
    $scope.fetchBooks($scope.currentPage, $scope.selectedSort);
});





































// // Define the AngularJS module
// const app = angular.module('BookApp', []);

// // Controller for sorting books
// app.controller('sortController', function ($scope, $http) {
//     const API_KEY = 'AIzaSyBN3tQZ2EA5thCZiBw6tmbl0qQxUbETCSM'; // Replace with your actual API key
//     const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=flowers';
    
//     $scope.books = [];
//     $scope.loading = false;
//     $scope.selectedSortOrder = 'relevance'; // Default sorting order

//     // Fetch books based on the selected sort order
//     $scope.fetchBooks = function () {
//         $scope.loading = true;

//         const url = `${BASE_URL}&orderBy=${$scope.selectedSortOrder}&key=${API_KEY}`;
        
//         $http.get(url).then(response => {
//             const items = response.data.items || [];
//             $scope.books = items.map(item => ({
//                 title: item.volumeInfo.title || 'No Title',
//                 authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Authors',
//                 thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg',
//                 publishedDate: item.volumeInfo.publishedDate || 'Unknown Date'
//             }));
//             $scope.loading = false;
//         }).catch(error => {
//             console.error('Error fetching books:', error);
//             $scope.loading = false;
//         });
//     };

//     // Fetch books on page load
//     $scope.fetchBooks();
// });
