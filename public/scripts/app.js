/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);

app.controller('userController', ['$http', function($http) {
  var controller = this;

  // this.getPieChart = function() {
  //   console.log("Off to fetch the piechart.js file");
  //   $http.get('./oldjsontests/distribution.json').success(function(data) {
  //     console.log("here's the data " + data);
  //     return data;
  //   })
  // }

  this.getData = function () {
    console.log('running getData');
    $http.get('https://data.cityofnewyork.us/resource/7r8u-zrb7.json')
      .then(function (dataset) {
        console.log(dataset);
        makePieChart( dataset, {
           yearType:'2012',
           dataType: 'firearms'
        }, {} );

          // eval(response2.data.makePieChart(dataset));
        })
  };
}]);
