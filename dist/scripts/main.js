function onGeoSuccess(e) {
    var t = e.address.country,
        n = e.address.city;
    $(".yourcountry").html(t), $(".yourcity").html(n)
}

function onGeoError(e) {
    console.log(e)
}

function passSuccess(e) {
    var t = e.address.country + ", " + e.address.city;
    $(".typeahead").val(t)
}

function cloneToTextArea() {
    var e = $(".country-group").find(".selected").text(),
        t = $(".area-group").find(".selected").text();
    if (e.length) {
        var n = e + ", ";
        $(".extra-input > input").val(n)
    }
    if (t.length) {
        var n = ", " + t;
        $(".extra-input > input").val(n)
    }
    if (e.length && t.length) {
        var n = e + ", " + t;
        $(".extra-input > input").val(n)
    }
}

function days() {
    var e = $(".check-in").datepicker("getDate").getTime(),
        t = $(".check-out").datepicker("getDate").getTime(),
        n = 864e5,
        a = Math.round(Math.abs((e - t) / n));
    $(".cal-night").html(a + " NIGHT(S) ")
}
$("#review-rate").slider({
    id: "review-rate",
    min: 1,
    max: 5,
    range: !0,
    value: [1, 5],
    step: .5
}), $('[data-toggle="tooltip"]').tooltip(), $(".carousel").carousel({
    interval: 1e4
}), $(".helper > span").popover(), $(".alert-show").click(function() {
    $(this).hide()
}), $(".star-blue-group").click(function() {
    $(this).find(".one-star").toggleClass("fade-star")
}), $(".price-group > button").click(function() {
    $(this).toggleClass("active")
}), $("#sign-up-box").modal({
    show: !1
}), $(".sign-up").on("click", function() {
    var e = $(".subscribe-box").val();
    "" != e && ($(".modal-email").html(e), $("#sign-up-box").modal("show"))
}), window.onload = function() {
    geolocator.locateByIP(onGeoSuccess, onGeoError, 0, null)
}, $("input[readonly]").on("focus", function(e) {
    $(this).trigger("blur")
}), $(".language > li > a").click(function() {
    var e = $(this).find("span:eq(0)").attr("class"),
        t = $(this).find("span:eq(1)").text(),
        n = $(".language-initial").find("span:eq(0)").attr("class"),
        a = $(".language-initial").find(".extra-text").text();
    $(this).find("span:eq(0)").removeClass(), $(this).find("span:eq(0)").addClass(n), $(this).find("span:eq(1)").html(a), $(".language-initial").find("span:eq(0)").removeClass(), $(".language-initial").find("span:eq(0)").addClass(e), $(".language-initial").find(".extra-text").html(t), $(".language-initial").attr("aria-expanded", !1), $(".language-wrapper").removeClass("open")
}), $(".dropdown-menu:not(.language) li a").click(function() {
    var e = $(this).text(),
        t = $(this).parents(".btn-group").find(".btn-int > .btn-text").text();
    $(this).html(t), $(this).parents(".btn-group").find(".dropdown-toggle").html('<span class="btn-text selected">' + e + '</span> <span class="caret"></span>'), ($(this).parents(".btn-group").hasClass("country-group") || $(this).parents(".btn-group").hasClass("area-group")) && cloneToTextArea()
});
var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 10,
    prefetch: {
        url: "./scripts/states.json",
        filter: function(e) {
            return $.map(e, function(e) {
                return {
                    name: e
                }
            })
        }
    }
});
countries.initialize(), $(".typeahead").typeahead({
    hint: !0,
    highlight: !0,
    minLength: 1
}, {
    name: "countries",
    displayKey: "name",
    source: countries.ttAdapter()
}), $(".extra p").click(function() {
    $(".form-middle").slideToggle("fast");
    var e = $(".extra-symbol").text();
    $(".extra-symbol").html("+" == e ? "-" : "+"), $(".form-bottom").slideDown("fast"), $(".check-out-button").hide(), $(".bottom-out").show()
}), $(".btn-int, .check-in, .check-out").click(function() {
    $(".form-bottom").slideDown("fast"), $(".check-out-button").hide(), $(".bottom-out").show()
});
var dateToday = new Date;
$(".input-daterange").datepicker({
    format: "dd/mm/yyyy",
    language: "en",
    startDate: dateToday
}), $(".check-in").datepicker().on("changeDate", function() {
    $(".check-in").datepicker("hide"), $(".check-out").datepicker("show")
}).on("hide", function() {
    $(".datepicker-opened").hide()
}).on("show", function() {
    $(".datepicker-opened").show()
}).on("clearDate", function() {
    $(".datepicker-opened").hide()
}), $(".check-out").datepicker().on("changeDate", function() {
    $(".check-out").datepicker("hide")
}).on("hide", function() {
    days(), $(".datepicker-opened").hide(), $(".datepicker").removeClass("datepicker-checkout")
}).on("show", function() {
    $(".datepicker").addClass("datepicker-checkout"), $(".datepicker-opened").show()
}).on("clearDate", function() {
    $(".datepicker-opened").hide()
}), $(".check-in").on("click", function() {
    $("html,body").animate({
        scrollTop: "0"
    })
}), $(".glyphicon-screenshot").on("click", function() {
    geolocator.locateByIP(passSuccess, onGeoError, 2, null)
});
