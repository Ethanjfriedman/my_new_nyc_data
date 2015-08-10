///////////////////////////////////
/////////BAR TEMPLATE//////////////
///////////////////////////////////

console.log('loading bargraph.js');
var makeBarGraph = function(data, chartParams, svgParams) {
data = selectPieAdapter(data, chartParams);

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
        drawBars(parseInt(chartParams.startYear));
      } else{
        width=500;
        height=200;
        drawBars(parseInt(chartParams.startYear));
      }
  };
  barSmall();
$(window).resize(function(){
  barSmall();
});
    ///////////////////////////////////////////
    //////// ADDING TITLE TO DOM //////////////
    ///////////////////////////////////////////

    var $title = $('#title');
    $title.text(data.title);

    function drawBars(yearToDraw){
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
    //////////////////////////////////////////
    x.domain(data.abuses);
    y.domain([0,data.maxYValue +50]); //TODO: this should change based on year being shown


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
        var barData = [];
        var selectYear = function() {
          for (var i = 0; i < data.data.length; i ++) {
            var dataPoint = [];

            for (var j = 0; j < data.data[i].length; j++) {
              if (j === 0 || j === (yearToDraw + 1)) {
                dataPoint.push(data.data[i][j]);
                barData.push(dataPoint);
              }
            }
        };
      }
        console.log(barData);
        selectYear();
        svg.selectAll("thisdoesnotmatter")
          // .data(data.data) //love this line!
          .data(barData)
          .enter()
          .append("rect")
          .style('fill',function(d, i){ return color(d); })
          .attr('id', function(d){ return (d[0] +": " + d[1])})
          .on('mouseover', function(d) {
            d3.select(this)
            .style('fill', 'black');
            var myText = $(this).attr('id');
            console.log(this);
              $(document).mousemove( function(e) { //this anchors the label to the mouse position
                 mouseX = e.pageX;
                 mouseY = e.pageY;
              });
              $('.blurb').css('visibility', 'visible').css('top', mouseY).css('left', mouseX).fadeIn('slow').text(myText);
          })
          .on('mouseout', function(d){
            d3.select(this)
            .style('fill',function(d){ return color(d); });
            setTimeout(function(){
                $('.blurb').fadeOut('slow');
              },1500);
          })
          .attr("x", function(d) { console.log(d[0]); return x(d[0]); }) //here's the problem -Aarati
          .attr("width", x.rangeBand())
          .attr("y", function(d, i) { return y(d[1]);  })
          .style('opacity', 0)
          .transition().delay(function (d,i){ return i * 10;})
          .duration(100)
          .style('opacity', 1)
          .attr("height", function(d, i) { return height - y(d[1]); })
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


   //////////////////////////////////////////////////
   //////// APPEND YEAR BUTTONS TO DOM //////////////
   //////////////////////////////////////////////////

      $buttonDiv = $('#buttons');
      for (var yr = 0; yr < data.years.length; yr++ ) {
        $button = $('<button>').attr('class','yearButton').attr('id', data.years[yr]).text(data.years[yr]);
        $buttonDiv.append($button);
      }
      var $buttons = $('.yearButton');
      $('#year').text(data.years[0]);

   ///////////////////////////////////////////////
   //////// AUTOPLAY THROUGH YEARS  //////////////
   ///////////////////////////////////////////////

      var maxLoops = $buttons.length-1;
      var counter = 0;

          (function next() {
              if (counter++ >= maxLoops) return;

              setTimeout(function() {
                  $('#year').text(data.years[counter]);
                  year = counter + parseInt(chartParams.startYear);
                  drawBars(year);
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
          year = i + parseInt(chartParams.startYear);
          drawBars(year);
          $('#year').text($(this).attr('id'));
          console.log(year + 'yeaaar; ' + i);
        });
      });


  }

  ///////////////////////////////////////////////
  ///////// SELECT THE RIGHT ADAPTER  ///////////
  ///////////////////////////////////////////////

  var selectPieAdapter = function(data, params) {
    console.log("selecting the right adapter to draw the bar chart");
    switch (params.dataType) {
      case 'firearms':
        data = adapterForFirearmsToBarChart(data, params, 6, 50);
        console.log('adapter for firearms');
        return data;
        break;
      case 'language':
        data = adapterForAbuseToBarChart(data, params, 7, 7);
        return data;
        break;
      case 'Abuse of Authority':
        data = adapterForAbuseToBarChart(data, params, 25, 25); //WORKS
        return data;
        break;
      case 'Race of Victims':
        data = adapterForAbuseToBarChart(data, params, 7, 5); //works
        return data;
        break;
      case 'Gender of Officers':
        data = adapterForAbuseToBarChart(data, params, 4, 2);
        return data;
        break;
      case 'Gender of Victims':
        data = adapterForAbuseToBarChart(data, params, 4, 2);
        return data;
        break;
      default:
        console.log('uh-oh something went wrong in the bar selectAdapter function');
        break;
    }
  }

  /////////////////////////////////////////////////////////////////////
  //////// ADAPTER FOR DISTRIBUTION OF ABUSE ALLEGATIONS //////////////
  /////////////////////////////////////////////////////////////////////


  var adapterForAbuseToBarChart = function(data, params, limit, skip) {
    console.log("runing adapterForAbuseToBarChart");
    var result = {};
    result.data = [];
    result.years = ["2005", "2006", "2007", "2008", "2009"];
    var keys = Object.keys(data.data[0]).sort();
    for (var y = 0; y <= result.years.length; y++) {
      if (y < parseInt(params.startYear)) {
        result.years.shift();
      } else if (y > parseInt(params.endYear)) {
        result.years.pop();
      }
    }
    result.abuses = [];
    var yValues = [];
    for (var i = 0; i < limit; i++) {
      var currentField = data.data[i];
      var currentResult = [];
      console.log(keys);
      for (var j = 0; j < keys.length; j++) {
        var val = parseInt(currentField[keys[j]]);
        if (j < 5) {
          currentResult.push(val);
          yValues.push(val);
        }
        if (j == keys.length - 1 && currentField[keys[j]] != 'Subtotal') {
          currentResult.unshift(currentField[keys[j]]);
          result.abuses.push(currentField[keys[j]]);
        }
      }
      if (i !== skip) {
              result.data.push(currentResult);
      }
  }
    result.maxYValue = d3.max(yValues, function(d) {return d;});
    result.title = params.title;
    console.log("adapted dataset:")
    console.log(result);
    return result;
  }



  ////////////////////////////////////////////
  //////// ADAPTER FOR FIREARMS //////////////
  ////////////////////////////////////////////

    var adapterForFirearmsToBarChart = function(data, params, limit, skip) {
    console.log("running adapterForFirearmsToBarChart");

    var result = {};

    result.data = [];

    result.years = ["2002", "2003", "2004", "2005", "2006",'2007','2008','2009','2010','2011','2012'];

    var keys = Object.keys(data.data[0]).sort();
    // console.log(keys);


    for (var y = 0; y <= result.years.length; y++) {
      if (y < parseInt(params.startYear)) {
        result.years.shift();
      } else if (y > parseInt(params.endYear)) {
        result.years.pop();
      }
    }
    result.abuses = [];
    var yValues = [];

    for (var i = 0; i < limit; i++) {
      var currentField = data.data[i];
      var currentResult = [];
  
          for (var j = 0; j < keys.length; j++) {
             if(j < keys.length -1){
                var val = parseInt(currentField[keys[j]]);
                console.log(currentField[keys[j]]);
                currentResult.push(val);
                yValues.push(val);
              } else if (j == keys.length - 1) {
                currentResult.unshift(currentField[keys[j]]);
                result.abuses.push(currentField[keys[j]]);
              }
          }
          result.data.push(currentResult); 
  }
    result.maxYValue = d3.max(yValues, function(d) {return d;});
    result.title = params.title;
    console.log("adapted dataset:")
    console.log(result);

    return result;

  }

