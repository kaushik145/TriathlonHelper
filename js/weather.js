$(document).ready(function(parsed_json){
 

$("#zipCode").on('click', function(e){
	e.preventDefault()
 var userInput = $('#user-input').val();
              console.log(userInput);// to check the value of user input
 var queryURL = "http://api.wunderground.com/api/e61c32a81cbe10bc/forecast10day/q/"+userInput+".json";
var q2Url="http://api.wunderground.com/api/e61c32a81cbe10bc/hourly/q/22202.json";
    console.log(queryURL)
       weather(userInput,queryURL);
       Hourlyweather(q2Url);
  

// end weather click function
      });

// main left area

function MainLeftDisplay(parsed_json){


       $('#location').html('City State');
       $('#cCondition').html(parsed_json.forecast.simpleforecast.forecastday[0].conditions);
       $('#aveHumidity').html(parsed_json.forecast.simpleforecast.forecastday[0].avehumidity+'%');
       $('#forcastDay').html(parsed_json.forecast.txt_forecast.forecastday[0].fcttext);

 
      };




function weekDispaly(parsed_json){
	for(i=0;i<10;i++){
	     var x=i+1;
   $('#r'+x+'c1').append(parsed_json.forecast.txt_forecast.forecastday[(i*2)].title);  // current day
   $('#r'+x+'c2').attr("src",parsed_json.forecast.simpleforecast.forecastday[i].icon_url); // icon for weather 
   $('#r'+x+'c3').append(parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit+'°'); // Highest temp
   $('#r'+x+'c4').append(parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit+'°') //LowestTemp
      x++;    
	}
}

var tAverage=0; 
function avTemp(parsed_json){

	    for(i=0;i<10;i++){
		  var x=i+1;
      var hTemp=parseInt((parsed_json.forecast.simpleforecast.forecastday[i].high.fahrenheit)); // Highest temp
      var lTemp=parseInt((parsed_json.forecast.simpleforecast.forecastday[i].low.fahrenheit)); //LowestTemp
      tAverage =(hTemp+lTemp)/2;
     console.log("hight"+hTemp);
      console.log("ltemp"+lTemp);
      console.log(tAverage);
         x++
	};

};

var activityArray=['Bike Trails','Running Paths', 'Open Swim', 'Indoor Swim'];

// the main function to display the weekly weather 
function weather(userInput,queryURL){
  if(userInput !== "" && userInput.length === 5){
  $.ajax({
  url : queryURL,
  dataType : "jsonp",
  success : function(parsed_json) {
           console.log(parsed_json)
               MainLeftDisplay(parsed_json); // display the right side
              weekDispaly(parsed_json);  // display the left side
              avTemp(parsed_json);  

            }
       });

           } else {
            $('#error').html('please enter a valid ZipCode');
            }
            $('#user-input').val("");
       
        
   // end function weather
 };

function Hourlyweather(q2Url){
 
  $.ajax({
  url : q2Url,
 dataType : "jsonp",
  success:function(response){
       
           console.log('Hourly'+response);
           currentHouer(response);
                
           }
    
      });
           
       
     
   // end function hourlyweather
 };

  function currentHouer(response){
   var d = new Date();
    var n = d.getHours();

   
  }



// end for documment. ready
});



