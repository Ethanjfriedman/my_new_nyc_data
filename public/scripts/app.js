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

  this.whichDataset = function() {
    console.log("running visualizationController.whichDataset()");
    switch(controller.formData.dataURL) {
      case 'https://data.cityofnewyork.us/resource/99ez-fwvc.json':
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = true;
        controller.formData.chartParams.dataType = 'Abuse of Authority';
        controller.formData.chartParams.title = "Allegations of Police Abuse of Authority, "
                                                + (2005 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
        break;
      case 'https://data.cityofnewyork.us/resource/7r8u-zrb7.json':
        controller.formData.chartParams.yearType = '2012';
        controller.formData.chartParams.totalPresent = false;
        controller.formData.chartParams.dataType = 'firearms';
        controller.formData.chartParams.title = "Reasons for Firearms Discharges by Police, "
                                                + (2002 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2002 + parseInt(controller.formData.chartParams.endYear));
        break;
      case 'https://data.cityofnewyork.us/resource/us5j-esyf.json':
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = true;
        controller.formData.chartParams.dataType = 'language';
        controller.formData.chartParams.title = "Use of Offensive Language by Police, "
                                                + (2005 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
        break;
      case 'https://data.cityofnewyork.us/resource/x8rc-3utf.json':
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = 'weird'; //TODO change 'weird' to 'subtotalTypeA'
        controller.formData.chartParams.dataType = 'Race of Victims';
        controller.formData.chartParams.title = "Race of Victims With Substantiated Allegations Against Police, "
                                                + (2005 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
        break;
      case 'https://data.cityofnewyork.us/resource/664m-n5th.json':
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = 'weird2';
        controller.formData.chartParams.dataType = 'Gender of Officers';
        controller.formData.chartParams.title = "Gender of Officers With Substantiated Allegations Against Them, "
                                                + (2005 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
        break;
      case 'https://data.cityofnewyork.us/resource/ffgt-jimk.json':
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = 'weird2';
        controller.formData.chartParams.dataType = 'Gender of Victims';
        controller.formData.chartParams.title = "Gender of Victims With Substantiated Allegations Against Police, "
                                                + (2005 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
        break;
      case 'https://data.cityofnewyork.us/resource/4vsa-fhnm.json':
        controller.formData.chartParams.yearType = '2009';
        controller.formData.chartParams.totalPresent = 'weird';
        controller.formData.chartParams.dataType = 'Reasons for Encounters';
        controller.formData.chartParams.title = "Reasons for Police-Civilian Encounters That Led to Complaints, "
                                                + (2005 + parseInt(controller.formData.chartParams.startYear))
                                                + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
        // controller.formData.svgParams.height = 700;
        break;
      default:
        console.log("error in visualizationController.whichDataset()");
        break;
    }
  }

  this.getPieChartData = function () {
    console.log("visualizationController.getPieChartData()");
    this.whichDataset();

    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        controller.dataset = dataset;
        controller.makePieChart( dataset, controller.formData.chartParams, {} );
      });
  };

  //THIS IS THE VERSION THAT GOES TO OUR SERVER NOT TO THE API
//   this.getPieChartData = function () {
//   if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
//     controller.formData.chartParams.yearType = '2012';
//     controller.formData.chartParams.totalPresent = false;
//     controller.formData.chartParams.dataType = 'firearms';
//   } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
//       controller.formData.chartParams.yearType = '2009';
//       controller.formData.chartParams.totalPresent = true;
//       controller.formData.chartParams.dataType = 'language';
//     } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/99ez-fwvc.json'){
//         controller.formData.chartParams.yearType = '2009';
//         controller.formData.chartParams.totalPresent = true;
//         controller.formData.chartParams.dataType = 'Abuse of Authority';
//       } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/x8rc-3utf.json'){
//           controller.formData.chartParams.yearType = '2009';
//           controller.formData.chartParams.totalPresent = 'weird';
//           controller.formData.chartParams.dataType = 'Race of Victims';
//         } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/ffgt-jimk.json'){
//             controller.formData.chartParams.yearType = '2009';
//             controller.formData.chartParams.totalPresent = 'weird2';
//             controller.formData.chartParams.dataType = 'Gender of Victims';
//           } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/664m-n5th.json'){
//               controller.formData.chartParams.yearType = '2009';
//               controller.formData.chartParams.totalPresent = 'weird2';
//               controller.formData.chartParams.dataType = 'Gender of Officers';
//             }

//     $http.get(controller.formData.dataURL)
//       .then(function (dataset) {
//         controller.dataset = dataset;
//         controller.makePieChart( dataset, controller.formData.chartParams, {} );
//       }).then(function() {
//               $http.post('/visualizations', {dataset: controller.dataset, charParms: controller.formData.chartParams, svgParams: {}});
//       });
//   };
  //
  // //THIS IS THE VERSION THAT GOES TO OUR SERVER NOT TO THE API
  // this.getPieChartData = function() {
  //   if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
  //     controller.formData.chartParams.yearType = '2012';
  //     controller.formData.chartParams.totalPresent = false;
  //     controller.formData.chartParams.dataType = 'firearms';
  //     controller.formData.databaseName = "Firearms Discharge Report";
  //     controller.formData.description = "Report detailing NYPD occurrence of firearm discharge";
  //   } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
  //       controller.formData.chartParams.yearType = '2009';
  //       controller.formData.chartParams.totalPresent = true;
  //       controller.formData.chartParams.dataType = 'language';
  //     } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/99ez-fwvc.json'){
  //         controller.formData.chartParams.yearType = '2009';
  //         controller.formData.chartParams.totalPresent = true;
  //         controller.formData.chartParams.dataType = 'Abuse of Authority';
  //       } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/x8rc-3utf.json'){
  //           controller.formData.chartParams.yearType = '2009';
  //           controller.formData.chartParams.totalPresent = 'weird';
  //           controller.formData.chartParams.dataType = 'Race of Victims';
  //         } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/ffgt-jimk.json'){
  //             controller.formData.chartParams.yearType = '2009';
  //             controller.formData.chartParams.totalPresent = 'weird2';
  //             controller.formData.chartParams.dataType = 'Gender of Victims';
  //           } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/664m-n5th.json'){
  //               controller.formData.chartParams.yearType = '2009';
  //               controller.formData.chartParams.totalPresent = 'weird2';
  //               controller.formData.chartParams.dataType = 'Gender of Officers';
  //             }
  //   console.log(controller.formData);
  //   $http.post('/visualizations', controller.formData)
  //     .then(function(foo) {
  //       console.log("I got the data back! Now I need to draw it:");
  //       console.log(foo)
  //       controller.dataset = dataset.data.dataset;
  //       debugger;
  //       var svgParams = controller.formData.svgParams || {};
  //       controller.makePieChart(foo, controller.formData.chartParams, {svgParams: svgParams} );
  //       // controller.makePieChart(firearms, controller.formData.chartParams, svgParams);
  //     }
  //   );
  // }


  //get data for and draw a timeseries chart

  this.getTimeseriesData = function () {
    console.log("visualizationController.getTimeseriesData()");
    this.whichDataset();

    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        console.log("got the timeseries data. now to run makeTimeseries()");
        makeTimeseries(dataset, controller.formData.chartParams, {});
      });
  };



  this.getBarGraphData = function() {
    console.log("visualizationController.getBarGraphDatas()");
    this.whichDataset();

    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        console.log("got the bar graph data. now to run makeBarGraph()");
        var svgParams = controller.formData.svgParams || {};
          makeBarGraph(dataset,controller.formData.chartParams, svgParams);
        // }
      });
  };


}]);
