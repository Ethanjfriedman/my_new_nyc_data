/* MASTER SCRIPT FILE FOR My NYC Data
===================================*/

console.log('app.js is loading');

var app = angular.module("myNYCData", []);
app.controller('userController', ['$http', function($http) {
  var controller = this;

}]);

app.controller('visualizationController', ['$http', function($http) {
  var controller = this;
  this.makePieChart = makePieChart;

  this.formData={
    dataURL:'',
    chartParams: {
      dataType:'',
      yearType:'',
      startYear:'',
      endYear:''
    }
  };



  this.getPieChartData = function () {

    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        controller.makePieChart( dataset, controller.formData.chartParams, {} );
      });
  };

  // $http.post('/visualizations', $http.get(dataURL));


  //get data for and draw a timeseries chart
  this.getTimeseriesData = function (dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeTimeseries(adapterForFirearmsToTimeseries(dataset), {}, {});
      });

  }

  this.getBarGraphData = function(dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeBarGraph(adapterForDistributionOfAbuseAllegationsToBarChart(dataset),{},{});
      });
  }
}]);
