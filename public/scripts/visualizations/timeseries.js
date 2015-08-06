//////////////////////////////////////////
/////////MULTI LINE TEMPLATE//////////////
/////////////////////////////////////////
console.log('loading timeseries.js');
var makeTimeseries = function(data, chartParams, svgParams) {

  //////////////////////////////////////
  ////////// SVG VARIABLES /////////////
  //////////////////////////////////////

  //clearing out existing SVG elements as well as keys and buttons
  $('svg').remove();
  $('#buttons button').remove();
  $('#keys *').remove();

  var margin = svgParams.margin || {top: 20, right: 20, bottom: 30, left: 50},
      width = svgParams.width || 960 - margin.left - margin.right,
      height = svgParams.height || 500 - margin.top - margin.bottom;

  // var parseDate = d3.time.format("%Y").parse;

  var color = d3.scale.category20();

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

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.value); });


  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 150)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var $title = $('#title');
  $title.text(data.title);

  var allSeries = data.allSeries;
  var dates = data.dates;
  var minVal = data.minVal;
  var maxVal = data.maxVal;

  //setting up domains for the x- and y-axes
  x.domain(d3.extent(allSeries[0], function(d) { return d.date; }));
  y.domain(d3.extent([minVal, maxVal]));

  //making the x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("x", -15)
      .attr("transform", "rotate(-60)");

  // text label for the x axis
  svg.append("text")
        .attr("transform", "translate(" + ((width + margin.right + margin.left) / 2) + " ," + (height + margin.bottom +30) + ")")
        .style("text-anchor", "middle")
        .text("Year");
    //
    // svg.append("text")
    //     .attr("transform", "translate(" + (50) + " ," + (height + margin.bottom +30) + ")")
    //     .style("text-anchor", "middle")
    //     .text("Year");

  //making the y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  //label for the y-axis
  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of incidents");

    //graphing the data
    for (var i = 0; i < allSeries.length; i++) {

      svg.append("path")
        .datum(allSeries[i])
        .attr('opacity',0)
        .attr('id', 'allSeries[i][0].series')
        .on('mouseover', function(d) {
        d3.select(this).attr('stroke-dasharray',"5,5")
          var myText = $(this).attr('class').split(' ');
          myText.shift();
          myText = myText.join('');
          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          $('.blurb').css('visibility', 'visible').css('margin-left', x-50).css('margin-top', y-150).fadeIn('slow').text(myText);
        })
        .on('mouseout', function(d){
          that = this;
          setTimeout(function(){
            d3.select(that).attr('stroke-dasharray',"none")
            $('.blurb').fadeOut('slow');
          },1000);
        })
        .transition().delay(function (d,i){ return i * 1000;}).duration(1000)
        .attr("class", "line " + allSeries[i][0].series)
        .attr('opacity',1)
        .attr("d", line)
        .attr('stroke', function(d){ return color(i); });

      //adding points
        svg.selectAll("dot")
        .data(allSeries[i])
        .enter().append("circle")
        .attr('opacity', 0)
        .attr('id',function(d) {return (d.value); })
        .on('mouseover', function() {
          var valueText = ($(this).attr('id')).slice(0,6);
          $('.blurb').css('visibility', 'visible').css('margin-left', x-50).css('margin-top', y-150).fadeIn('slow').text(valueText);
        })
        .on('mouseout', function(d) {
          that = this;
          setTimeout(function(){
            $('.blurb').fadeOut('slow');
          },1000)
        })
        .transition().delay(function (d,i){ return i * 200;}).duration(100)
        .attr("r", 3)
        .attr('opacity',1)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value); })
        .attr('fill',function(d){ return color(i); });
    }
}

var adapterForFirearmsToTimeseries = function(data) {
  var result = {}; //this object will be returned with the necessary data to graph the timeseries
  var dates = []; //used for labels for the x-axis
  var values = []; //used to calculate the min and max y-values to establish y-axis domain
  var allSeries = []; //each element will be a dataSeries: an array of objects, where each object is one datapoint
  var parseDate = d3.time.format("%Y").parse;
  var title = "Reasons for Firearms Discharges by Police";

  for (var i = 0; i < data.data.length; i++) {
    var currentSeries = data.data[i];
    var dataSeries = [];
    var keys = Object.keys(currentSeries).sort(); //grabbing the keys for the current series
    var seriesName = currentSeries[keys[keys.length - 1]]; //series name is the final one after sorting in prior line
    for (var j = 0; j < keys.length - 1; j++) {
      var dataPoint = {};
      var key = keys[j].split(''); //key for the current point, e.g. "_2005", split into an array
      key.shift(); //removing the leading underscore
      var keyString = parseDate(key.join('')); //rejoining as a string and parsing as a date.
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
  return result;
}
