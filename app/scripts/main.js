/* jshint devel:true */

$(".dropdown-menu li a").click(function(){
  var selectedText = $(this).text();
  var storeIntText = $(this).parents('.btn-group').find('.btn-int > .btn-text').text();

  $(this).html(storeIntText);

  $(this).parents('.btn-group').find('.dropdown-toggle').html('<span class="btn-text selected">' + selectedText + '</span> <span class="caret"></span>');

  // check if both country-group & area-group has selected, clone value to textarea
  if($(this).parents('.btn-group').hasClass('country-group') || $(this).parents('.btn-group').hasClass('area-group')){
  	 cloneToTextArea();
  }

});

$(".country-group > button, .area-group > button").click(function(){

	
});


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
});

$('.btn-int, .check-in, .check-out').click(function(){
	$('.form-bottom').slideDown('fast');
	$('.check-out-button').hide();
});

// $(document).click(function(e) {
//     var target = e.target;

//     if (!$(target).is('.form-group') && !$(target).parents().is('.form-group') && !$(target).is('.datepicker')) {
//         $('.form-bottom').slideUp('fast');
//         $('.form-middle').slideUp('fast');
//         $('.check-out-button').show();
//     }
// });

/* -- DatePicker Function --- */
function days(){
    var a = $(".check-in").datepicker('getDate').getTime(),
        b = $(".check-out").datepicker('getDate').getTime(),
        c = 24*60*60*1000,
        totalNight = Math.round(Math.abs((a - b)/(c)));
    	$('.cal-night').html(totalNight+' NIGHT(S) ');
}


$('.input-daterange').datepicker({
	 format: "dd/mm/yyyy",
     language: "en",
     todayHighlight: true
});

$('.check-in').datepicker().on('changeDate', function(){
	 $('.check-in').datepicker('hide');
     $('.check-out').datepicker('show');
});

$('.check-out').datepicker().on('changeDate', function(){
     $('.check-out').datepicker('hide');	
}).on('hide', function(){
	 // calculate nights
	 days();
});






/* -- END datepicker --- */
