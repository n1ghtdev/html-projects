$(function() {

	$('.header__search').on('click', function(event) {
    $(this).addClass('active')
  });

  $(document).mouseup(function(e) {
    let button = $('.header__search, .header__search *');
    if (!button.is(e.target)) {
      $('.header__search').removeClass('active')
    }
  });

  $('.s_promo_slider__slider').slick({
  	fade: true,
  	dots: true,
  	prevArrow: '<button type="button" class="slick-prev slick-arrow"><svg width="32" height="60" viewBox="0 0 32 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.5 1.5L3 30L30.5 58.5" stroke="white" stroke-width="2"/></svg></button>',
  	nextArrow: '<button type="button" class="slick-next slick-arrow"><svg width="32" height="60" viewBox="0 0 32 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 58.5L29.5 30L2 1.5" stroke="white" stroke-width="2"/></svg></button>',
  	autoplay: true,
  	autoplaySpeed: 5000,
  	speed: 1000
  })


  $('.s_compare__select').selectize({})


  $('.header__bars').on('click', function(event) {
  	$(this).toggleClass('active');
  	$('.header__nav').toggleClass('active');
  });	



$(".s_compare__table").draggable({axis: "x", containment: '.overflow', scroll: false});






});