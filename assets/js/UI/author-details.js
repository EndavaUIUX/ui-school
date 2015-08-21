/**
 * Created by icojocaru on 8/5/2015.
 */
(function() {
    'use strict';
    var $menuRight = $('.menu-right'),
        $rightMinDiv = $('.user'),
        $profile = $('.user-profile'),
        $hideMenu = $('.user, .slider-backdrop'),
        $title = $('.title-recent'),
        $sliderBackdrop = $('.slider-backdrop');

    $profile.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var  $menuLeft = $('nav.menu-left'),
            $sliderBackdrop = $('.slider-backdrop');

        $title.html("Most Recent Articles");
        if (!$menuRight.hasClass("show-menu-right")) {
            $menuRight.addClass("show-menu-right");
            $sliderBackdrop.addClass("show");

            $menuLeft.removeClass("show-menu-left");
        }
    });

    $hideMenu.click(function (e) {
        //e.preventDefault();
        e.stopPropagation();
        var targetEl = $(e.target),
            $sliderBackdrop = $('.slider-backdrop');
        if(!targetEl.is('.menu-right')
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.recent-list a')) {
            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
            $sliderBackdrop.removeClass("show");
        }
    });

    //show & hide resources list from right menu
    $(function() {
        $('.left-word').show();

        $('.bordernone').click(function(ev) {
            ev.preventDefault()
            $('.left-word').toggle();
        });

    });


    // show & hide recent article list from right menu
    $(function() {
        $('.recent-list').show();

        $('.title-recent').click(function() {
            $('.recent-list').toggle();
        });

    });
}());

