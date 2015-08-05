/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);

app.controller('userController', ['$http', function($http) {
  var controller = this;

  this.myName = 'Aarati';
  // this.getPieChart = function() {
  //   console.log("Off to fetch the piechart.js file");
  //   $http.get('./oldjsontests/distribution.json').success(function(data) {
  //     console.log("here's the data " + data);
  //     return data;
  //   })
  // }

  this.getData = function() {
    console.log('running getData');
    $http.get('./oldjsontests/distribution.json').then(function(response) {
      console.log("successful req for json");
      console.log(response);
      $http.get('./scripts/piechart.js', { dataset: response}).then(function(response2) {
        console.log('successful req for piechart.js');
        console.log(response2);
      }, function(response3) {console.log("piechart error" + response3);});
    }, function(response4) { console.log("json error" + response4);});
  }
  // this.getPieChart = function() {
  //   $http.get('./scripts/piechart.js', {dataset:}).
  // then(function(response) {// when the response is available  }, function(response) {
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });
  // }
}]);
