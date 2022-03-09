$(document).ready(function () {
  $('.slider').slick({
    customPaging: function (slider, i) {
      return;
    },
    dots: true,
    dotsClass: 'slider-lines'
    prevArrow: '<div class="slider-prev"><img src="images/arrow.svg" class="arrow-slider"></div>',
    nextArrow: '<div class="slider-next"><img src="images/arrow.svg" class="arrow-slider"></div>'
  });

  $('.photo__slider').slick({
    customPaging: function (slider, i) {
      return;
    },
    dots: true//,
 /*   dotsClass: 'slider-lines'
    prevArrow: '<div class="slider-prev"><img src="images/arrow.svg" class="arrow-slider"></div>',
    nextArrow: '<div class="slider-next"><img src="images/arrow.svg" class="arrow-slider"></div>'*/
  });

  /*$('.slider-prev').click(function(event, slick, currentSlide, nextSlide) {
    $('.slider').slick('slickPrev');
  });

  $('.slider-next').click(function(event, slick, currentSlide, nextSlide) {
	  $('.slider').slick('slickNext');
  });*/
});