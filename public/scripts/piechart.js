/*<><><><><><><><><>PIE TEMPLATE<><><><><><><>*/
var width = 500,
    height = 500,
    padding = 100;

// set up d3 variables
var makePieChart = function(dataset) {
  var pieChart = d3.layout.pie().sort(null),
    color = d3.scale.category20(),  //TODO must make better palette
    arc = d3.svg.arc();

  d3.json(dataset, function(error, data) {
    console.log(error);
      //getting rid of total and storing it in a variable;
    var total = data.data.pop();
    var types = data.data;

    //making the title
    var $title = $('#title');
    $title.text(data.meta.view.name);

  // create the legend and append it to the DOM
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
    arc.outerRadius(205);  //WTF is this FIXME
    console.log(pieCharts);
    var cy = height / 2 + padding,
        cx = width / 2 + padding;

    d3.select("#pie")
      .append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2);
  //i want each slice to be associated with it's label. I'm not sure how to do that...
    d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + cx + "," + cy + ")")
      .selectAll("path")
      .data(pieCharts[0])
      .enter()
      .append("path")
      .on('mouseover', function(d) {
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

    // Store the currently displayed angles
    //Then, interpolate from this._current to the new angles

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
     //end of autoplay
    $.each($buttons, function(i, val) {
      $(val).click(function() {
        d3.selectAll("path")
        .data(pieCharts[i])
        .transition().duration(1000).attrTween("d", makeArcTween(205));
      });
    });
  });
};

makePieChart("../oldjsontests/firearms.json");
