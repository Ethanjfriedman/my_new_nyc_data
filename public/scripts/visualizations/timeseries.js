//////////////////////////////////////////
/////////MULTI LINE TEMPLATE//////////////
/////////////////////////////////////////
console.log('loading timeseries.js');

var makeTimeseries = function(data, chartParams, svgParams) {

console.log("let's make a timeseries chart");

data = selectTimeseriesAdapter(data, chartParams);

///////////////////////////////////////////////////
//checking window width in order to resize chart///
///////////////////////////////////////////////////
var smallSeries = function(){
  var iw = $(window).innerWidth();
    if(iw < 560){
      width = 350 - margin.left - margin.right;
      drawTimeSeries();
    } else if(iw < 760){
        width=450 - margin.left - margin.right;
        drawTimeSeries();
      } else{
          width=560 - margin.left - margin.right;
          drawTimeSeries();
        }
};

  //////////////////////////////////////
  ////////// SVG VARIABLES /////////////
  //////////////////////////////////////
  var hexColors;
  if(chartParams.colorScheme ==='monochrome'){
     hexColors = hexColorsMonochrome;
  }else if(chartParams.colorScheme =='summer'){
    hexColors = hexColorsSummer;
  }
  else{
     hexColors = hexColorsWinter;
  }
  var margin = svgParams.margin || {top: 20, right: 20, bottom: 30, left: 10},
      width = svgParams.width || 460 - margin.left - margin.right,
      height = svgParams.height || 300 - margin.top - margin.bottom;


  /////////////////////////////////////////////
  ////////// setting d3 variables /////////////
  /////////////////////////////////////////////

  //color
  ////////////////////////////////////////////

  var color = d3.scale.category20();

  //scaling
 ////////////////////////////////////////////
  ////////////////////////////////////////////
   ////////////////////////////////////////////
    ////////////////////////////////////////////
     ////////////////////////////////////////////
function drawTimeSeries(){

   ////////////////////////////////////////////////////////////////////////////
  //// clearing out existing SVG elements as well as keys and buttons ////////
  ////////////////////////////////////////////////////////////////////////////

  $('svg').remove();
  $('#buttons button').remove();
  $('#keys *').remove();

   /////////////////////////////////////////
  //// drawing all the svg elements ////////
  //////////////////////////////////////////


  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

 //line
////////////////////////////////////////////

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });


 //appending the whole svg
 ////////////////////////////////////////////

  var svg = d3.select("#pie").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 150)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  ////////////////////////////////////////////
  ////////// adding title to DOM /////////////
  ////////////////////////////////////////////
  var $title = $('#title');
  $title.text(data.title);

  ////////////////////////////////////////////////////////////////////
  // grabbing the data and finding all the max values for each year //
  ////////////////////////////////////////////////////////////////////

  var allSeries = data.allSeries;
  var dates = data.dates;
  var minVal = data.minVal;
  var maxVal = data.maxVal;

 ///////////////////////////////////////////////////////////////
 /////////// Setting up domains for the x & y axis /////////////
 ///////////////////////////////////////////////////////////////

  x.domain(d3.extent(allSeries[0], function(d) { return d.date; }));
  y.domain(d3.extent([minVal, maxVal]));

  //making the x-axis
  ////////////////////////////////////////////

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("x", -15)
      .attr("transform", "rotate(-60)");

  // text label for the x axis
  ////////////////////////////////////////////

  svg.append("text")
        .attr("transform", "translate(" + ((width) / 2) + " ," + (height + margin.bottom +50) + ")")
        .style("text-anchor", "middle")
        .text("Year");

  //making the y-axis
  ////////////////////////////////////////////
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  //label for the y-axis
  ////////////////////////////////////////////

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of incidents");

  //graphing the data
  ////////////////////////////////////////////

  for (var i = 0; i < allSeries.length; i++) {

    svg.append("path")
      .datum(allSeries[i])
      .attr('opacity',0)
      .attr('id', 'allSeries[i][0].series')
      .on('mouseover', function(d) {
        d3.select(this).attr('stroke-dasharray',"5,5").attr('stroke-width', '5px');
        var myText = $(this).attr('class').split(' ');
        myBoolean = true;
        mouseX = event.pageX;
        mouseY = event.pageY;
        myText.shift();
        myText = myText.join('');
        $(document).mousemove( function(e) {
           mouseX = e.pageX;
           mouseY = e.pageY;
           if(myBoolean === true){
            $('.blurb').css('visibility', 'visible').css('top', mouseY).css('left', mouseX).fadeIn('slow').text(myText);
           }
        });

      })
      .on('mouseout', function(d){
        myBoolean = false;
        var that = this;
        setTimeout(function(){
          d3.select(that).attr('stroke-dasharray',"none").attr('stroke-width', '2px');
          $('.blurb').fadeOut('slow');
        },1000);
      })
      .transition().delay(function (d,i){ return i * 1000;}).duration(1000)
      .attr("class", "line " + allSeries[i][0].series)
      .attr('opacity',1)
      .attr("d", line)
      .attr('stroke', function(d){ return hexColors[i]; });

    //adding points
    ////////////////////////////////////////////

      svg.selectAll("dot")
      .data(allSeries[i])
      .enter().append("circle")
      .attr('opacity', 0)
      .attr('id',function(d) {return (d.value); })
      .on('mouseover', function() {
        myBoolean2 = true;
        $(this).attr('r',5);
        var valueText = ($(this).attr('id')).slice(0,6);
        mouseX = event.pageX;
        mouseY = event.pageY;
        $(document).mousemove( function(e) {
           mouseX = e.pageX;
           mouseY = e.pageY;
           if(myBoolean2 === true){
            $('.blurb').css('visibility', 'visible').css('left', mouseX).css('top', mouseY).fadeIn('slow').text(valueText);
           }
        });

      })
      .on('mouseout', function(d) {
        $(this).attr('r',3);
        myBoolean2 = false;
        var that = this;
        setTimeout(function(){
          $('.blurb').fadeOut('slow');
        },1000)
      })
      .transition().delay(function (d,i){ return i * 200;}).duration(100)
      .attr("r", 3)
      .attr('opacity',1)
      .attr("cx", function(d) { return x(d.date); })
      .attr("cy", function(d) { return y(d.value); })
      .attr('fill',function(d){ return hexColors[i]; })






  }
}
smallSeries();
 ///////////////////////////////////////////////////
 /////////// MEDIA QUERIES RESPONSIVE STUFF /////////////
 ///////////////////////////////////////////////////


  $(window).resize(function(){
     smallSeries();
    //  drawBars();
   });

}

///////////////////////////////////////////////
///////// SELECT THE RIGHT ADAPTER  ///////////
///////////////////////////////////////////////

var selectTimeseriesAdapter = function(data, params) {
  console.log("selecting the right adapter to draw the timeseries");
  switch (params.dataType) {
    case 'firearms':
      data = adapterForFirearmsToTimeseries(data, params);
      return data;
      break;
    case 'language':
      data = adapterForLanguageToTimeseries(data, params, 7, 7);
      return data;
      break;
    case 'Abuse of Authority':
      data = adapterForLanguageToTimeseries(data, params, 25, 25);
      return data;
      break;
    case 'Race of Victims':
      data = adapterForLanguageToTimeseries(data, params, 7 , 5);
      return data;
      break;
    case 'Gender of Officers':
      data = adapterForLanguageToTimeseries(data, params, 4, 2);
      return data;
      break;
    case 'Gender of Victims':
      data = adapterForLanguageToTimeseries(data, params, 4, 2);
      return data;
      break;
    case 'Reasons for Encounters':
      data = adapterForLanguageToTimeseries(data, params, 36, 34);
      return data;
      break;
    default:
      console.log('uh-oh something went wrong in the Timeseries selectAdapter function');
      break;
  }
}

///////////////////////////////////////////////
/////////// ADAPTER FOR LANGUAGE  /////////////
//////// ALSO FOR ABUSE OF AUTHORITY AND //////
///////// ALL DATASETS EXCEPT FIREARMS ////////
///////////////////////////////////////////////

var adapterForLanguageToTimeseries = function(data, params, limit, skip) {
  console.log("running adapterForLanguageToTimeseries");
  var result = {};
  var dates = [];
  var values = [];
  var allSeries = [];
  var parseDate = d3.time.format("%Y").parse;
  result.title = params.title;

  for (var i = 0; i < limit; i++) {
    if (i !== skip) {
      var currentSeries = data.data[i];
      var dataSeries = [];
      var keys = Object.keys(currentSeries).sort();  //grabbing the keys for the current series
      var seriesName = currentSeries[keys[keys.length - 1]]; //series name is the final one after sorting in prior line
      for (var j = parseInt(params.startYear); j <= parseInt(params.endYear); j++) {
        var dataPoint = {};
        dataPoint.date = parseDate((2005 + j).toString());
        dataPoint.value = parseInt(currentSeries[keys[j]]);
        dataPoint.series = seriesName;
        dates.push(dataPoint.date);
        values.push(dataPoint.value);
        dataSeries.push(dataPoint);
        }
      allSeries.push(dataSeries);
      }
    }

  values.sort(function (a, b) {return b - a});
  var maxVal = values[0];
  var minVal = values[values.length - 1];

  result.minVal = minVal;
  result.maxVal = maxVal;
  result.dates = dates;
  result.allSeries = allSeries;
  console.log(result);
  return result;
}

///////////////////////////////////////////////
/////////// ADAPTER FOR FIREARMS  /////////////
///////////////////////////////////////////////

var adapterForFirearmsToTimeseries = function(data, params) {
  console.log("running adapterForFirearmsToTimeseries")
  var result = {}; //this object will be returned with the necessary data to graph the timeseries
  var dates = []; //used for labels for the x-axis
  var values = []; //used to calculate the min and max y-values to establish y-axis domain
  var allSeries = []; //each element will be a dataSeries: an array of objects, where each object is one datapoint
  var parseDate = d3.time.format("%Y").parse;
  var title = params.title;

  for (var i = 0; i < data.data.length; i++) {
    var currentSeries = data.data[i];
    var dataSeries = [];
    var keys = Object.keys(currentSeries).sort(); //grabbing the keys for the current series
    var seriesName = currentSeries[keys[keys.length - 1]]; //series name is the final one after sorting in prior line

    for (var j = params.startYear; j <= params.endYear; j++) {
      var dataPoint = {};
      var key = keys[j].split(''); //key for the current point, e.g. "_2005", split into an array
      key.shift(); //removing the leading underscore
      var keyString = parseDate(key.join('')); //rejoining as a string and parsing as a date, e.g. '2012'
      dates.push(keyString);
      dataPoint.date = keyString;
      var val = parseInt(currentSeries[keys[j]]);
      dataPoint.value = val;
      dataPoint.series = seriesName;
      values.push(val);
      dataSeries.push(dataPoint);
      }
    allSeries.push(dataSeries);
    }

  values.sort(function (a, b) {return b - a});
  var maxVal = values[0];
  var minVal = values[values.length - 1];

  result.minVal = minVal;
  result.maxVal = maxVal;
  result.dates = dates;
  result.allSeries = allSeries;
  result.title = title;
  console.log('===========')
  console.log(result)
  return result;

};
