var app = angular.module('BookApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'mainController'
        })
        
        .when('/books', {
            templateUrl: 'app/views/viewBooks.html',
            controller: 'viewBooksController'
        })
        .when('/book/:bookTitle', {
            templateUrl: '/app/views/bookDetails.html',
            controller: 'bookDetailsController'
        })
        .when('/books/:bookName', {
            templateUrl: 'app/views/bookDetails.html',
            controller: 'bookDetailsController'
        })

        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });

});