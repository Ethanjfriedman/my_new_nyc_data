///////////////////////////////////
/////////BAR TEMPLATE//////////////
//////////////////////////////////

// Graph dimensions
var width = 1000,
    height = 600,
    padding = 200;

var x = d3.scale.ordinal().rangeRoundBands([0, width], [0.09]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")


var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);
  
//colors
var color = d3.scale.category20();

function makeBar(){


  d3.json("../oldjsontests/distribution.json", function(error, data) {
  var $title = $('#title');
  $title.text(data.meta.view.name);
    //getting rid of total and storing it in a variable;
    var total = data.data.pop();
    console.log(total[11] + 'total');
    var maxYears = []
    var years = [9,11,13,15,17]; //so this is different depending on the data set :(
      for(q = 0; q < years.length; q++){
        maxYears.push(d3.max(data.data, function(d) { return parseInt(d[years[q]]);}));
      }
    console.log(maxYears +'maxYears');
    var year = years[0];
    
    // Loading data
    //d3 max is treating numbers as strings, so we convert below
    var maxY = d3.max(maxYears, function(d) { return d;})
    console.log(maxY);

    
    x.domain(data.data.map(function(d) { return d[8]; }));
    y.domain([0,maxY +100]);
    

 function drawBars(){

    $('svg').remove();
      //Append our SVG to the HTML body
  var svg = d3.select("body").append("svg")
    .attr("width", width + padding * 2)
    .attr("height", height + padding * 2)
    .append("g")
    .attr("transform", "translate(" + padding + "," + padding + ")");



    svg.selectAll("thisdoesnotmatter")
      .data(data.data)
      .enter()
      .append("rect")
      .style('fill',function(d){ return color(d); })
      .on('mouseover', function(d) {
        d3.select(this)
        .style('fill', 'black');
        var myText = $(this).attr('id');
          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          $('.blurb').css('visibility', 'visible').css('margin-left', x-50).css('margin-top', y-150).fadeIn('slow').text(myText);
      })
      .on('mouseout', function(d){
        d3.select(this)
        .style('fill',function(d){ return color(d); });
        setTimeout(function(){
            $('.blurb').fadeOut('slow');
          },1500);
      })
      .attr("x", function(d) { return x(d[8]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d[year]); })
      .style('opacity', 0)
      .transition().delay(function (d,i){ return i * 100;})
      .duration(300)
      .style('opacity', 1)
      .attr("height", function(d) { return height - y(d[year]); })
      .attr('id', function(d){ return d[8]})
      .attr('class', 'bars')

      
      ;

      
    

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + height + ")")
      .call(xAxis)   //calls the xAxis var we made up above
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("x", -25)
      .attr("transform", "rotate(-60)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll("text");
 }
 drawBars();
      //making the year buttons
    $buttonDiv = $('#buttons');
    for (var yr = 2005; yr <= 2009; yr++ ) {
      $button = $('<button>').attr('id', yr).text(yr);
      $buttonDiv.append($button);
    }
      var $buttons = $('button');
    //autoplay
    var maxLoops = $buttons.length-1;
        var counter = 0;
        var yearz = [2005,2006,2007,2008,2009];
        (function next() {
            if (counter++ >= maxLoops) return;

            setTimeout(function() {
                $('#year').text(yearz[counter]);
                year = years[counter];
                drawBars();
                if(counter === maxLoops){
                  counter = -1;
                }
                next();
            }, 5000);
        })();
     //end of autoplay
    $.each($buttons, function(i, val) {
      $(val).click(function() {
        year = years[i];
        drawBars();
        console.log(year + 'yeaaar');
      });
    });



  });
};

makeBar();