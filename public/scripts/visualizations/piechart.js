//////////////////////////////////////
////////// PIE TEMPLATE //////////////
//////////////////////////////////////

console.log('loading piechart.js');

var makePieChart = function(dataset, chartParams, svgParams) {

  //////////////////////////////////////
  ////////// SVG VARIABLES /////////////
  //////////////////////////////////////
  var width = svgParams.width || 500;
  var height = svgParams.height || 500;
  var padding = svgParams.padding || 500;

  var pieChart = d3.layout.pie().sort(null),
    color = d3.scale.category20(),  //TODO must make better palette
    arc = d3.svg.arc();

  // TODO because we have a bunch of stuff named data
  data = dataset;

  console.log("log of data below:")
  console.log(data);



  ////////////////////////////////////////////////////////////
  ////////// Don't need this, only for filepaths//////////////
  // d3.json(dataset, function(error, data) {/////////////////
  //   console.log(dataset);  ////////////////////////////////
  //   console.log(data); ////////////////////////////////////
  ////////////////////////////////////////////////////////////


  //////////////////////////////////////
  /////// getting rid of total /////////
  //////////////////////////////////////
    var total = data.data.pop();
    var types = data.data;


   //////////////////////////////////////
  //// making the title dynamically /////
  //////////////////////////////////////
    var $title = $('#title');
    $title.text('foo');

  //////////////////////////////////////////////////////
  //// creating the legend and appending it to DOM /////
  /////////////////////////////////////////////////////
    var $keys = $('#keys');
    for (var i = 0; i < types.length-1; i++) {
      var typeName = types[i][8];
      var p = $('<p>');
      var keyText = $('<span>').addClass('key-text').attr('id', typeName).text(typeName);
      var keyColor = $('<span>').addClass('key-color');
      p.append(keyText);
      p.append(keyColor);
      $keys.append(p);
  }

    var pieCharts = [],
        totals = [];

  ///////////////////////////////////////////
  //// calling the pieChart d3 function /////
  ///////////////////////////////////////////
//chartParams.datafields []
    var createCharts = function() {
      for (var yr = 10; yr < 19; yr += 2) {
        var arr = [];
        var yearlyTotal = [];
        for (var type = 0; type <= types.length - 1; type++) {
          arr.push(types[type][yr]);
          yearlyTotal.push(types[type][yr - 1]); // [334, 456, 789, ... 111]
        }
        var chart = pieChart(arr);
        totals.push(yearlyTotal);
        //totals = [ [2005 totals], [2006 totals], ... [2009 totals]]
        pieCharts.push(chart);
      }
    }

    createCharts();

  //////////////////////////////////////
  ///////// making pieee yummy /////////
  //////////////////////////////////////

    arc.outerRadius(205);  //WTF is this FIXME// it will be ok.
    console.log(pieCharts);
    var cy = height / 2 + padding,
        cx = width / 2 + padding;

  //////////////////////////////////////
  ///////// making each slice /////////
  ////////plus hover effects///////////
  //////////////////////////////////////


    d3.select("#pie")
      .append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2);
  //TODO i want each slice to be associated with its label. I'm not sure how to do that...
    d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + cx + "," + cy + ")")
      .selectAll("path")
      .data(pieCharts[0])
      .enter()
      .append("path")
      .on('mouseover', function(d) { //this displays the category title on mouseover
        d3.select(this).attr("opacity", .5);
          var myText = $(this).attr('id');
          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          $('.blurb').css('visibility', 'visible').css('margin-left', x-50).css('margin-top', y-150).fadeIn('slow').text(myText);
        })
      .on('mouseout', function(d){
        d3.select(this).attr("opacity", 1)
          setTimeout(function(){
            $('.blurb').fadeOut('slow');
          },1500);

        })
      .attr("fill", function(d, i){ return color(i); })
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .attr('id', function(d, i){ console.log(data.data[i][8] + 'd8'); return data.data[i][8];})
      .each(function(d) {
        this._current = JSON.parse(JSON.stringify(d));
        this._current.endAngle = this._current.startAngle;
      })
      .transition().duration(1000).attrTween("d", makeArcTween(205));


  /////////////////////////////////////////////////////
  //////  Storing the currenty displayed angles  //////
  ////// Then, interpolating from current to new //////
  /////////////////////////////////////////////////////


    function makeArcTween(val){
      return function(a) {
        var i = d3.interpolate(this._current, a)
        var k = d3.interpolate(arc.outerRadius()(), val);
        this._current = i(0);
        return function(t) {
          return arc.outerRadius(k(t))(i(t));
      };
    };
  }

    d3.selectAll(".key-color")
      .transition().duration(1000)
      .style("background-color", function(d, i) { return color(i) }); //TODO fix colors

  ///////////////////////////////////////
  ///////// making year buttons /////////
  ///////////////////////////////////////

//TODO see below for using chartParams
    $buttonDiv = $('#buttons');
    for (var yr = 2005; yr <= 2009; yr++ ) {
      $button = $('<button>').attr('id', yr).text(yr);
      $buttonDiv.append($button);
    }

    var $buttons = $('button');

    //////////////////////////////////////////
    ///////// autoplay through years /////////
    //////////////////////////////////////////
    // if chartParams.multiYears
    {multiYear: true, startYear: 2005, endYear: 2009}
    var maxLoops = $buttons.length-1;
        var counter = 0;
        // for (var i = chartParams.startYear; i <= chartParams.endYear)
        var yearz = [2005,2006,2007,2008,2009]; //this would go
        (function next() {
            if (counter++ >= maxLoops) return;

            setTimeout(function() {
                $('#year').text(yearz[counter]); //years[counter] would be replaced by i
                console.log(counter);
                d3.selectAll("path")
                .data(pieCharts[counter])
                .transition().duration(1000).attrTween("d", makeArcTween(205));

                if(counter === maxLoops){
                  counter = -1;
                }
                next();
            }, 5000);
        })();

   //////////////////////////////////////////////////
   /////////// year button click effect /////////////
   //////////////////////////////////////////////////

    $.each($buttons, function(i, val) {
      $(val).click(function() {
        d3.selectAll("path")
        .data(pieCharts[i])
        .transition().duration(1000).attrTween("d", makeArcTween(205));
      });
    });
  // });
};




//old path to local file...
//"../oldjsontests/firearms.json"
