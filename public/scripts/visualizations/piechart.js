//////////////////////////////////////
////////// PIE TEMPLATE //////////////
//////////////////////////////////////

console.log('loading piechart.js');


var makePieChart = function(data, chartParams, svgParams) {

// data = selectAdaptor(data, chartParams);

///////////////////////////////////////////////////
//checking window width in order to resize pie/////
///////////////////////////////////////////////////
var smallPie = function(){
  var iw = $(window).innerWidth();
    if(iw < 760){
      radius = 90;
    } else{
      radius=150;
    }
};

chartParams.startYear = parseInt(chartParams.startYear);
chartParams.endYear = parseInt(chartParams.endYear);

  /////////////////////////////////
  ///// Preventing duplicates /////
  /////////////////////////////////

  $('svg').remove();
  $('#buttons button').remove();
  $('#keys *').remove();


  //////////////////////////////////////
  ////////// SVG VARIABLES /////////////
  //////////////////////////////////////
  var hexColors;
  if(chartParams.colorScheme ==='monochrome'){
     hexColors = hexColorsMonochrome;
  }else if(chartParams.colorScheme =='summer'){
    hexColors = hexColorsSummer;
  }
  else{
     hexColors = hexColorsWinter;
  }
  var width = svgParams.width || 100;
  var height = svgParams.height || 100;
  var padding = svgParams.padding || 100;
  var radius = 150;
  smallPie();
  var pieChart = d3.layout.pie().sort(null),
    color = d3.scale.category20(),  //TODO must make better palette
    arc = d3.svg.arc();


  ////////////////////////////////////////////////////
  /////// calling the appropriate adapter ////////////
  ////////////////////////////////////////////////////
  if(chartParams.dataType == 'firearms'){
    adapterForFirearmsToPie(data);
  } else if (chartParams.dataType == 'language'){
        adapterForOffensiveLanguageToPie(data);
    } else if (chartParams.dataType == 'Abuse of Authority'){
        adapterForAbuseOfAuthorityToPie(data);
      } else if (chartParams.dataType == 'Race of Victims'){
          adapterForRaceOfVictimsToPie(data);
        } else if (chartParams.dataType == 'Gender of Victims'){
            adapterForGenderOfVictimsToPie(data);
          } else if (chartParams.dataType == 'Gender of Officers'){
              adapterForGenderOfOfficersToPie(data);
          } else if (chartParams.dataType == 'Reasons for Encounters'){
              adapterForReasonsForEncountersToPie(data);
          }

  ////////////////////////////////////////////////////////////////
  /////// getting rid of total & subtotal if appropriate /////////
  ////////////////////////////////////////////////////////////////
  var total;

  if(chartParams.totalPresent === true){
    total = data.data.pop();
  } else if (chartParams.totalPresent === 'weird'){ //so the race & gender dataset also has an object for a subtotal, which is at index5
      data.data.splice(5,1);
      total = data.data.pop();
    } else if (chartParams.totalPresent === 'weird2'){
        data.data.splice(2,1);
        total = data.data.pop();
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
    $title.text(chartParams.title); //TODO FIXME

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
  // ChartParams.startYear = 2;
  // ChartParams.endYear = 4;  ~~ so 2007 - 2009 // or 2004 ~~ 2006 depending on the dataset.

    // var createCharts = function(){
      console.log(chartParams.startYear);
      for (f = chartParams.startYear; f <= chartParams.endYear; f++){ /********************************STARTYEAR AND ENDYEAR********************************//********************************/
       console.log('running first level');
        arr = [];
        yearlyTotal = []; //the percentages for each year.

        for (var a = 0; a < types.length; a++){
        console.log('running second level'+f);


          yearlyTotal.push(types[a].arrOfYearValues[f]);  //creating 11 sets for each b cycle (each year), within each pushing only that year from each abuse.

        }

      var chart = pieChart(yearlyTotal);

      pieCharts.push(chart);


      totals.push(yearlyTotal);
      }



    // };

    // createCharts();


  //////////////////////////////////////
  ///////// making pieee yummy /////////
  //////////////////////////////////////

    arc.outerRadius(radius);  //WTF is this FIXME// it will be ok :-)
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
      .on('mouseover', function(d) {
       myBool = true; //this displays the category title on mouseover
        d3.select(this).attr("opacity", 0.5);
          var myText = $(this).attr('id') + ": " + (JSON.parse(JSON.stringify(d)).data) +' incidents, ' + ((((JSON.parse(JSON.stringify(d)).endAngle - JSON.parse(JSON.stringify(d)).startAngle)/6.283)*100).toFixed(2)) + '%';
          var x = event.pageX - this.offsetLeft;
          var y = event.pageY - this.offsetTop;
          mouseX = event.pageX;
          mouseY = event.pageY;
          $(document).mousemove( function(e) { //this anchors the label to the mouse position

             mouseX = e.pageX;
             mouseY = e.pageY;
            if(myBool === true){
              $('.blurb').css('visibility', 'visible').css('top', mouseY).css('left', mouseX).fadeIn('slow').text(myText);
            }
          });
        })
      .on('mouseout', function(d){ //removes hover effects.
        d3.select(this).attr("opacity", 1);
        myBool = false;
          console.log('im out');
          setTimeout(function(){
            $('.blurb').fadeOut('slow').css('visibility','hidden');
          },1500);

        })
      .attr("fill", function(d, i){ return hexColors[i]; })
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .attr('id', function(d, i){ return data.data[i].name;}) //this id is used for mouseover stuff.
      .each(function(d) { //drawing the slice
        this._current = JSON.parse(JSON.stringify(d));
        this._current.endAngle = this._current.startAngle;
      })
      .transition().duration(1000).attrTween("d", makeArcTween(radius));


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
      .style("background-color", function(d, i) { return hexColors[i];}); //TODO fix colors

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
    for (var yr = yearsToLabel[chartParams.startYear]; yr <= yearsToLabel[chartParams.endYear]; yr++ ) { /********************************STARTYEAR AND ENDYEAR********************************//********************************/
      $button = $('<button>').attr('class','yearButton').attr('id', yr).text(yr);
      $buttonDiv.append($button);
    }

    var $buttons = $('.yearButton');

   $('#year').text($($buttons[0]).attr('id'));


  //////////////////////////////////////////
  ///////// autoplay through years /////////
  //////////////////////////////////////////
$('#year').css('display','inline');
$('#pause').css('display','block');
var counter = 0;
 var maxLoops = chartParams.endYear - chartParams.startYear; //we can assume thats the number of years

    (function next() {



            if (counter++ >= maxLoops) return;

            setTimeout(function() {
                $('#year').text(yearsToLabel[chartParams.startYear + counter]); //years[counter] would be replaced by i
                d3.selectAll("path")
                .data(pieCharts[counter])
                .transition().duration(1000).attrTween("d", makeArcTween(radius));

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
        counter = maxLoops +10;
        $($buttons).removeClass('activeButton');
        $(this).addClass('activeButton');
        $('#year').text($(this).attr('id'));
        d3.selectAll("path")
        .data(pieCharts[i]) //this is important*************************************
        .transition().duration(1000).attrTween("d", makeArcTween(radius));
      });
    });
  // });
 ///////////////////////////////////////////////////
 /////////// MEDIA QUERIES RESPONSIVE STUFF /////////////
 ///////////////////////////////////////////////////


  $(window).resize(function(){
    smallPie();
    d3.selectAll("path")
        .data(pieCharts[0])
        .transition().duration(1000).attrTween("d", makeArcTween(radius));
    $('#year').text(yearsToLabel[chartParams.startYear]);
  });

};




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////    ADAPTERS FOR EVERYTHING    //////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
 ///////// ADAPTER FOR OFFENSIVE LANGUAGE //////////
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


 ////////////////////////////////////////////////////////////
 /////////// ADAPTER FOR ABUSE ALLEGATIONS DATA /////////////
 ////////////////////////////////////////////////////////////

var adapterForAbuseOfAuthorityToPie = function(data){


    for(type = 0; type < data.data.length; type++){
      data.data[type].arrOfYearValues = [
         data.data[type]._number_1,
         data.data[type]._number_2,
         data.data[type]._number_3,
         data.data[type]._number_4,
         data.data[type]._number_5
      ];
      numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
      data.data[type].name = data.data[type].type_of_abuse_of_authority_allegation;

    }

};




 /////////////////////////////////////////////////////
 /////////// ADAPTER FOR RACE OF VICTIMS /////////////
 /////////////////////////////////////////////////////

var adapterForRaceOfVictimsToPie = function(data){


    for(type = 0; type < data.data.length; type++){
      data.data[type].arrOfYearValues = [
         data.data[type]._number_1,
         data.data[type]._number_2,
         data.data[type]._number_3,
         data.data[type]._number_4,
         data.data[type]._number_5
      ];
      numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
      data.data[type].name = data.data[type].race;

    }
};


 ///////////////////////////////////////////////////////
 /////////// ADAPTER FOR GENDER OF VICTIMS /////////////
 ///////////////////////////////////////////////////////

var adapterForGenderOfVictimsToPie = function(data){


    for(type = 0; type < data.data.length; type++){
      data.data[type].arrOfYearValues = [
         data.data[type]._number_1,
         data.data[type]._number_2,
         data.data[type]._number_3,
         data.data[type]._number_4,
         data.data[type]._number_5
      ];
      numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
      data.data[type].name = data.data[type].gender;

    }

};

 ///////////////////////////////////////////////////////
 /////////// ADAPTER FOR GENDER OF VICTIMS /////////////
 ///////////////////////////////////////////////////////

var adapterForGenderOfOfficersToPie = function(data){


    for(type = 0; type < data.data.length; type++){
      data.data[type].arrOfYearValues = [
         data.data[type]._number_of_officers_1,
         data.data[type]._number_of_officers_2,
         data.data[type]._number_of_officers_3,
         data.data[type]._number_of_officers_4,
         data.data[type]._number_of_officers_5
      ];

      numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)
      data.data[type].name = data.data[type].gender;

    }

};


///////////////////////////////////////////////////////
///////// ADAPTER FOR REASONS FOR ENCOUNTERS //////////
///////////////////////////////////////////////////////

var adapterForReasonsForEncountersToPie = function(data){
  for(type = 0; type < data.data.length; type++){
    data.data[type].arrOfYearValues = [
       data.data[type]._number_1,
       data.data[type]._number_2,
       data.data[type]._number_3,
       data.data[type]._number_4,
       data.data[type]._number_5
    ];
    numberOfYearsForThisDataset = data.data[type].arrOfYearValues.length; //i didnt use var because i wanted to cheat scope and make this global :-)

    if (data.data[type].name == 'Total') {
      data.data.splice(type, 1);
    } else {
      data.data[type].name = data.data[type].type_of_encounter;
    }
  }
};
