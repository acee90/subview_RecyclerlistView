$(document).ready(function() {


  // POPUP CLOSE
  $(".hm-popup .btn-close").on("click", function() {
    $(this).parents(".hm-popup").stop().fadeOut();
  });

  // ROOM TOP BUTTON
  $(".btn-info-entry").on("click", function() {
    if($(".room-partiList").hasClass("show")) {
      $(this).removeClass("on");
      $(".room-partiList").removeClass("show");
    } else {
      $(this).addClass("on");
      $(".room-partiList").addClass("show");
    }
  });
  $(".partiList-close").on("click", function() {
    $(".btn-info-entry").removeClass("on");
    $(".room-partiList").removeClass("show");
  });

  $(".btn-info-room").on("click", function() {
    if($("#popup-set").hasClass("show")) {
      $(this).removeClass("on");
      $("#popup-set").stop().fadeOut("fast").removeClass("show");
    } else {
      $(this).addClass("on");
      $("#popup-set").stop().fadeIn("fast").addClass("show");
    }
  });

  $(".btn-set").on("click", function() {
    if($("#popup-info-room").hasClass("show")) {
      $(this).removeClass("on");
      $("#popup-info-room").stop().fadeOut("fast").removeClass("show");
    } else {
      $(this).addClass("on");
      $("#popup-info-room").stop().fadeIn("fast").addClass("show");
    }
  });


  // ROOM FOOTER TOOGLE
  // $(".room-footer").stop().hide();
  // $(".room-container").on("mouseenter", function() {
  //   $(".room-footer").stop().slideDown();
  // });
  // $(".room-container").on("mouseleave", function() {
  //   $(".room-footer").stop().slideUp();
  // });

  // ICON INPUT BOX
  $(".icon-inputBox > input").on("focus", function() {
    $(this).parents(".icon-inputBox").addClass("focus");
  });
  $(".icon-inputBox > input").on("blur", function() {
    $(this).parents(".icon-inputBox").removeClass("focus");
  });

  // PARTILIST SLIDE DOWN
  $(".list-wrap > dd").stop().hide();
  $(".list-wrap .btn-arrow-bottom").on("click", function() {
    var $sub_menu = $(this).parents("dt").next("dd");
    var $list_wrap = $(this).parents(".list-wrap").siblings();
    
    $list_wrap.find("dd").removeClass("show").slideUp();
    $list_wrap.find(".btn-arrow-bottom").removeClass("show");
    $(".listBox-wrap .btn-arrow-bottom").removeClass("show");
    if($sub_menu.hasClass("show")) {
      $(this).removeClass("show");
      $sub_menu.removeClass("show").slideUp();
    } else {
      $(this).addClass("show");
      $sub_menu.addClass("show").slideDown();
    }
  });

  // TOOLTIP
  $(".hm-tooltip").tooltip({
    position: {
      my: "center top-30",
      at: "right top"
    }
  });

  // ROOM VIEW SLIDE
  var $thumbView = $(".thumbView-slider")
  .on('init', function(event, slick) {
    $(this).append('<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>');
    $('.current').text(slick.currentSlide + 1);
    $('.total').text(slick.slideCount);
  })
  .slick({
    infinite: false,
    vertical: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: false,
    focusOnSelect: true
  })
  .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $('.current').text(nextSlide + 1);
  });
  $(".thumbView-slider").on("click",".thumb-slide", function() {
    var dd = $(this).html();
    $(".mainView-box").html(dd);
  });


  // VIEW LAYOUT BUTTON
  $(".btn-layout").on("click", function() {
    $(this).siblings(".btn-layout").removeClass("selected");
    if(!$(this).hasClass("selected")) {
      $(this).addClass("selected");
    }
  });


  // VIEW GRID
  /*
  var $participants = $(".view-grid-container .grid-item").length;
  console.log($participants);

  if($participants == 2) {
    $(".view-grid-container").addClass("p-2");
  } else if($participants == 3) {
    $(".view-grid-container").addClass("p-3");
  } else if($participants == 4) {

    $(".view-grid-container").addClass("p-4");
  } else if($participants >= 5 && $participants <= 6) {
    $(".view-grid-container").addClass("p-6");
  }
  else if($participants >= 7 && $participants <= 9) {
    $(".view-grid-container").addClass("p-9");
  }
  else if($participants >= 10 && $participants <= 12) {
    $(".view-grid-container").addClass("p-12");
  }
  else if($participants >= 13) {
    $(".view-grid-container").addClass("p-16");
  }
  if($participants > 16) {
    $(".view-grid-container").slick({
      dots: false,
      arrows: true,
      infinite: false,
      rows: 4,
      slidesToShow: 4,
      slidesToScroll: 4,
    });
  }
*/
 


  $(window).on("resize orientationchange", function() {
    $thumbView.slick("resize");
  });
});