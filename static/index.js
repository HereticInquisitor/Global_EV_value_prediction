!(function ($) {
  "use strict";

  // Nav Menu
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .social-links a",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var hash = this.hash;
        var target = $(hash);
        if (target.length) {
          e.preventDefault();

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if (hash == "#header") {
            $("#header").removeClass("header-top");
            $("section").removeClass("section-show");
            if ($("body").hasClass("mobile-nav-active")) {
              $("body").removeClass("mobile-nav-active");
              $(".mobile-nav-toggle i").toggleClass(
                "icofont-navigation-menu icofont-close"
              );
              $(".mobile-nav-overly").fadeOut();
            }
            return;
          }

          if (!$("#header").hasClass("header-top")) {
            $("#header").addClass("header-top");
            setTimeout(function () {
              $("section").removeClass("section-show");
              $(hash).addClass("section-show");
            }, 350);
          } else {
            $("section").removeClass("section-show");
            $(hash).addClass("section-show");
          }

          $("html, body").animate(
            {
              scrollTop: 0,
            },
            350
          );

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }

          return false;
        }
      }
    }
  );

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $("#header").addClass("header-top");
      $(".nav-menu .active, .mobile-nav .active").removeClass("active");
      $(".nav-menu, .mobile-nav")
        .find('a[href="' + initial_nav + '"]')
        .parent("li")
        .addClass("active");
      setTimeout(function () {
        $("section").removeClass("section-show");
        $(initial_nav).addClass("section-show");
      }, 350);
    }
  }

  // $(document).ready(function () {
  //   $(".form").submit(function (event) {
  //     event.preventDefault();
  //     var selectedSection = $("#valuePred")[0];
  //     selectedSection.scrollIntoView({ behavior: "smooth" });
  //   });
  // });

  //Getting the name for prediction_page
  $(document).ready(function () {
    $("#btn").click(function () {
      var userName = $("#inputValue").val();
      $("#username").html("Welcome " + userName);
    });
  });

  //Handling behaviour of form
  var i = 0;
  $(document).ready(function () {
    $("select").change(function () {
      const selectedValue = $(this).val(); // Get the selected value
      const fieldName = $(this).attr("name"); // Get the name of the select field
      const modifiedText =
        fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      i++;
      $(`.${fieldName}op`).removeClass(`${fieldName}op`);
      // Display the selected value
      $(`#${fieldName}img`).attr(
        "src",
        `static/img/${fieldName}/${selectedValue}.png`
      );
      $(`#${fieldName}h3`).html(`${modifiedText}: ${selectedValue}`);
    });
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });
})(jQuery);
