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

    var swipeFunction = {
        touches: {
            "touchstart": {"x": -1, "y": -1},
            "touchmove": {"x": -1, "y": -1},
            "touchend": false,
            "direction": "undetermined"
        },
        touchHandler: function (event) {
            var touch;
            if (typeof event !== 'undefined') {
                event.preventDefault();
                if (typeof event.touches !== 'undefined') {
                    touch = event.touches[0];
                    // console.log(event.type);
                    switch (event.type) {
                        case 'touchstart':
                        case 'touchmove':
                            swipeFunction.touches[event.type].x = touch.pageX;
                            swipeFunction.touches[event.type].y = touch.pageY;
                            break;
                        case 'touchend':
                            // console.log('touchend');
                            swipeFunction.touches[event.type] = true;
                            if (swipeFunction.touches.touchstart.x > -1 && swipeFunction.touches.touchmove.x > -1) {
                                swipeFunction.touches.direction = swipeFunction.touches.touchstart.x < swipeFunction.touches.touchmove.x ? "right" : "left";

                                // Continue here for previous and next button
                                // alert(touches.direction);
                                console.log(swipeFunction.touches.direction);
                            } else {
                              return;
                            }
                        default:
                            if (swipeFunction.touches.direction == 'left') {
                                $('.modal__next').click();
                            } else {
                                $('.modal__prev').click();
                            }
                    }
                }
            }
        },
        init: function () {
            console.log('init');
            var image = document.querySelector('.slider__slides img');
            image.addEventListener('touchstart', swipeFunction.touchHandler, false);
            image.addEventListener('touchmove', swipeFunction.touchHandler, false);
            image.addEventListener('touchend', swipeFunction.touchHandler, false);
        }
    };

    console.log(swipeFunction);
    console.log(swipeFunction.init);
    swipeFunction.init();
    
}(window.jQuery))