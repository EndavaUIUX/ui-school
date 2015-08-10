    /* ==========================================================================
     * slider.js, to hold the homepage slider implementation.
     * If there are some functions done here neeeded somewhere else, go ahead and
     * save it in the namespace :d
     ========================================================================== */
(function ($) {
    'use strict';
    var bubble = $('.bubble');
    var $slider = $('.slider__slides');
    var $slide = $('.slider__slide');
    var slideWidth = $(window).width();
    var sliderWidth = slideWidth * $slide.length;

    /*  Get window size and set slider widths based on that
    **/
    $slide.css({width: slideWidth});
    $slider.css({width: sliderWidth});

    /* ==========================================================================
      functions
     ========================================================================== */

    /*  getTravelLength {function}, current {number}
     *  Returns the travel length between the sliders based on position of clicked
     *  element and active slider.
     *  It will also return the direction, as a plus or minus sign.
     **/
    function getTravelLength(current) {
        var index = $('.bubble.bubble--active').data('index');
        var difference = current - index;
        return difference * slideWidth;
    }

    function setActiveBubble($target) {
        $('.bubble--active').removeClass('bubble--active');
        if (!$target) {
            $('.bubble').first().addClass('bubble--active');
        } else {
            $target.addClass('bubble--active');
        }
    }
    
    /*  ctrl is toggled as we don't want users to be able to click
     *  while the slider is moving(even though opacity is 0);
     **/
    function fadeCtrlMeta($meta, $ctrl, opacity, time) {
        $meta.animate({opacity : opacity}, time);
        $ctrl.animate({opacity : opacity}, time);
        $ctrl.toggle();
    }
    
    function move(travellength) {
        var $that = $(this);
        var $sliderMeta = $('.slider__meta');
        var $sliderControlls = $('.slider__controlls');
        var $sliders = $('.slider__slides');
        var sliderPos = $sliders.offset().left;

        fadeCtrlMeta($sliderMeta, $sliderControlls, 0, 100);
        setActiveBubble($that);

        $sliders.animate({
            left: sliderPos - travellength
        }, 900, function () {
            fadeCtrlMeta($sliderMeta, $sliderControlls, 1, 500);
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

    /*  Update slider widths based on window on resize event
     **/
    $(window).resize(function () {
        slideWidth = $(window).width();
        sliderWidth = slideWidth * $slide.length;
        $slide.css({width: slideWidth});
        $slider.css({width: sliderWidth, left : 0});
        setActiveBubble();
    });

    
    // var imageSlider = document.querySelector('.slider__slide img');
    // swipeFunction.init(imageSlider);

    
    
}(window.jQuery))