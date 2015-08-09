///////////////////////////////////
/////////BAR TEMPLATE//////////////
///////////////////////////////////

console.log('loading bargraph.js');
var makeBarGraph = function(data, charParams, svgParams) {

  data = selectAdapter(data, chartParams);

    //////////////////////////////////////
    //////// SVG PARAMETERS //////////////
    //////////////////////////////////////

    var width = svgParams.width || 1000,
        height = svgParams.height || 600,
        padding = svgParams.padding || 200;

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
    //////// ADDING TITLE TO DOM //////////////
    /////////////////////////////////////////// TODO FIXME

    var $title = $('#title');
    $title.text(data.title);


    ///////////////////////////////////////////
    //////// XAXIS YAXIS DOMAINS //////////////
    ///////////////////////////////////////////

    x.domain(data.abuses);
    y.domain([0,data.maxYValue +100]);


    function drawBars(){
        ///////////////////////////////////////////////
        //////// REMOVE THE SVG AND BUTTONS ///////////
        ///////////////////////////////////////////////

        $('svg').remove();
        $('#buttons button').remove();
        $('#keys *').remove();

        ///////////////////////////////////////////////
        //////// APPEND SVG TO HTML BODY //////////////
        ///////////////////////////////////////////////

        var svg = d3.select("body").append("svg")
          .attr("width", width + padding * 2)
          .attr("height", height + padding * 2)
          .append("g")
          .attr("transform", "translate(" + padding + "," + padding + ")");

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
          .transition().delay(function (d,i){ return i * 100;})
          .duration(300)
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
            .attr("x", -25)
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
        $button = $('<button>').attr('id', yr).text(yr);
        $buttonDiv.append($button);
      }
        var $buttons = $('button');

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
          year = data.years[i];
          drawBars();
          console.log(year + 'yeaaar');
        });
      });
  }

  ///////////////////////////////////////////////
  ///////// SELECT THE RIGHT ADAPTER  ///////////
  ///////////////////////////////////////////////

  var selectAdapter = function(data, params) {
    console.log("selecting the right adapter to draw the bar chart");
    switch (params.dataType) {
      case 'firearms':
        data = adapterForFirearmsToTimeseries(data, params);
        return data;
        break;
      case 'language':
        data = adapterForAbuseToBarChart(data, params, 5, 5);
        return data;
        break;
      case 'Abuse of Authority':
        data = adapterForAbuseToBarChart(data, params, 5, 5);
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
      default:
        console.log('uh-oh something went wrong in the Timeseries selectAdapter function');
        break;
    }
  }

  /////////////////////////////////////////////////////////////////////
  //////// ADAPTER FOR DISTRIBUTION OF ABUSE ALLEGATIONS //////////////
  /////////////////////////////////////////////////////////////////////


  var adapterForAbuseToBarChart = function(data) {
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
