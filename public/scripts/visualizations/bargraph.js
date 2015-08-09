///////////////////////////////////
/////////BAR TEMPLATE//////////////
///////////////////////////////////

console.log('loading bargraph.js');
var makeBarGraph = function(data, charParams, svgParams) {
$('#buttons button').remove();
    //////////////////////////////////////
    //////// SVG PARAMETERS //////////////
    //////////////////////////////////////

    var width = svgParams.width || 500,
        height = svgParams.height || 200,
        padding = svgParams.padding || 200;

    //////////////////////////////////////
    //////// MEDIA QUERY FUNCTION //////////////
    //////////////////////////////////////

    var barSmall = function(){
    var iw = $(window).innerWidth();
      if(iw < 760){
        width = 300;
        height=200;
        drawBars();
      } else{
        width=500;
        height=200;
        drawBars();
      }
  };
  barSmall();
$(window).resize(function(){
  barSmall();
});
    ///////////////////////////////////////////
    //////// ADDING TITLE TO DOM //////////////
    /////////////////////////////////////////// TODO FIXME

    var $title = $('#title');
    $title.text(data.title);



    function drawBars(){
          /////////////////////////////////////
    //////// D3 PARAMETERS //////////////
    /////////////////////////////////////

    var x = d3.scale.ordinal().rangeRoundBands([0, width], [0.09]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10);

      //colors
    var color = d3.scale.category20();
        ///////////////////////////////////////////
    //////// XAXIS YAXIS DOMAINS //////////////
    ///////////////////////////////////////////

    x.domain(data.abuses);
    y.domain([0,data.maxYValue +50]);


        ///////////////////////////////////////////////
        //////// REMOVE THE SVG AND BUTTONS ///////////
        ///////////////////////////////////////////////

        $('svg').remove();
        $('#keys *').remove();

        ///////////////////////////////////////////////
        //////// APPEND SVG TO HTML BODY //////////////
        ///////////////////////////////////////////////

        var svg = d3.select("#pie").append("svg")
          .attr("width", width+100)
          .attr("height", height + padding)
          .append("g")
          .attr("transform", "translate(70,0)");
        $('#pie').css('margin-left','0').css('margin-top','20px');

        ///////////////////////////////////////////////////////
        //////// APPEND BARS PLUS HOVER HANDLERS //////////////
        ///////////////////////////////////////////////////////

        svg.selectAll("thisdoesnotmatter")
          .data(data.data) //love this line!
          .enter()
          .append("rect")
          .style('fill',function(d, i){ return color(d); })
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
          .attr("x", function(d) { return x(d[0]); })
          .attr("width", x.rangeBand())
          .attr("y", function(d, i) { return y(d[1]);  })
          .style('opacity', 0)
          .transition().delay(function (d,i){ return i * 10;})
          .duration(100)
          .style('opacity', 1)
          .attr("height", function(d, i) { return height - y(d[1]); })
          .attr('id', function(d){ return d[8]})
          .attr('class', 'bars');

          ///////////////////////////////////////////////////
          //////// XAXIS LABELS AND TRANSFORMS //////////////
          ///////////////////////////////////////////////////


          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")
            .call(xAxis)   //calls the xAxis var we made up above
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("x", -5)
            .attr('y',0)
            .attr("transform", "rotate(-60)");

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .selectAll("text");

    }


   drawBars();

   //////////////////////////////////////////////////
   //////// APPEND YEAR BUTTONS TO DOM //////////////
   //////////////////////////////////////////////////

      $buttonDiv = $('#buttons');
      for (var yr = 2005; yr <= 2009; yr++ ) {
        $button = $('<button>').attr('class','yearButton').attr('id', yr).text(yr);
        $buttonDiv.append($button);
      }
        var $buttons = $('.yearButton');
   $('#year').text($($buttons[0]).attr('id'));
   ///////////////////////////////////////////////
   //////// AUTOPLAY THROUGH YEARS  //////////////
   ///////////////////////////////////////////////
  
      var maxLoops = $buttons.length-1;
      var counter = 0;

          (function next() {
              if (counter++ >= maxLoops) return;

              setTimeout(function() {
                  $('#year').text(data.years[counter]);
                  year = data.years[counter];
                  drawBars();
                  if(counter === maxLoops){
                    counter = -1;
                  }
                  next();
              }, 5000);
          })();
    ///////////////////////////////////////////////
    ////////  BUTTON CLICK HANDLERS  //////////////
    ///////////////////////////////////////////////

      $.each($buttons, function(i, val) {
        $(val).click(function() {
          counter = maxLoops +10;
          $($buttons).removeClass('activeButton');
          $(this).addClass('activeButton');
          year = data.years[i];
          drawBars();
          $('#year').text($(this).attr('id'));
          console.log(year + 'yeaaar');
        });
      });


  }

  /////////////////////////////////////////////////////////////////////
  //////// ADAPTER FOR DISTRIBUTION OF ABUSE ALLEGATIONS //////////////
  /////////////////////////////////////////////////////////////////////


  var adapterForDistributionOfAbuseAllegationsToBarChart = function(data) {
    var result = {};
    result.data = [];
    var keys = Object.keys(data.data[0]).sort();
    result.years = ["2005", "2006", "2007", "2008", "2009"];
    result.abuses = [];
    var yValues = [];
    for (var i = 0; i < data.data.length - 1; i++) {
      var currentAbuse = data.data[i];

      var currentResult = [];
      for (var j = 0; j < keys.length; j++) {
        if (j < 10) {
          currentResult.push(parseInt(currentAbuse[keys[j]]));
          if (j < 4) {
            yValues.push(parseInt(currentAbuse[keys[j]]));
          }
        } else {
          result.abuses.unshift(currentAbuse[keys[j]]);
          currentResult.unshift(currentAbuse[keys[j]]);
        }
      }
      result.data.push(currentResult);
    }
    result.maxYValue = d3.max(yValues, function(d) {return d;});
    result.title = "Allegations of Abuse of Authority by Police";
    console.log(result);
    return result;
  }
