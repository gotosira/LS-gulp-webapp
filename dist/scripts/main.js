$(".dropdown-menu li a").click(function(){var t=$(this).text(),n=$(this).parents(".btn-group").find(".btn-int").text();$(this).html(n),$(this).parents(".btn-group").find(".dropdown-toggle").html(t+' <span class="caret"></span>')});