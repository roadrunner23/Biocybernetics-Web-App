var delay;
var animationName;
var animationEnd = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd MSAnimationEnd';
var transitionEnd = 'transitionend oTransitionEnd mozTransitionEnd webkitTransitionEnd MSTransitionEnd';
var i;

// main menu control
$('#toggle-menu').on('click', function () {
  if ($('#menu').is(':not(.clickable)')) {
    // do nothing
  }
  // submenu close
  else if ($('#submenu' + i).is(':visible')) {
    animationName = 'animated';
    // reduce toggle menu, expand main
    $('#container-toggle-menu').removeClass('clicked');
    $('#container-carousel-home').removeClass('clicked');
    $('#main').removeClass('clicked');
    // carousel fix
    // $('#carousel-home').slick('slickGoTo', $('#carousel-home').slick('slickCurrentSlide'));
    // disable clicking during animation
    $('#menu').removeClass('clickable');
    // add animation
    $('#submenu' + i).children().each(function (index, value) {
      // delay = 0.2 * index + 's';
      // $(this).css('-webkit-animation-delay', delay);
      $(this).addClass(animationName);
    });
    $('#container-toggle-menu').one(transitionEnd, function() {
    //$('#submenu' + i + ' > li:last').one(animationEnd, function () {
      // reset changes
      $('#container-submenu' + i).css('display', 'none');
      $('#submenu' + i).css('display', 'none');
      $('#menu').addClass('clickable');
      $('#submenu' + i).children().removeClass(animationName);
      $(this).off();
    });
  }
  // main menu open
  else if ($('#menu').is(':hidden')) {
    animationName = 'animated fadeIn';
    // expand toggle menu and reduce main
    $('#container-toggle-menu').addClass('clicked');
    $('#container-carousel-home').addClass('clicked');
    $('#main').addClass('clicked');
    // carousel fix
    // $('#carousel-home').slick('slickGoTo', $('#carousel-home').slick('slickCurrentSlide'));
    // display menu
    $('.container-menu').css('display', 'block');
    $('#menu').css('display', 'initial');
    // disable clicking during animation
    $('#menu').removeClass('clickable');
    // add animation
    $('#menu > li').css('-webkit-animation-duration', '1s');
    $('#menu').children().each(function (index, value) {
      delay = '.6s';//0.2 * index + 's';
      $(this).css('-webkit-animation-delay', delay);
      $(this).addClass(animationName).one(animationEnd, function () {
        $(this).removeClass(animationName);
        $(this).off();
      });
    });
    //$('#container-toggle-menu').one(transitionEnd, function() {
    $('#menu > li:last').one(animationEnd, function () {
      // reset changes
      $('#menu').addClass('clickable');
      $('#menu > li').css('-webkit-animation-delay', '');
      $('#menu > li').css('-webkit-animation-duration', '');
      $(this).off();
    });
    // main menu close
  } else if ($('#menu').is('.clickable')) {
    animationName = 'animated';
    // reduce toggle menu and expand main
    $('#container-toggle-menu').removeClass('clicked');
    $('#container-carousel-home').removeClass('clicked');
    $('#main').removeClass('clicked');
    // carousel fix
    // $('#carousel-home').slick('slickGoTo', $('#carousel-home').slick('slickCurrentSlide'));
    // disable clicking during animation
    $('#menu').removeClass('clickable');
    // add animation
    $('#menu').children().each(function (index, value) {
      // delay = 0.2 * index + 's';
      // $(this).css('-webkit-animation-delay', delay);
      $(this).addClass(animationName);
    });
    $('#container-toggle-menu').one(transitionEnd, function() {
    //$('#menu > li:last').one(animationEnd, function () {
      // reset changes
      $('.container-menu').css('display', 'none');
      $('#menu').css('display', 'none');
      $('#menu').addClass('clickable');
      $('#menu').children().removeClass(animationName);
      $(this).off();
    });
  }
});

// submenu control
$('.category').on('click', function () {
  i = $(this).attr('id');
  if ($('#submenu' + i).length == 0) {
    // do nothing
  }
  else if ($('#menu').is('.clickable')) {
    // add animation to menu
    $('#menu').children().addClass('animated slideOutLeft').one(animationEnd, function () {
      // reset changes
      $('.container-menu').css('display', 'none');
      $('#menu').css('display', 'none');
      $(this).removeClass('animated slideOutLeft');
      $(this).off();
      // open submenu
      $('#container-submenu' + i).css('display', 'block');
      $('#submenu' + i).css('display', 'initial');
      // add animation to submenu
      $('#submenu' + i).children().addClass('animated slideInRight').one(animationEnd, function () {
        $(this).removeClass('animated slideInRight');
        $(this).off();
      });
    });
    // add animation to 'back'
    $('#submenu' + i + ' > li > .back').on('click', function () {
      $('#submenu' + i).children().addClass('animated slideOutRight').one(animationEnd, function () {
        // reset changes
        $('#container-submenu' + i).css('display', 'none');
        $('#submenu' + i).css('display', 'none');
        $(this).removeClass('animated slideOutRight');
        $(this).off();
        // open menu
        $('.container-menu').css('display','block')
        $('#menu').css('display', 'initial');
        // add animation to menu
        $('#menu').children().addClass('animated slideInLeft').one(animationEnd, function () {
          $(this).removeClass('animated slideInLeft');
          $(this).off();
        });
      })
    })
  }
})

// select category
$('.selectable').on('click', function() {
  $('.selected').removeClass('selected').next().removeClass('blob');
  $(this).addClass('selected').next().addClass('blob');
  if($(this).parent('li').parent('.submenu').attr('id'))
    $('#' + $(this).parent('li').parent('.submenu').attr('id').slice(-1)).addClass('selected').next().addClass('blob');
})
