//////////////////////////////////////////
/////////MULTI LINE TEMPLATE//////////////
/////////////////////////////////////////

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

d3.json("../oldjsontests/firearms.json", function(error, data) {
  //title of dataset
  if (error) throw error;
  var $title = $('#title');

  $title.text(data.meta.view.name);
  var dates = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012"];
  var allSeries = [];
  var minVal = data.data[0][9];
  var maxVal = data.data[0][9];
  for (var q = 0; q < data.data.length; q++) {
    var dataSeries = [];
    for (var i = 9; i <= 19; i++) {
      var dataPoint={};
      dataPoint.date = parseDate(dates[i - 9]);

      dataPoint.value = data.data[q][i];
      dataPoint.value = +dataPoint.value;
      if (dataPoint.value < minVal) {
        minVal = dataPoint.value;
      }
      if (dataPoint.value > maxVal) {
        maxVal = dataPoint.value
      }

      // if you are reading this please close your eyes when you see the next line of code. thank you.
      dataPoint.series = data.data[q][8].split('\t').join('').split(' ').join('');

      dataSeries.push(dataPoint);
    }
    allSeries.push(dataSeries);
  }
  
  x.domain(d3.extent(allSeries[0], function(d) { return d.date; }));
  y.domain(d3.extent([minVal, maxVal]));


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("x", -15)
      .attr("transform", "rotate(-60)");

  svg.append("text")      // text label for the x axis
        .attr("transform", "translate(" + (50) + " ," + (height + margin.bottom +30) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    svg.append("text")      // text label for the y axis
        .attr("transform", "translate(" + (50) + " ," + (height + margin.bottom +30) + ")")
        .style("text-anchor", "middle")
        .text("Year");


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  
 

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of incidents");


    for (var i = 0; i < allSeries.length; i++) {

      svg.append("path")
        .datum(allSeries[i])
        .attr('opacity',0)
        .on('mouseover', function(d) {
        d3.select(this).attr('stroke-dasharray',"5,5").attr('stroke-width', '5px');
          var myText = $(this).attr('class').split(' ');
          $(document).mousemove( function(e) {
             mouseX = e.pageX;
             mouseY = e.pageY;
          });
          $('.blurb').css('visibility', 'visible').css('top', mouseY).css('left', mouseX).fadeIn('slow').text(myText[1]);
        })
        .on('mouseout', function(d){
          that = this;
          setTimeout(function(){
            d3.select(that).attr('stroke-dasharray',"none").attr('stroke-width', '2px');
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
        .transition().delay(function (d,i){ return i * 200;}).duration(100)
        .attr("r", 3)
        .attr('opacity',1)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y(d.value); })
        .attr('fill',function(d){ return color(i); });


    }
     
      // var lines = svg.selectAll(".line")
      // var point = line.append("g")
      // .attr("class", "line-point");

      // point.selectAll('circle')
      // .data(function(d,i){ return d.values})
      // .enter().append('circle')
      // .attr("cx", function(d, i) {
      //     return x(i) + x.rangeBand() / 2;
      //   })
      //  .attr("cy", function(d, i) { return y(d.value) })
      //  .attr("r", 5);
      
});

$('path').on('mouseover', function(){
  console.log(this.attr('id') + 'mew');
})
