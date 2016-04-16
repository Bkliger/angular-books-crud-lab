angular.module('libraryApp')
       .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject = ['$http', '$routeParams', '$location'];

function BooksIndexController ($http, $routeParams, $location) {
  var vm = this;
  var endpoint = 'https://super-crud.herokuapp.com/books';
  vm.newBook = {};
  vm.newBook = {
    title: 'Test Book',
    author: 'Test Author',
    image: "",
    releaseDate: "January 30, 1873"
  };

  $http({
    method: 'GET',
    url: endpoint
  }).then(function successCallback(response) {
    vm.books = response.data.books;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createBook = function () {
    console.log(vm.newBook);
    $http({
      method: "POST",
      url: endpoint,
      data: vm.newBook
    }).then(function successCb(response) {
      vm.books.push(response.data);
    },
    function errorCb(response) {
      console.log('There was an error creating a book', response);
    });
  };
  vm.deleteBook = function (book) {
  $http({
    method: 'DELETE',
    url: endpoint + "/" + book._id
  }).then(function successCallback(response) {
    // $location.path("/");
    var index = vm.books.indexOf(book);
    vm.books.splice(index,1)

  }, function errorCallback(response) {
    console.log('There was an error deleting the data', response);
  });
};
}
