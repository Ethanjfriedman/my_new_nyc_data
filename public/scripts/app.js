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
      default:
        console.log("error in visualizationController.whichDataset()");
        break;
    }
  }
  // this.whichDataset = function() {
  //   if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
  //     controller.formData.chartParams.yearType = '2012';
  //     controller.formData.chartParams.totalPresent = false;
  //     controller.formData.chartParams.dataType = 'firearms';
  //     controller.formData.chartParams.title = "Reasons for Firearms Discharges by Police, "
  //                                             + (2002 + parseInt(controller.formData.chartParams.startYear))
  //                                             + " - " + (2002 + parseInt(controller.formData.chartParams.endYear));
  //   } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
  //       controller.formData.chartParams.yearType = '2009';
  //       controller.formData.chartParams.totalPresent = true;
  //       controller.formData.chartParams.dataType = 'language';
  //       controller.formData.chartParams.title = "Use of Offensive Language by Police, "
  //                                               + (2005 + parseInt(controller.formData.chartParams.startYear))
  //                                               + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
  //     } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/99ez-fwvc.json'){
  //         controller.formData.chartParams.yearType = '2009';
  //         controller.formData.chartParams.totalPresent = true;
  //         controller.formData.chartParams.dataType = 'Abuse of Authority';
  //         controller.formData.chartParams.title = "Allegations of Police Abuse of Authority"
  //                                                 + (2005 + parseInt(controller.formData.chartParams.startYear))
  //                                                 + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
  //       } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/x8rc-3utf.json'){
  //           controller.formData.chartParams.yearType = '2009';
  //           controller.formData.chartParams.totalPresent = 'weird'; //TODO change 'weird' to 'subtotalTypeA'
  //           controller.formData.chartParams.dataType = 'Race of Victims';
  //           controller.formData.chartParams.title = "Race of Victims With Substantiated Allegations Against Police"
  //                                                   + (2005 + parseInt(controller.formData.chartParams.startYear))
  //                                                   + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
  //         } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/664m-n5th.json'){
  //             controller.formData.chartParams.yearType = '2009';
  //             controller.formData.chartParams.totalPresent = 'weird2';
  //             controller.formData.chartParams.dataType = 'Gender of Officers';
  //             controller.formData.chartParams.title = "Gender of Officers With Substantiated Allegations Against Them"
  //                                                     + (2005 + parseInt(controller.formData.chartParams.startYear))
  //                                                     + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
  //             } else if(controller.formData.dataUrl === 'https://data.cityofnewyork.us/resource/ffgt-jimk.json'){
  //                 controller.formData.chartParams.yearType = '2009';
  //                 controller.formData.chartParams.totalPresent = 'weird2';
  //                 controller.formData.chartParams.dataType = 'Gender of Victims';
  //                 controller.formData.chartParams.title = "Gender of Victims With Substantiated Allegations Against Police"
  //                                                         + (2005 + parseInt(controller.formData.chartParams.startYear))
  //                                                         + " - " + (2005 + parseInt(controller.formData.chartParams.endYear));
  //           }
  // };

  this.getPieChartData = function () {
    this.whichDataset();

    $http.get(controller.formData.dataURL)
      .then(function (dataset) {
        controller.dataset = dataset;
        controller.makePieChart( dataset, controller.formData.chartParams, {} );
      });
      // .then(function() {
      //         $http.post('/visualizations', {dataset: controller.dataset, charParms: controller.formData.chartParams, svgParams: {}});
      // });
  };

  //THIS IS THE VERSION THAT GOES TO OUR SERVER NOT TO THE API
//   this.getPieChartData = function() {
//     if(controller.formData.dataURL === "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
//       controller.formData.chartParams.yearType = '2012';
//       controller.formData.chartParams.totalPresent = false;
//       controller.formData.chartParams.dataType = 'firearms';
//       controller.formData.databaseName = "Firearms Discharge Report";
//       controller.formData.description = "Report detailing NYPD occurrence of firearm discharge";
//     } else if(controller.formData.dataURL === 'https://data.cityofnewyork.us/resource/us5j-esyf.json'){
// =======
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
// >>>>>>> 9b50095a8aac3a8528d719a5d79ffa4f81dfb1c7
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
    this.whichDataset();

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
  };
}]);



var firearms = {
  name: "Firearms Discharge Report",
  dataURL:"https://data.cityofnewyork.us/resource/7r8u-zrb7.json",
  description: "Reasons for NYPD firearms discharge",
  dataset: [
    { "discharge_detail" : "Adversarial Conflict", "_2012" : "45", "_2010" : "33", "_2011" : "36", "_2002" : "55", "_2006" : "59", "_2005" : "59", "_2004" : "51", "_2003" : "61", "_2009" : "47", "_2008" : "49", "_2007" : "45" },
    { "discharge_detail" : "Animal Attack", "_2012" : "24", "_2010" : "30", "_2011" : "36", "_2002" : "38", "_2006" : "30", "_2005" : "32", "_2004" : "26", "_2003" : "35", "_2009" : "28", "_2008" : "30", "_2007" : "39" },
    { "discharge_detail" : "Unintentional Discharge", "_2012" : "21", "_2010" : "21", "_2011" : "15", "_2002" : "24", "_2006" : "26", "_2005" : "25", "_2004" : "27", "_2003" : "25", "_2009" : "23", "_2008" : "15", "_2007" : "15" },
    { "discharge_detail" : "Mistaken Identity", "_2012" : "0", "_2010" : "0", "_2011" : "0", "_2002" : "0", "_2006" : "1", "_2005" : "0", "_2004" : "0", "_2003" : "0", "_2009" : "1", "_2008" : "0", "_2007" : "0" },
    { "discharge_detail" : "Unauthorized use of a Firearm", "_2012" : "6", "_2010" : "6", "_2011" : "2", "_2002" : "0", "_2006" : "8", "_2005" : "6", "_2004" : "5", "_2003" : "2", "_2009" : "4", "_2008" : "3", "_2007" : "6" },
    { "discharge_detail" : "MOS Suicide / Attempt", "_2012" : "9", "_2010" : "2", "_2011" : "3", "_2002" : "2", "_2006" : "3", "_2005" : "3", "_2004" : "5", "_2003" : "7", "_2009" : "3", "_2008" : "8", "_2007" : "6" }
  ]
};
