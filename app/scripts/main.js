/* jshint devel:true */

$(".dropdown-menu li a").click(function(){
  var selectedText = $(this).text();
  var storeIntText = $(this).parents('.btn-group').find('.btn-int').text();

  $(this).html(storeIntText);

  $(this).parents('.btn-group').find('.dropdown-toggle').html('<span class="btn-text">' + selectedText + '</span> <span class="caret"></span>');
});


$('.extra p').click(function(){
	$('.form-middle').slideToggle({
		direction: "up"
	});
});

$('.btn-int').click(function(){
	$('.form-bottom').slideDown();
});