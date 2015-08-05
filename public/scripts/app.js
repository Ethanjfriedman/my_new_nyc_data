/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);

app.controller('userController', ['$scope', function($scope) {
  var controller = this;
  this.myName = 'Aarati';
}])
