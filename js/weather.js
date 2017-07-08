$(document).ready(function(){
 
  
  
$("#zipCode").on('click', function(e){
	e.preventDefault()
 var userInput = $('#user-input').val();

 console.log(userInput)
 console.log(userInput);
 var queryURL = "http://api.wunderground.com/api/e61c32a81cbe10bc/forecast10day/q/"+userInput+".json";

    console.log(queryURL)
  if(userInput !== "" && userInput.length === 5){

    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 1000);

  $.ajax({
  url : queryURL,
  dataType : "jsonp",
  success : function(parsed_json) {
    		   console.log(parsed_json)
    		 MainLeftDisplay(parsed_json); // display the right side
    		 // weekDays(parsed_json);
           weekDispaly(parsed_json);  // display the left side
           tempAverage();
      }
 });

} else {
  	$('#error').html('please enter a valid ZipCode');
  }
  $('#user-input').val("");
  // end weather click function
});




function MainLeftDisplay(parsed_json){

// main left area

// $('#location').html('City State');
$('#cCondition').html(parsed_json.forecast.simpleforecast.forecastday["0"].conditions);
$('#aveHumidity').html(parsed_json.forecast.simpleforecast.forecastday["0"].avehumidity+'%');
 $('#forcastDay').html(parsed_json.forecast.txt_forecast.forecastday["0"].fcttext);

 

}



function weekDispaly(parsed_json){
	for(i=0;i<=10;i++){
		var x=i+1;
   $('#r'+x+'c1').append(parsed_json.forecast.simpleforecast.forecastday[i].date.weekday);  // current day
   $('#r'+x+'c2').attr("src",parsed_json.forecast.simpleforecast.forecastday[i].icon_url); // icon for weather 
   $('#r'+x+'c3').append(parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit+'°'); // Highest temp
   $('#r'+x+'c4').append(parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit+'°') //LowestTemp
   x++;
	}
}

var tAverage=0; 
function tempAverage(){

	alert('am here');
	for(x=0;x<=10;x++){
		
  
  var hTemp= $('#r'+x+'c3').val(); // Highest temp
  var lTemp=$('#r'+x+'c4').val(); //LowestTemp
   tAverage=parseInt((hTemp+lTemp)/2);
   console.log(tAverage)
	}

}
// end for documment. ready
});


