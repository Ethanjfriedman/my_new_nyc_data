//////////////////////////////////////////
/////////MULTI LINE TEMPLATE//////////////
/////////////////////////////////////////

var makeTimeseries = function(data, chartParams, svgParams) {

  //////////////////////////////////////
  ////////// SVG VARIABLES /////////////
  //////////////////////////////////////
  var margin = svgParams.margin || {top: 20, right: 20, bottom: 30, left: 50},
      width = svgParams.width || 960 - margin.left - margin.right,
      height = svgParams.height || 500 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y").parse;
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

      ////////////////////////////////////////////////////////////
      ////////// Don't need this, only for filepaths//////////////
      // d3.json(dataset, function(error, data) {/////////////////
      // if (error) throw error;//////////////////////////////////
      ////////////////////////////////////////////////////////////

    var $title = $('#title');
    $title.text('Firearms Discharge incidents');

    //extracting the dates from the data.
    //eventually we'll probably want some chartParams property
    //that controls this.
    var dates = [];
    var values = [];
    var allSeries = [];
    for (var i = 0; i < data.data.length; i++) {
      var currentSeries = data.data[i];
      var dataSeries = [];
      var keys = Object.keys(currentSeries).sort();
      var seriesName = currentSeries[keys[keys.length - 1]];
      for (var j = 0; j < keys.length - 1; j++) {
        var dataPoint = {};
        var key = keys[j].split('');
        var val = parseInt(currentSeries[keys[j]]);
        key.shift();
        var keyString = parseDate(key.join(''));
        dates.push(keyString);
        dataPoint.date = keyString;
        dataPoint.value = val;
        dataPoint.series = seriesName;
        values.push(val);
        dataSeries.push(dataPoint);
        }
      allSeries.push(dataSeries);
      }

    values.sort(function (a, b) {return b- a});
    var maxVal = values[0];
    var minVal = values[values.length - 1];

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
          .transition().delay(function (d,i){ return i * 200;}).duration(100)
          .attr("r", 3)
          .attr('opacity',1)
          .attr("cx", function(d) { return x(d.date); })
          .attr("cy", function(d) { return y(d.value); })
          .attr('fill',function(d){ return color(i); });
      }
}

var adapterForFirearmsToTimeseries = function(data) {
  var result = {};
  var dates = [];
  var values = [];
  var allSeries = [];
  for (var i = 0; i < data.data.length; i++) {
    var currentSeries = data.data[i];
    var dataSeries = [];
    var keys = Object.keys(currentSeries).sort();
    var seriesName = currentSeries[keys[keys.length - 1]];
    for (var j = 0; j < keys.length - 1; j++) {
      var dataPoint = {};
      var key = keys[j].split('');
      var val = parseInt(currentSeries[keys[j]]);
      key.shift();
      var keyString = parseDate(key.join(''));
      dates.push(keyString);
      dataPoint.date = keyString;
      dataPoint.value = val;
      dataPoint.series = seriesName;
      values.push(val);
      dataSeries.push(dataPoint);
      }
    allSeries.push(dataSeries);
    }

  return result;
}
