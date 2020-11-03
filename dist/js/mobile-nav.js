(function ($) {
    "use strict";

    // Mobile Navigation
    if ($(".navigation").length) {
        var $mobile_nav = $(".navigation").clone().prop({
            class: "mobile-nav d-lg-none",
        });
        $("body").append($mobile_nav);
        $("body").append(
            '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars" ></i></button>'
        );
        $("body").append('<div class="mobile-nav-overly"></div>');

        $(document).on("click", ".mobile-nav-toggle", function (e) {
            $("body").toggleClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
            $(".mobile-nav-overly").toggle();
        });

        $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass("active");
        });

        //- Close the nav when clicked outside
        $(document).on("click", function (e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
                    $(".mobile-nav-overly").fadeOut();
                }
            }
        });

        $(".mobile-nav").on("click", function (e) {
            if (e.target.tagName === "A") {
                $("body").removeClass("mobile-nav-active");
                $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
                $(".mobile-nav-overly").fadeOut();
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }
})(jQuery);

var nav_sections = $("section");
var main_nav = $(".navigation, .mobile-nav");
var main_nav_height = $("#header").outerHeight();

$(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
        var top = $(this).offset().top - main_nav_height,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            main_nav.find("li").removeClass("active");
            main_nav
                .find('a[href="#' + $(this).attr("id") + '"]')
                .parent("li")
                .addClass("active");
        }
    });
});
$(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
        $("#header").addClass("header-scrolled");
    } else {
        $("#header").removeClass("header-scrolled");
    }
});

// const el = document.querySelector('[data-toggle="counter-up"]');

// // Start counting, do this on DOM ready or with Waypoints.
// counterUp(el, {
//     duration: 1000,
//     delay: 10,
// });
