$("#review-rate").slider({ id: "review-rate", min: 1, max: 5, range: true, value: [1, 5], step: 0.5 });

$('[data-toggle="tooltip"]').tooltip();

$('.carousel').carousel({
    interval: 10000
});

$('.helper > span').popover();

$('.alert-show').click(function(){
    $(this).hide();
});

$('.star-blue-group').click(function(){

    $(this).find('.one-star').toggleClass('fade-star');

    // $('.one-star').addClass('fade-star');

    // if($(this).find('.one-star').hasClass('one-rate')){
    //     $('.one-rate').removeClass('fade-star');
    // }else if($(this).find('.one-star').hasClass('two-rate')){
    //     $('.one-rate').removeClass('fade-star');
    //     $('.two-rate').removeClass('fade-star');
    // }else if($(this).find('.one-star').hasClass('three-rate')){
    //     $('.one-rate').removeClass('fade-star');
    //     $('.two-rate').removeClass('fade-star');
    //     $('.three-rate').removeClass('fade-star');
    // }else if($(this).find('.one-star').hasClass('four-rate')){
    //     $('.one-rate').removeClass('fade-star');
    //     $('.two-rate').removeClass('fade-star');
    //     $('.three-rate').removeClass('fade-star');
    //     $('.four-rate').removeClass('fade-star');
    // }else if($(this).find('.one-star').hasClass('five-rate')){
    //     $('.one-rate').removeClass('fade-star');
    //     $('.two-rate').removeClass('fade-star');
    //     $('.three-rate').removeClass('fade-star');
    //     $('.four-rate').removeClass('fade-star');
    //     $('.five-rate').removeClass('fade-star');
    // }
    
});

$('.price-group > button').click(function(){
     $(this).toggleClass('active');
});


//  $('.sign-up').on('click', function (ev) {
//         // ev.preventDefault();
//         // if($('.subscribe-box').val() != ""){
//         //     $("#sign-up-box").modal("hide");
//         // }else{
//         //      $("#sign-up-box").load(target, function () {
//         //         $("#sign-up-box").modal("show");
//         //     });
//         // }
       
        
// });
$('#sign-up-box').modal({ show: false});

$('.sign-up').on('click', function(){
    var temp_email = $('.subscribe-box').val();
    if(temp_email != ""){
        $('.modal-email').html(temp_email);
        $('#sign-up-box').modal('show');
    }else{
        // do nothing
    }
});


function onGeoSuccess(location) {
    var strLocation = location.address.country;
    var strCity = location.address.city;

 
    $('.yourcountry').html(strLocation);
    $('.yourcity').html(strCity);
}

function onGeoError(error) {
    console.log(error);
}


function passSuccess(location) {
    var temp_location = location.address.country + ', ' + location.address.city;
    // Insert to input text search
    $('.typeahead').val(temp_location);
}


window.onload = function() {
    geolocator.locateByIP(onGeoSuccess, onGeoError, 0, null);
}



$('input[readonly]').on('focus', function(ev) {
    $(this).trigger('blur');
});


$('.language > li > a').click(function() {
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


$(".dropdown-menu:not(.language) li a").click(function() {
    var selectedText = $(this).text();
    var storeIntText = $(this).parents('.btn-group').find('.btn-int > .btn-text').text();

    $(this).html(storeIntText);

    $(this).parents('.btn-group').find('.dropdown-toggle').html('<span class="btn-text selected">' + selectedText + '</span> <span class="caret"></span>');

    if ($(this).parents('.btn-group').hasClass('country-group') || $(this).parents('.btn-group').hasClass('area-group')) {
        cloneToTextArea();
    }

});

var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 10,
    prefetch: {
        url: './scripts/states.json',
        filter: function(list) {
            return $.map(list, function(country) {
                return {
                    name: country
                };
            });
        }
    }
});

countries.initialize();

$('.typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
}, {
    name: 'countries',
    displayKey: 'name',
    source: countries.ttAdapter()
});

function cloneToTextArea() {
    var countryText = $(".country-group").find('.selected').text();
    var areaText = $(".area-group").find('.selected').text();


    if (countryText.length) {
        var totalText = countryText + ', ';
        $('.extra-input > input').val(totalText);
    }

    if (areaText.length) {
        var totalText = ', ' + areaText;
        $('.extra-input > input').val(totalText);
    }

    if (countryText.length && areaText.length) {
        var totalText = countryText + ', ' + areaText;
        $('.extra-input > input').val(totalText);
    }

}




$('.extra p').click(function() {
    $('.form-middle').slideToggle('fast');
    var symbol = $('.extra-symbol').text();
    if (symbol == "+") {
        $('.extra-symbol').html('-');
    } else {
        $('.extra-symbol').html('+');
    }
    $('.form-bottom').slideDown('fast');
    $('.check-out-button').hide();
    $('.bottom-out').show();
});

$('.btn-int, .check-in, .check-out').click(function() {
    $('.form-bottom').slideDown('fast');
    $('.check-out-button').hide();
    $('.bottom-out').show();
});

/* -- DatePicker Function --- */
function days() {
    var a = $(".check-in").datepicker('getDate').getTime(),
        b = $(".check-out").datepicker('getDate').getTime(),
        c = 24 * 60 * 60 * 1000,
        totalNight = Math.round(Math.abs((a - b) / (c)));
    $('.cal-night').html(totalNight + ' NIGHT(S) ');
}

var dateToday = new Date();
$('.input-daterange').datepicker({
    format: "dd-mm-yyyy",
    language: "en",
    startDate: dateToday
});

$('.check-in').datepicker().on('changeDate', function() {
    $('.check-in').datepicker('hide');
    $('.check-out').datepicker('show');
}).on('hide', function() {
    $('.datepicker-opened').hide();
}).on('show', function() {
    $('.datepicker-opened').show();
}).on('clearDate', function() {
    $('.datepicker-opened').hide();
});

$('.check-out').datepicker().on('changeDate', function() {
    $('.check-out').datepicker('hide');
}).on('hide', function() {
    // calculate nights
    days();
    $('.datepicker-opened').hide();
    $('.datepicker').removeClass('datepicker-checkout');
}).on('show', function() {
    $('.datepicker').addClass('datepicker-checkout');
    $('.datepicker-opened').show();
}).on('clearDate', function() {
    $('.datepicker-opened').hide();
});


$('.check-in').on('click', function() {
    $('html,body').animate({
        scrollTop: "0"
    });
});


$('.glyphicon-screenshot').on('click', function() {
    geolocator.locateByIP(passSuccess, onGeoError, 2, null);

});
