
function activate(obj) {
    if(obj.value == "https://data.cityofnewyork.us/resource/7r8u-zrb7.json"){
      $('.yearLabel').removeClass('hideMe');
      $('.year2009').addClass('hideMe');
      $('.year2012').removeClass('hideMe');
    } else {
      $('.yearLabel').removeClass('hideMe');
      $('.year2009').removeClass('hideMe');
      $('.year2012').addClass('hideMe');
    }
}

function activate2(obj) {
  if(obj.value =='https://data.cityofnewyork.us/resource/7r8u-zrb7.json'){
    $('.yearLabel').removeClass('hideMe');
    $('.year20092').addClass('hideMe');
    $('.year20122').removeClass('hideMe');
  } else {
    $('.yearLabel').removeClass('hideMe');
    $('.year20092').removeClass('hideMe');
    $('.year20122').addClass('hideMe');
  }
}

function activate3(obj) {
  if(obj.value =='https://data.cityofnewyork.us/resource/7r8u-zrb7.json'){
    $('.yearLabel').removeClass('hideMe');
    $('.year20093').addClass('hideMe');
    $('.year20123').removeClass('hideMe');
  } else {
    $('.yearLabel').removeClass('hideMe');
    $('.year20093').removeClass('hideMe');
    $('.year20123').addClass('hideMe');
  }
}


$('.fa-pie-chart').on('click', function(){
  $('.chooseGraph').text('Choose a dataset, colorscheme and timespan')
  $('i').addClass('hideMe');
  $('.pieForm').removeClass('hideMe');
})



$('.fa-line-chart').on('click', function(){
  $('.chooseGraph').text('Choose a dataset, colorscheme and timespan')
  $('i').addClass('hideMe');
  $('.timeSeriesForm').removeClass('hideMe');
})


$('.fa-bar-chart').on('click', function(){
  $('.chooseGraph').text('Choose a dataset, colorscheme and timespan')
  $('i').addClass('hideMe');
  $('.barForm').removeClass('hideMe');
})

$('.pieForm .submit').on('click', function(){
  $('.pieForm').addClass('hideMe');
  $('.chooseGraph').addClass('hideMe');
  $('.arrow').addClass('hideMe');
  $('.save').removeClass('hideMe');
  $('.back').removeClass('hideMe');
})
$('.timeSeriesForm .submit').on('click', function(){
  $('.timeSeriesForm').addClass('hideMe');
  $('.chooseGraph').addClass('hideMe');
  $('.arrow').addClass('hideMe');
  $('.save').removeClass('hideMe');
  $('.back').removeClass('hideMe');

})
$('.barForm .submit').on('click', function(){
  $('.barForm').addClass('hideMe');
  $('.chooseGraph').addClass('hideMe');
  $('.arrow').addClass('hideMe');
  $('.save').removeClass('hideMe');
  $('.back').removeClass('hideMe');

})

function year2012ValidationPie(obj){

  if(obj.value == '0'){
    console.log('mew');
    }else if(obj.value == '1'){
      $('#20120').attr('disabled',true);
    }else if(obj.value == '2'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
    }else if(obj.value == '3'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
    }else if(obj.value == '4'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
    }else if(obj.value == '5'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
      $('#20124').attr('disabled',true);
    }else if(obj.value == '6'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
      $('#20124').attr('disabled',true);
      $('#20125').attr('disabled',true);
    }else if(obj.value == '7'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
      $('#20124').attr('disabled',true);
      $('#20125').attr('disabled',true);
      $('#20126').attr('disabled',true);
    }else if(obj.value == '8'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
      $('#20124').attr('disabled',true);
      $('#20125').attr('disabled',true);
      $('#20126').attr('disabled',true);
      $('#20127').attr('disabled',true);
    }else if(obj.value == '9'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
      $('#20124').attr('disabled',true);
      $('#20125').attr('disabled',true);
      $('#20126').attr('disabled',true);
      $('#20127').attr('disabled',true);
      $('#20128').attr('disabled',true);
    }else if(obj.value == '10'){
      $('#20120').attr('disabled',true);
      $('#20121').attr('disabled',true);
      $('#20122').attr('disabled',true);
      $('#20123').attr('disabled',true);
      $('#20124').attr('disabled',true);
      $('#20125').attr('disabled',true);
      $('#20126').attr('disabled',true);
      $('#20127').attr('disabled',true);
      $('#20128').attr('disabled',true);
      $('#20129').attr('disabled',true);
    }
}

function year2009ValidationPie(obj){

  if(obj.value == '0'){
    console.log('mew');
    }else if(obj.value == '1'){
      $('#20090').attr('disabled',true);
    }else if(obj.value == '2'){
      $('#20090').attr('disabled',true);
      $('#20091').attr('disabled',true);
    }else if(obj.value == '3'){
      $('#20090').attr('disabled',true);
      $('#20091').attr('disabled',true);
      $('#20092').attr('disabled',true);
    }else if(obj.value == '4'){
      $('#20090').attr('disabled',true);
      $('#20091').attr('disabled',true);
      $('#20092').attr('disabled',true);
      $('#20093').attr('disabled',true);
    }
  // console.log($('.year2012 .two option:nth-child(n +'x')')));

}
//////////////////////////////////////////////
/////////     timeSeries   ///////////////////
//////////////////////////////////////////////


function year2012ValidationTime(obj){

  if(obj.value == '0'){
    console.log('mew');
    }else if(obj.value == '1'){
      $('#20120time').attr('disabled',true);
    }else if(obj.value == '2'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
    }else if(obj.value == '3'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
    }else if(obj.value == '4'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
    }else if(obj.value == '5'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
      $('#20124time').attr('disabled',true);
    }else if(obj.value == '6'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
      $('#20124time').attr('disabled',true);
      $('#20125time').attr('disabled',true);
    }else if(obj.value == '7'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
      $('#20124time').attr('disabled',true);
      $('#20125time').attr('disabled',true);
      $('#20126time').attr('disabled',true);
    }else if(obj.value == '8'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
      $('#20124time').attr('disabled',true);
      $('#20125time').attr('disabled',true);
      $('#20126time').attr('disabled',true);
      $('#20127time').attr('disabled',true);
    }else if(obj.value == '9'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
      $('#20124time').attr('disabled',true);
      $('#20125time').attr('disabled',true);
      $('#20126time').attr('disabled',true);
      $('#20127time').attr('disabled',true);
      $('#20128time').attr('disabled',true);
    }else if(obj.value == '10'){
      $('#20120time').attr('disabled',true);
      $('#20121time').attr('disabled',true);
      $('#20122time').attr('disabled',true);
      $('#20123time').attr('disabled',true);
      $('#20124time').attr('disabled',true);
      $('#20125time').attr('disabled',true);
      $('#20126time').attr('disabled',true);
      $('#20127time').attr('disabled',true);
      $('#20128time').attr('disabled',true);
      $('#20129time').attr('disabled',true);
    }
  // console.log($('.year2012 .two option:nth-child(n +'x')')));

}

function year2009ValidationTime(obj){

  if(obj.value == '0'){
    console.log('mew');
    }else if(obj.value == '1'){
      $('#20090time').attr('disabled',true);
    }else if(obj.value == '2'){
      $('#20090time').attr('disabled',true);
      $('#20091time').attr('disabled',true);
    }else if(obj.value == '3'){
      $('#20090time').attr('disabled',true);
      $('#20091time').attr('disabled',true);
      $('#20092time').attr('disabled',true);
    }else if(obj.value == '4'){
      $('#20090time').attr('disabled',true);
      $('#20091time').attr('disabled',true);
      $('#20092time').attr('disabled',true);
      $('#20093time').attr('disabled',true);
    }
  // console.log($('.year2012 .two option:nth-child(n +'x')')));

}
//////////////////////////////////////////////
/////////     BarCHART     ///////////////////
//////////////////////////////////////////////


function year2012ValidationBar(obj){

  if(obj.value == '0'){
    console.log('mew');
    }else if(obj.value == '1'){
      $('#20120bar').attr('disabled',true);
    }else if(obj.value == '2'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
    }else if(obj.value == '3'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
    }else if(obj.value == '4'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
    }else if(obj.value == '5'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
      $('#20124bar').attr('disabled',true);
    }else if(obj.value == '6'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
      $('#20124bar').attr('disabled',true);
      $('#20125bar').attr('disabled',true);
    }else if(obj.value == '7'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
      $('#20124bar').attr('disabled',true);
      $('#20125bar').attr('disabled',true);
      $('#20126bar').attr('disabled',true);
    }else if(obj.value == '8'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
      $('#20124bar').attr('disabled',true);
      $('#20125bar').attr('disabled',true);
      $('#20126bar').attr('disabled',true);
      $('#20127bar').attr('disabled',true);
    }else if(obj.value == '9'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
      $('#20124bar').attr('disabled',true);
      $('#20125bar').attr('disabled',true);
      $('#20126bar').attr('disabled',true);
      $('#20127bar').attr('disabled',true);
      $('#20128bar').attr('disabled',true);
    }else if(obj.value == '10'){
      $('#20120bar').attr('disabled',true);
      $('#20121bar').attr('disabled',true);
      $('#20122bar').attr('disabled',true);
      $('#20123bar').attr('disabled',true);
      $('#20124bar').attr('disabled',true);
      $('#20125bar').attr('disabled',true);
      $('#20126bar').attr('disabled',true);
      $('#20127bar').attr('disabled',true);
      $('#20128bar').attr('disabled',true);
      $('#20129bar').attr('disabled',true);
    }
  // console.log($('.year2012 .two option:nth-child(n +'x')')));

}

function year2009ValidationBar(obj){

  if(obj.value == '0'){
    console.log('mew');
    }else if(obj.value == '1'){
      $('#20090bar').attr('disabled',true);
    }else if(obj.value == '2'){
      $('#20090bar').attr('disabled',true);
      $('#20091bar').attr('disabled',true);
    }else if(obj.value == '3'){
      $('#20090bar').attr('disabled',true);
      $('#20091bar').attr('disabled',true);
      $('#20092bar').attr('disabled',true);
    }else if(obj.value == '4'){
      $('#20090bar').attr('disabled',true);
      $('#20091bar').attr('disabled',true);
      $('#20092bar').attr('disabled',true);
      $('#20093bar').attr('disabled',true);
    }
  // console.log($('.year2012 .two option:nth-child(n +'x')')));

}

function showSubmitTime(){
  $('.timeSeriesForm .submit').removeClass('hideMe');
}

function showSubmitPie(){
  $('.pieForm .submit').removeClass('hideMe');
}
function showSubmitBar(){
  $('.barForm .submit').removeClass('hideMe');
}
