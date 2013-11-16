// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var global_index = 0; // this is so gross -- TODO clean up later

$(document).ready(function(){

  $("#p-slider a").click(function(e){
    var index = parseInt( $(this).attr("href").replace("#", "") );
    activatePaneByIndex( index );
    e.preventDefault();
    return false;
  });

  $(window).keydown(function(e){
    if( e.which == 39 ){
      activatePaneByIndex( global_index + 1 );
    }else if( e.which == 37 ){
      activatePaneByIndex( global_index - 1 );
    }
  });

});


function createRow(years, age, salary){
  var value = 0;
  var flag_fire   = false;
  var flag_1978   = true;
  var flag_2005   = false;
  var max_age     = ( flag_fire ? 55 : 60 );
  var multiplier  = ( flag_fire ? 0.03 : ( flag_2005 ? 0.025 : 0.02 ) );

  var type = "none";
  if( years >= 5  && age >= 60 ) type = "vested";
  if( years >= 10 ) type = "early";
  if( flag_1978 && years >= 25 && ( (flag_fire && age >= 50) || ( !flag_fire && age >= 55) ) ) type = "reduced";
  if( (flag_fire && age >= 55 && years >= 10 ) || (flag_1978 && age >= 60 && years >= 10) ) type = "normal";

  if( type == "normal" ){

    value = multiplier * years * salary;
    if( flag_2005 && (value > (salary * 0.8)) ) value = salary * 0.8;

  }else if( type == "early" ){

    var remainder = max_age - age;
    var x5 = 5;
    var x3 = 0;
    if( remainder < 5 ){
      x5 = remainder;
    }else{
      x3 = remainder - 5;
    }

    value = multiplier * years * salary;
    value = value * ( 1 - ((x5 * 0.06 ) + (x3 * 0.03)) );

  }else if( type == "reduced" ){
    remainder = max_age - age;
    var x = ( flag_fire ? 0.03 : 0.02 ) * remainder;

    value = multiplier * years * salary;
    value = value * (1 - x);
  }else if( type == "vested" ){
    value = multiplier * years * salary;

    if( years < 10 ){
      value = value * ( 0.25 + ( 0.05 * (years - 5) ) );
    }

  }

  return value;


}



function activatePaneByIndex( index ){
  var window_size = $(window).width();
  $("#p-slider").animate({left: "-"+(index * window_size)+"px" }, 400, "linear");
  global_index = index;
}