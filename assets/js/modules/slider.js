(function ($) {
    'use strict';
    var bubble = $('.bubble');
    
    /* ==========================================================================
     * MIO: This one needs some refactoring...
      functions
      getTravelLength {function}, current {number}
      returns the travel length between the sliders based on position of clicked
      element and active slider.
     ========================================================================== */
    //get window size and set slider widths based on that 
    var $slider = $('.slider__slides');
    var $slide = $('.slider__slide');
    var slideWidth = $(window).width();
    var sliderWidth = slideWidth * $slide.length;
    
    $slide.css({width: slideWidth});
    $slider.css({width: sliderWidth});
    
    function getTravelLength(current) {
        var index = $('.bubble.bubble--active').data('index');
        var difference = current - index;
        return difference * slideWidth;
    }
    
    function resetActive(){
      $('.bubble--active').removeClass('bubble--active');
      $('.bubble').first().addClass('bubble--active');
    }
    function move(travellength) {
        var $that = $(this);
        var $sliderMeta = $('.slider__meta');
        var $sliderControlls = $('.slider__controlls');
        var sliderPosition = $('.slider__slides').offset().left;
        $('.bubble--active').removeClass('bubble--active');
        $that.addClass('bubble--active');
        $sliderMeta.animate({opacity : 0}, 100);
        $sliderControlls.animate({opacity : 0}, 100);
        $sliderControlls.hide();
        $('.slider__slides').animate({
            left: sliderPosition - travellength
        }, 900, function () {
            $sliderMeta.animate({opacity : 1}, 500);
            $sliderControlls.show();
            $sliderControlls.animate({opacity : 1}, 500);
        });
    }
    
    /* ==========================================================================
      event handlers.
     ========================================================================== */
    bubble.on('click', function (ev) {
        var goTo = $(this).data('index');
        var travelLength = getTravelLength(goTo);
        ev.preventDefault();
        if (travelLength) {
            move.call(this, travelLength);
        }
    });
    //update slider widths based on window on resize event 
    $(window).resize(function () {
        slideWidth = $(window).width();
        sliderWidth = slideWidth * $slide.length;
        $slide.css({width: slideWidth});
        $slider.css({width: sliderWidth, left : 0});
        resetActive();
    });

    
}(window.jQuery))