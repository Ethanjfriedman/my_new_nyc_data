/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);

app.controller('userController', ['$http', function($http) {
  var controller = this;
  this.myName = 'Aarati';
  this.getPieChart = function() {
    console.log("Off to fetch the piechart.js file");
  }
}]);
