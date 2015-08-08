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


  this.formData={};

  // this.getPieChartData = function () {
  // if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
  //   controller.formData.chartParams.yearType = '2012';
  //   controller.formData.chartParams.totalPresent = false;
  //   controller.formData.chartParams.dataType = 'firearms';
  // } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
  //     controller.formData.chartParams.yearType = '2009';
  //     controller.formData.chartParams.totalPresent = true;
  //     controller.formData.chartParams.dataType = 'language';
  //   } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/99ez-fwvc.json'){
  //       controller.formData.chartParams.yearType = '2009';
  //       controller.formData.chartParams.totalPresent = true;
  //       controller.formData.chartParams.dataType = 'Abuse of Authority';
  //     } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/x8rc-3utf.json'){
  //         controller.formData.chartParams.yearType = '2009';
  //         controller.formData.chartParams.totalPresent = 'weird';
  //         controller.formData.chartParams.dataType = 'Race of Victims';
  //       } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/ffgt-jimk.json'){
  //           controller.formData.chartParams.yearType = '2009';
  //           controller.formData.chartParams.totalPresent = 'weird2';
  //           controller.formData.chartParams.dataType = 'Gender of Victims';
  //         } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/664m-n5th.json'){
  //             controller.formData.chartParams.yearType = '2009';
  //             controller.formData.chartParams.totalPresent = 'weird2';
  //             controller.formData.chartParams.dataType = 'Gender of Officers';
  //           }
  //
   //   $http.get(controller.formData.dataURL)
  //     .then(function (dataset) {
  //       controller.dataset = dataset;
  //       controller.makePieChart( dataset, controller.formData.chartParams, {} );
  //     }).then(function() {
  //             $http.post('/visualizations', {dataset: controller.dataset, charParms: controller.formData.chartParams, svgParams: {}});
  //     });
  // };

  //THIS IS THE VERSION THAT GOES TO OUR SERVER NOT TO THE API
  this.getPieChartData = function() {
    if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
      controller.formData.chartParams.yearType = '2012';
      controller.formData.chartParams.totalPresent = false;
      controller.formData.chartParams.dataType = 'firearms';
      controller.formData.databaseName = "Firearms Discharge Report";
      controller.formData.description = "Report detailing NYPD occurrence of firearm discharge";
    } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = true;
        controller.formData.chartParams.dataType = 'language';
      } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/99ez-fwvc.json'){
          controller.formData.chartParams.yearType = '2009';
          controller.formData.chartParams.totalPresent = true;
          controller.formData.chartParams.dataType = 'Abuse of Authority';
        } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/x8rc-3utf.json'){
            controller.formData.chartParams.yearType = '2009';
            controller.formData.chartParams.totalPresent = 'weird';
            controller.formData.chartParams.dataType = 'Race of Victims';
          } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/ffgt-jimk.json'){
              controller.formData.chartParams.yearType = '2009';
              controller.formData.chartParams.totalPresent = 'weird2';
              controller.formData.chartParams.dataType = 'Gender of Victims';
            } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/664m-n5th.json'){
                controller.formData.chartParams.yearType = '2009';
                controller.formData.chartParams.totalPresent = 'weird2';
                controller.formData.chartParams.dataType = 'Gender of Officers';
              }
    console.log(controller.formData);
    $http.post('/visualizations', controller.formData)
      .then(function(dataset) {
        console.log("I got the data back! Now I need to draw it");
        controller.dataset = dataset;
        console.log(dataset);
        var svgParams = controller.formData.svgParams || null;
        controller.makePieChart(dataset, controller.formData.chartParams, {svgParams: svgParams} );
      }
    );
  }






  //get data for and draw a timeseries chart

  this.getTimeseriesData = function () {
    if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
      controller.formData.chartParams.yearType = '2012';
      controller.formData.chartParams.totalPresent = false;
      controller.formData.chartParams.dataType = 'firearms';
    }

    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        makeTimeseries(dataset, controller.formData.chartParams, {});
      });
  };

  this.getBarGraphData = function(dataURL) {
    $http.get(dataURL)
      .then(function (dataset) {
        makeBarGraph(adapterForDistributionOfAbuseAllegationsToBarChart(dataset),{},{});
      });
  }
}]);
