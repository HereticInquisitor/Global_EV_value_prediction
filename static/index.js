!(function ($) {
  "use strict";

  // Nav Menu
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .social-links a, .form button",
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

  //Working on the filteration of options...
  $(document).ready(function () {
    // Define the state and city data
    var Region = {
      Vehicles: [
        "Australia",
        "Austria",
        "Belgium",
        "Brazil",
        "Canada",
        "Chile",
        "China",
        "Denmark",
        "EU27",
        "Europe",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Iceland",
        "India",
        "Israel",
        "Italy",
        "Japan",
        "Korea",
        "Mexico",
        "Netherlands",
        "New Zealand",
        "Norway",
        "Other Europe",
        "Poland",
        "Portugal",
        "Rest of the world",
        "South Africa",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkiye",
        "United Kingdom",
        "USA",
        "World",
      ],
      percent: [
        "Australia",
        "Austria",
        "Belgium",
        "Brazil",
        "Canada",
        "Chile",
        "China",
        "Denmark",
        "EU27",
        "Europe",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Iceland",
        "India",
        "Israel",
        "Italy",
        "Japan",
        "Korea",
        "Mexico",
        "Netherlands",
        "New Zealand",
        "Norway",
        "Other Europe",
        "Poland",
        "Portugal",
        "Rest of the world",
        "South Africa",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkiye",
        "United Kingdom",
        "USA",
        "World",
      ],
      "charging points": [
        "Australia",
        "Austria",
        "Belgium",
        "Brazil",
        "Canada",
        "Chile",
        "China",
        "Denmark",
        "Europe",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Iceland",
        "India",
        "Indonesia",
        "Israel",
        "Italy",
        "Japan",
        "Korea",
        "Mexico",
        "Netherlands",
        "New Zealand",
        "Norway",
        "Poland",
        "Portugal",
        "Rest of the world",
        "South Africa",
        "Spain",
        "Sweden",
        "Switzerland",
        "Thailand",
        "Turkiye",
        "United Kingdom",
        "USA",
        "World",
      ],
      GWh: ["China", "Europe", "India", "Rest of the world", "USA", "World"],
      "Milion barrels per day": [
        "China",
        "Europe",
        "India",
        "Rest of the world",
        "USA",
        "World",
      ],
      "Oil displacement, million lge": [
        "China",
        "Europe",
        "India",
        "Rest of the world",
        "USA",
        "World",
      ],
    };
    var Category = {
      Vehicles: ["Historical", "Projection-STEPS", "Projection-APS"],
      percent: ["Historical", "Projection-APS", "Projection-STEPS"],
      "charging points": ["Historical", "Projection-STEPS"],
      GWh: ["Historical", "Projection-STEPS", "Projection-APS"],
      "Milion barrels per day": [
        "Historical",
        "Projection-APS",
        "Projection-STEPS",
      ],
      "Oil displacement, million lge": [
        "Historical",
        "Projection-APS",
        "Projection-STEPS",
      ],
    };
    var Parameter = {
      Vehicles: ["EV stock", "EV sales"],
      percent: ["EV sales share", "EV stock share"],
      "charging points": ["EV charging points"],
      GWh: ["Electricity demand"],
      "Milion barrels per day": ["Oil displacement Mbd"],
      "Oil displacement, million lge": ["Oil displacement, million lge"],
    };
    var Mode = {
      Vehicles: ["Cars", "Buses", "Vans", "Trucks"],
      percent: ["Cars", "Buses", "Vans", "Trucks"],
      "charging points": ["EV"],
      GWh: ["Buses", "Trucks", "Vans", "Cars"],
      "Milion barrels per day": ["Buses", "Trucks", "Vans", "Cars"],
      "Oil displacement, million lge": ["Buses", "Trucks", "Vans", "Cars"],
    };
    var Powertrain = {
      Vehicles: ["BEV", "PHEV"],
      percent: ["EV"],
      "charging points": ["Publicly available fast", "Publicly available slow"],
      GWh: ["EV"],
      "Milion barrels per day": ["EV"],
      "Oil displacement, million lge": ["EV"],
    };
    var Year = {
      Vehicles: [
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
        2010, 2025, 2030,
      ],
      percent: [
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
        2010, 2025, 2030,
      ],
      "charging points": [
        2017, 2018, 2019, 2020, 2021, 2022, 2011, 2012, 2013, 2014, 2015, 2016,
        2025, 2030, 2010,
      ],
      GWh: [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022, 2025, 2030,
      ],
      "Milion barrels per day": [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022, 2025, 2030,
      ],
      "Oil displacement, million lge": [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
        2022, 2025, 2030,
      ],
    };

    // Function to populate the state dropdown based on the selected country
    $("#unit").change(function () {
      var unit = $(this).val();
      var region = Region[unit];
      var category = Category[unit];
      var parameter = Parameter[unit];
      var mode = Mode[unit];
      var powertrain = Powertrain[unit];
      var year = Year[unit];
      $("#region").empty();
      $("#category").empty();
      $("#parameter").empty();
      $("#mode").empty();
      $("#powertrain").empty();
      $("#year").empty();

      if (region) {
        $.each(region, function (index, region) {
          $("#region").append(
            `<option value="" disabled selected hidden>Select the Region </option>`
          );
          $("#region").append(
            '<option value="' + region + '">' + region + "</option>"
          );
        });
      }
      if (category) {
        $.each(category, function (index, category) {
          $("#category").append(
            `<option value="" disabled selected hidden>Select the Category</option>`
          );
          $("#category").append(
            '<option value="' + category + '">' + category + "</option>"
          );
        });
      }
      if (parameter) {
        $.each(parameter, function (index, parameter) {
          $("#parameter").append(
            `<option value="" disabled selected hidden>Select the Parameter</option>`
          );
          $("#parameter").append(
            '<option value="' + parameter + '">' + parameter + "</option>"
          );
        });
      }
      if (mode) {
        $.each(mode, function (index, mode) {
          $("#mode").append(
            `<option value="" disabled selected hidden>Select the Mode</option>`
          );
          $("#mode").append(
            '<option value="' + mode + '">' + mode + "</option>"
          );
        });
      }
      if (powertrain) {
        $.each(powertrain, function (index, powertrain) {
          $("#powertrain").append(
            `<option value="" disabled selected hidden>Select the Powertrain</option>`
          );
          $("#powertrain").append(
            '<option value="' + powertrain + '">' + powertrain + "</option>"
          );
        });
      }
      if (year) {
        $.each(year, function (index, year) {
          $("#year").append(
            `<option value="" disabled selected hidden>Select the Year</option>`
          );
          $("#year").append(
            '<option value="' + year + '">' + year + "</option>"
          );
        });
      }
    });
  });

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