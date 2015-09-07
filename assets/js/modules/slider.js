/*==========================================================================
 * slider.js, to hold the homepage slider implementation.
 ==========================================================================*/

(function(window, THUNDERSTORM, $) {
    'use strict';

    var slider = {},
        utility = THUNDERSTORM.modules.utility,
        persistence = THUNDERSTORM.modules.persistence;

    /*==========================================================================
     * functions
    ==========================================================================*/

    slider.init = function(opt) {

        var key = opt.sourceName;

        if (utility.keyInLocalStorage(key)) {
            slider.images = persistence.get(opt);
            createSlider(slider.images);
        }else{

            THUNDERSTORM.modules.API.get({
                url: 'rest/slider',
                callback: function (data) {
                    persistence.set({
                        data: data,
                        sourceName: key
                    });
                    slider.images  = persistence.get(opt);
                    createSlider(slider.images);
                }
            });
        }
    };

    function createSlider(data) {

        var $li, $img, $meta, $h2, $p, $a,
            $slides = $(".slider__slides ul"),
            $sliderControlls = $(".slider__controlls");



        for(var i = 0, len = data.images.length; i < len; i++){

            if(i > 39) {
                return;
            }

            $li = $("<li>");
            $meta = $("<div>", {class: "slider__meta"});
            $img = $("<img>", {src: data.images[i].src, alt: data.images[i].name});
            $h2 = $("<h2>");
            $p = $("<p>");
            $a = $("<a>", {href: "#", class: "bubble", "data-index": i+1});

            $slides.append($li);
            $li.append($meta);
            $li.append($img);
            $meta.append($h2);
            $meta.append($p);
            $sliderControlls.append($a);
            $('.bubble').first().addClass('bubble--active');

            $h2.html(data.images[i].meta_title);
            $p.html(data.images[i].meta_message);

        }

    }

    /*getTravelLength {function}, current {number}
    *  Returns the travel length between the sliders based on position of clicked
    *  element and active slider.
    *  It will also return the direction, as a plus or minus sign.
    */
    function getTravelLength(current, sliderWidth) {
        var previous = $('.bubble.bubble--active').data('index'),
            difference = current - previous;

        return difference * $( window ).width();
    }

    function move(travellength) {
        var $that = $(this),
            $sliderTransitionControlls = $('.slider__controlls'), // slider bubbles
            $sliders = $('.slider__slides'),
            $sliderMeta = $('.slider__meta'), // text inside of the slider
            sliderPos = $sliders.offset().left;

        //hide meta and ctrls
        fadeCtrlsAndMeta($sliderMeta, $sliderTransitionControlls, 0, 100);
        setActiveBubble($that);

        //show meta and ctrls after a time
        $sliders.animate({
            left: sliderPos - travellength
        }, 900, function () {
            fadeCtrlsAndMeta($sliderMeta, $sliderTransitionControlls, 1, 500);
        });
    }

    /*ctrl is toggled as we don't want users to be able to click
    *  while the slider is moving(even though opacity is 0);
    *  meta - text inside of slider
    *  ctrl - slider bubbles
    */
    function fadeCtrlsAndMeta($meta, $ctrl, opacity, time) {
        $meta.animate({opacity : opacity}, time);
        $ctrl.animate({opacity : opacity}, time);
        $ctrl.toggle();
    }


    function setActiveBubble($target) {
        $('.bubble--active').removeClass('bubble--active');
        if (!$target) {
            $('.bubble').first().addClass('bubble--active');
        } else {
            $target.addClass('bubble--active');
        }
    }

    /*==========================================================================
    * event handlers.
    * ==========================================================================*/

     $('document').ready( function() {

        var $slide = $('.slider__slides li'),
            $slider = $('.slider__slides'),
            bubble = $('.bubble'),
            sliderWidth = $(window).width() * $slide.length;


        /*Get window size and set slider widths based on that*/
        $slide.css({width: $( window ).width()});
        $slider.css({width: sliderWidth});

        /*Update slider widths based on window on resize event*/
        $(window).resize(function () {
            sliderWidth =  $(window).width() * $slide.length;
            $slide.css({width: $(window).width()});
            $slider.css({width: sliderWidth, left : 0});
            setActiveBubble();
        });

         bubble.on('click', function (ev) {

             var goTo = $(this).data('index'), //slide index corresponding to clicked bubble
                 $slide = $('.slider li'),
                 sliderWidth = $( window ).width() * $slide.length,
                 travelLength = getTravelLength(goTo, sliderWidth);

             ev.preventDefault();
             if (travelLength) {
                 move.call(this, travelLength);
             }
         });
    });

    THUNDERSTORM.modules.slider = slider;
}(window, window.THUNDERSTORM, window.jQuery));


/* *//*==========================================================================
     * slider.js, to hold the homepage slider implementation.
     * If there are some functions done here neeeded somewhere else, go ahead and
     * save it in the namespace :d
     ==========================================================================*//*

(function ($) {
    'use strict';

    var bubble = $('.bubble'),
        $slider = $('.slider__slides'),
        $slide = $('.slider__slide'),
        sliderWidth = $( window ).width() * $slide.length;

 *//*Get window size and set slider widths based on that*//*

 $slide.css({width: $( window ).width()});
 $slider.css({width: sliderWidth});

 *//*==========================================================================
      functions
     ==========================================================================*//*


    *//*getTravelLength {function}, current {number}
     *  Returns the travel length between the sliders based on position of clicked
     *  element and active slider.
     *  It will also return the direction, as a plus or minus sign.
     *//*

    function getTravelLength(current) {
        var previous = $('.bubble.bubble--active').data('index'),
            difference = current - previous;

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
    
  *//*ctrl is toggled as we don't want users to be able to click
     *  while the slider is moving(even though opacity is 0);
     *  meta - text inside of slider
     *  ctrl - slider bubbles
     *//*

    function fadeCtrlsAndMeta($meta, $ctrl, opacity, time) {
        $meta.animate({opacity : opacity}, time);
        $ctrl.animate({opacity : opacity}, time);
        $ctrl.toggle();
    }
    
    function move(travellength) {
        var $that = $(this),
            $sliderMeta = $('.slider__meta'), // text inside of the slider
            $sliderTransitionControlls = $('.slider__controlls'), // slider bubbles
            $sliders = $('.slider__slides'),
            sliderPos = $sliders.offset().left;

        //hide meta and ctrls
        fadeCtrlsAndMeta($sliderMeta, $sliderTransitionControlls, 0, 100);
        setActiveBubble($that);

        //show meta and ctrls after a time
        $sliders.animate({
            left: sliderPos - travellength
        }, 900, function () {
            fadeCtrlsAndMeta($sliderMeta, $sliderTransitionControlls, 1, 500);
        });

    }

 *//*==========================================================================
      event handlers.
     ==========================================================================*//*


    bubble.on('click', function (ev) {

        var goTo = $(this).data('index'), //slide index corresponding to clicked bubble
            travelLength = getTravelLength(goTo);

        ev.preventDefault();
        if (travelLength) {
            move.call(this, travelLength);// has as parameter the context
        }
    });

  *//*Update slider widths based on window on resize event
     *//*

    $(window).resize(function () {
        sliderWidth =  $(window).width() * $slide.length;
        $slide.css({width: $(window).width()});
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
                        swipeFunction.touches[event.type] = true;
                        if (swipeFunction.touches.touchstart.x > -1 && swipeFunction.touches.touchmove.x > -1) {
                            swipeFunction.touches.direction = swipeFunction.touches.touchstart.x < swipeFunction.touches.touchmove.x ? "right" : "left";

                            //hardcodat
                            var activeBubbleIndex = $('.bubble--active').data('index');
                            if (swipeFunction.touches.direction === 'left') {
                                if (activeBubbleIndex === $('.bubble').length) {
                                    return false;
                                }
                                var travelLength = getTravelLength(activeBubbleIndex + 1);
                                if (travelLength) {
                                    move.call($('[data-index="' + (activeBubbleIndex + 1) + '"]'), travelLength);
                                    swipeFunction.init();
                                }
                            } else {
                                if (activeBubbleIndex === 1) {
                                    return false;
                                }
                               var travelLength = getTravelLength(activeBubbleIndex - 1);
                                if (travelLength) {
                                    move.call($('[data-index="' + (activeBubbleIndex - 1) + '"]'), travelLength);
                                    swipeFunction.init();
                                }
                            }
                        }
                    default:
                        break;
                    }
                }
            }
        },
        init: function () {
            console.log('init');
            var images = document.querySelectorAll('.slider__slide img');
            var paras = document.querySelectorAll('.slider__slide p');
            var titles = document.querySelectorAll('.slider__slide h2');
            for(var i = 0; i < images.length; i++) {
                images[i].addEventListener('touchstart', swipeFunction.touchHandler, false);
                images[i].addEventListener('touchmove', swipeFunction.touchHandler, false);
                images[i].addEventListener('touchend', swipeFunction.touchHandler, false);
            }
            
            for(var i = 0; i < paras.length; i++) {
                paras[i].addEventListener('touchstart', swipeFunction.touchHandler, false);
                paras[i].addEventListener('touchmove', swipeFunction.touchHandler, false);
                paras[i].addEventListener('touchend', swipeFunction.touchHandler, false);
            }
            
            for(var i = 0; i < titles.length; i++) {
                titles[i].addEventListener('touchstart', swipeFunction.touchHandler, false);
                titles[i].addEventListener('touchmove', swipeFunction.touchHandler, false);
                titles[i].addEventListener('touchend', swipeFunction.touchHandler, false);
            }
        }
    };

    swipeFunction.init();
    
}(window.jQuery));*/

