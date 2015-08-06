//////////////////////////////////////
////////// PIE TEMPLATE //////////////
//////////////////////////////////////

console.log('loading piechart.js');


var makePieChart = function(data, chartParams, svgParams) {
  console.log(chartParams);


  /////////////////////////////////
  ///// Preventing duplicates /////
  /////////////////////////////////

  $('svg').remove();
  $('#buttons button').remove();
  $('#keys *').remove();




  //////////////////////////////////////
  ////////// SVG VARIABLES /////////////
  //////////////////////////////////////

  var width = svgParams.width || 500;
  var height = svgParams.height || 500;
  var padding = svgParams.padding || 500;

  var pieChart = d3.layout.pie().sort(null),
    color = d3.scale.category20(),  //TODO must make better palette
    arc = d3.svg.arc();



  ////////////////////////////////////////////////////
  /////// calling the appropriate adapter ////////////
  ////////////////////////////////////////////////////
  if(chartParams.dataType === 'firearms'){
    adapterForFirearmsToPie(data);
  } else if (chartParams.dataType === 'language'){
    console.log('im adapting');
    adapterForOffensiveLanguageToPie(data);
  }


  /////////////////////////////////////////////////////
  /////// getting rid of total if appropriate /////////
  /////////////////////////////////////////////////////
  if(chartParams.total === true){
    var total = data.data.pop();
  }
    

  ///////////////////////////////////////////////////
  //// giving the types of abuses/offenses/etc. /////
  //// a generic name////////////////////////////////
  ///////////////////////////////////////////////////

    var types = data.data;

    
  ///////////////////////////////////////
  //// making the title dynamically /////
  //////////////////////////////////////

    var $title = $('#title');
    $title.text('foo'); //TODO FIXME

  //////////////////////////////////////////////////////
  //// creating the legend and appending it to DOM /////
  /////////////////////////////////////////////////////


    var $keys = $('#keys');
    for (var i = 0; i < types.length; i++) {
      var typeName = types[i].name;
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
  //i need an array of pointers to each year, then i loop through the years and grab
  //the total for that year and store it in another array.


    var createCharts = function(){
      for(b = 0; b < numberOfYearsForThisDataset; b++){ /********************************//********************************//********************************//********************************/
      arr = [];
      yearlyTotal = []; //the percentages for each year.
      for(var a = 0; a < types.length; a++){


        
        yearlyTotal.push(types[a].arrOfYearValues[b]);  //creating 11 sets for each b cycle (each year), within each pushing only that year from each abuse.
      }

      var chart = pieChart(yearlyTotal);
      pieCharts.push(chart);

      totals.push(yearlyTotal);
      }

    };

    createCharts();


  //////////////////////////////////////
  ///////// making pieee yummy /////////
  //////////////////////////////////////

    arc.outerRadius(205);  //WTF is this FIXME// it will be ok :-)
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

    d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + cx + "," + cy + ")")
      .selectAll("path")
      .data(pieCharts[0])
      .enter()
      .append("path")
      .on('mouseover', function(d) { //this displays the category title on mouseover
        d3.select(this).attr("opacity", 0.5);
          var myText = $(this).attr('id');
          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          $(document).mousemove( function(e) { //this anchors the label to the mouse position
             mouseX = e.pageX;
             mouseY = e.pageY;
          });
          $('.blurb').css('visibility', 'visible').css('top', mouseY).css('left', mouseX).fadeIn('slow').text(myText);
        })
      .on('mouseout', function(d){ //removes hover effects.
        d3.select(this).attr("opacity", 1);
          setTimeout(function(){
            $('.blurb').fadeOut('slow');
          },1500);

        })
      .attr("fill", function(d, i){ return color(i); })
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .attr('id', function(d, i){ return data.data[i].name;}) //this id is used for mouseover stuff.
      .each(function(d) { //drawing the slice
        this._current = JSON.parse(JSON.stringify(d));
        this._current.endAngle = this._current.startAngle;
      })
      .transition().duration(1000).attrTween("d", makeArcTween(205));


  /////////////////////////////////////////////////////
  //////  Storing the currenty displayed angles  //////
  ////// Then, interpolating from current to new //////
  ///////// i.e. from 2005 values to 2009  ////////////
  /////////////////////////////////////////////////////


    function makeArcTween(val){
      return function(a) {
        var i = d3.interpolate(this._current, a);
        var k = d3.interpolate(arc.outerRadius()(), val);
        this._current = i(0);
        return function(t) {
          return arc.outerRadius(k(t))(i(t));
      };
    };
  }

    d3.selectAll(".key-color")
      .transition().duration(1000)
      .style("background-color", function(d, i) { return color(i);}); //TODO fix colors

  //////////////////////////////////////////////////////
  ///////// making label strings for each year /////////
  //////////////////////////////////////////////////////

  var yearsToLabel = [];
    if(chartParams.yearType === '2012'){
      yearsToLabel = [2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012]; //this sucks but it will do for now.
    } else if( chartParams.yearType === '2009'){
      yearsToLabel = [2005,2006,2007,2008,2009];
    }

  ////////////////////////////////////////
  ///////// making year buttons /////////
  ///////////////////////////////////////
    $buttonDiv = $('#buttons');
    for (var yr = yearsToLabel[0]; yr <= yearsToLabel[yearsToLabel.length-1]; yr++ ) { /********************************//********************************//********************************/
      $button = $('<button>').attr('id', yr).text(yr);
      $buttonDiv.append($button);
    }

    var $buttons = $('button');

  //////////////////////////////////////////
  ///////// autoplay through years /////////
  //////////////////////////////////////////



    (function next() {

    var maxLoops = $buttons.length-1; //we can assume thats the number of years
        var counter = 0;
            if (counter++ >= maxLoops) return;

            setTimeout(function() {
                $('#year').text(yearsToLabel[counter]); //years[counter] would be replaced by i
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


    

 ///////////////////////////////////////////////////
 /////////// ADAPTER FOR FIREARMS DATA /////////////
 ///////////////////////////////////////////////////

 var adapterForFirearmsToPie = function(data){



    for(type = 0; type < data.data.length; type++){
      data.data[type].arrOfYearValues = [
         data.data[type]._2002,
         data.data[type]._2003,
         data.data[type]._2004,
         data.data[type]._2005,
         data.data[type]._2006,
         data.data[type]._2007,
         data.data[type]._2008,
         data.data[type]._2009,
         data.data[type]._2010,
         data.data[type]._2011,
         data.data[type]._2012,
      ];
      numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
      data.data[type].name = data.data[type].discharge_detail;
 
    }
   
};



 ///////////////////////////////////////////////////
 /////////// ADAPTER FOR FIREARMS DATA /////////////
 ///////////////////////////////////////////////////

var adapterForOffensiveLanguageToPie = function(data){


    for(type = 0; type < data.data.length; type++){
      data.data[type].arrOfYearValues = [
         data.data[type]._number_1,
         data.data[type]._number_2,
         data.data[type]._number_3,
         data.data[type]._number_4,
         data.data[type]._number_5
      ];
      numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
      data.data[type].name = data.data[type].type_of_offensive_language_allegation;
 
    }
   
};





