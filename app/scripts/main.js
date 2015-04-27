/* jshint devel:true */

/* Initiate Carousel Slider */
$('.carousel').carousel({
	interval: 10000
});



//*---- START GEOLOCATION PLUGIN -----*//

	//The callback function executed when the location is fetched successfully.
    function onGeoSuccess(location) {
        var strLocation = location.address.country;
        var strCity = location.address.city;
        $('.yourcountry').html(strLocation);
        $('.yourcity').html(strCity);

    }
	//The callback function executed when the location could not be fetched.
    function onGeoError(error) {
        console.log(error);
    }


    function passSuccess(location){
        var temp_location = location.address.country + ', ' + location.address.city;
    	// Insert to input text search
		$('.typeahead').val(temp_location);
    }


// Run on window loads
window.onload = function () {
	geolocator.locateByIP(onGeoSuccess, onGeoError, 2, null);
}

//*---- END GEOLOCATION PLUGIN -----*//


/* Disable input typing on mobile */
$('input[readonly]').on('focus', function(ev) {
    $(this).trigger('blur');
 });


$('.language > li > a').click(function(){
	var get_lang_flag = $(this).find('span:eq(0)').attr('class');
	var get_lang_text = $(this).find('span:eq(1)').text();
	var temp_init_flag = $('.language-initial').find('span:eq(0)').attr('class');
	var temp_init_text = $('.language-initial').find('.extra-text').text();

	
	$(this).find('span:eq(0)').removeClass();
	$(this).find('span:eq(0)').addClass(temp_init_flag);
	$(this).find('span:eq(1)').html(temp_init_text);

	$('.language-initial').find('span:eq(0)').removeClass();
	$('.language-initial').find('span:eq(0)').addClass(get_lang_flag);
	$('.language-initial').find('.extra-text').html(get_lang_text);




	$('.language-initial').attr('aria-expanded', false);
	$('.language-wrapper').removeClass('open');

});


$(".dropdown-menu:not(.language) li a").click(function(){
  var selectedText = $(this).text();
  var storeIntText = $(this).parents('.btn-group').find('.btn-int > .btn-text').text();

  $(this).html(storeIntText);

  $(this).parents('.btn-group').find('.dropdown-toggle').html('<span class="btn-text selected">' + selectedText + '</span> <span class="caret"></span>');

  // check if both country-group & area-group has selected, clone value to textarea
  if($(this).parents('.btn-group').hasClass('country-group') || $(this).parents('.btn-group').hasClass('area-group')){
  	 cloneToTextArea();
  }

});

/* ---- Start Autocomplete 'Typeahead' --> For sample go to (http://twitter.github.io/typeahead.js/examples/) ---- */
var countries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 10,
  prefetch: {
    // url points to a json file that contains an array of country names, see
    url: '/scripts/states.json',
    // the json file contains an array of strings, but the Bloodhound
    // suggestion engine expects JavaScript objects so this converts all of
    // those strings
    filter: function(list) {
      return $.map(list, function(country) { return { name: country }; });
    }
  }
});

// kicks off the loading/processing of `local` and `prefetch`
countries.initialize();

$('.typeahead').typeahead({
	hint:true,
	highlight:true,
	minLength: 1
},
{
  name: 'countries',
  displayKey: 'name',
  source: countries.ttAdapter()
});
/* ---- END Autocomplete 'Typeahead' ----- */

function cloneToTextArea(){
	var countryText = $(".country-group").find('.selected').text();
	var areaText = $(".area-group").find('.selected').text();
	
	
	if(countryText.length){
		var totalText = countryText + ', ';
		$('.extra-input > input').val(totalText);
	}

	if(areaText.length){
		var totalText = ', ' + areaText;
		$('.extra-input > input').val(totalText);
	}

	if(countryText.length && areaText.length){
		var totalText = countryText + ', ' + areaText;
		$('.extra-input > input').val(totalText);
	}

}




$('.extra p').click(function(){
	$('.form-middle').slideToggle('fast');
	var symbol = $('.extra-symbol').text();
	if(symbol == "+"){
		$('.extra-symbol').html('-');
	}else{
		$('.extra-symbol').html('+');
	}
	$('.form-bottom').slideDown('fast');
	$('.check-out-button').hide();
	$('.bottom-out').show();
});

$('.btn-int, .check-in, .check-out').click(function(){
	$('.form-bottom').slideDown('fast');
	$('.check-out-button').hide();
	$('.bottom-out').show();
});

/* -- DatePicker Function --- */
function days(){
    var a = $(".check-in").datepicker('getDate').getTime(),
        b = $(".check-out").datepicker('getDate').getTime(),
        c = 24*60*60*1000,
        totalNight = Math.round(Math.abs((a - b)/(c)));
    	$('.cal-night').html(totalNight+' NIGHT(S) ');
}

var dateToday = new Date();
$('.input-daterange').datepicker({
	 format: "dd/mm/yyyy",
     language: "en",
     startDate: dateToday
});

$('.check-in').datepicker().on('changeDate', function(){
	 $('.check-in').datepicker('hide');
     $('.check-out').datepicker('show');
}).on('hide', function(){
	$('.datepicker-opened').hide();
}).on('show', function(){
	$('.datepicker-opened').show();
}).on('clearDate', function(){
	$('.datepicker-opened').hide();
});

$('.check-out').datepicker().on('changeDate', function(){
     $('.check-out').datepicker('hide');	
}).on('hide', function(){
	 // calculate nights
	 days();
	 $('.datepicker-opened').hide();
	 $('.datepicker').removeClass('datepicker-checkout');
}).on('show', function(){
	$('.datepicker').addClass('datepicker-checkout');
	$('.datepicker-opened').show();
}).on('clearDate', function(){
	$('.datepicker-opened').hide();
});


$('.check-in').on('click', function(){
	$('html,body').animate({ scrollTop: "0" });
});


$('.glyphicon-screenshot').on('click', function(){
    // Get Current Country and City
	geolocator.locateByIP(passSuccess, onGeoError, 2, null);

});


/* -- END datepicker --- */
