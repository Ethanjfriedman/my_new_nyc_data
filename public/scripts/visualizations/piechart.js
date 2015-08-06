//////////////////////////////////////
////////// PIE TEMPLATE //////////////
//////////////////////////////////////

console.log('loading piechart.js');
/*
chartParams = {
  keys: ['_number_1','_number_2','_number_3','_number_4','_number_5', '_percent_of_total_1', '_percent_of_total_2', '_percent_of_total_3', '_percent_of_total_4', '_percent_of_total_5', 'type_of_abuse_of_authority_allegation'],
  multi: false
}
chartParams = {
   abuses:true,
   multi: false
}
*/
var makePieChart = function(data, chartParams, svgParams) {

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

  // TODO because we have a bunch of stuff named data
  // data = dataset;
  // keys = chartParams.keys;
  // keyAbuse = keys[keys.length - 1]; //the name of the abuse.
  // key2005 = keys[5]; //percentage of total for that year.
  // key2006 = keys[6];
  // key2007 = keys[7];
  // key2008 = keys[8];
  // key2009 = keys[9];

////////////////////////////////////////////
/////// THIS IS WORKING YESSSSSSS////////////
/////// the name seems to work    ///////////
/////// year array is working   ////////////
////////////////////////////////////////////
if(chartParams.dataType === 'firearms'){
adapterForFirearmsToPie(data);
}
// } else if(chartParams.dataType === '2009') //for other types i.e. ones that have 2005-2009

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



  // console.log("log of data below:");
  // console.log(data);

  ////////////////////////////////////////////////////////////
  ////////// Don't need this, only for filepaths//////////////
  // d3.json(dataset, function(error, data) {/////////////////
  //   console.log(dataset);  ////////////////////////////////
  //   console.log(data); ////////////////////////////////////
  ////////////////////////////////////////////////////////////


  //////////////////////////////////////
  /////// getting rid of total /////////
  //////////////////////////////////////
    // var total = data.data.pop();
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
      .on('mouseout', function(d){
        d3.select(this).attr("opacity", 1);
          setTimeout(function(){
            $('.blurb').fadeOut('slow');
          },1500);

        })
      .attr("fill", function(d, i){ return color(i); })
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .attr('id', function(d, i){ return data.data[i].name;})
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

  ///////////////////////////////////////
  ///////// making year buttons /////////
  ///////////////////////////////////////
  var yearsToLabel = [];
    if(chartParams.yearType === '2012'){
      yearsToLabel = [2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012]; //this sucks but it will do for now.
    } else if( chartParams.yearType === '2009'){
      yearsToLabel = [2005,2006,2007,2008,2009];
    }

/////////////////////////////////////////////////////
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
    var maxLoops = $buttons.length-1;
        var counter = 0;
        // for (var i = chartParams.startYear; i <= chartParams.endYear)

            if (counter++ >= maxLoops) return;

            setTimeout(function() {
                $('#year').text(yearsToLabel[counter]); //years[counter] would be replaced by i
                console.log(counter);
                d3.selectAll("path")
                .data(pieCharts[counter]) /********************************//********************************//********************************/
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



 var adapterForFirearmsToPie = function(data){  /********************************/  /********************************/



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
      data.data[type].name = data.data[type].discharge_detail; //this works.
 
    }
   
};

// var adapterForDistributionToPie = function(data){  /********************************/  /********************************/



//     for(type = 0; type < data.data.length; type++){
//       data.data[type].arrOfYearValues = [
//          data.data[type]._2002,
//          data.data[type]._2003,
//          data.data[type]._2004,
//          data.data[type]._2005,
//          data.data[type]._2006,
//          data.data[type]._2007,
//          data.data[type]._2008,
//          data.data[type]._2009,
//          data.data[type]._2010,
//          data.data[type]._2011,
//          data.data[type]._2012,
//       ];
//       numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
//       data.data[type].name = data.data[type].discharge_detail; //this works.
 
//     }
   
// };




//old path to local file...
//"../oldjsontests/firearms.json"
