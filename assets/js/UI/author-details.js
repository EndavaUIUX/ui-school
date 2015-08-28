
(function() {
    'use strict';
    var $menuRight = $('.menu-right'),
        $rightMinDiv = $('.user'),
        $profile = $('.user-profile'),
        $hideMenu = $('.user, .slider-backdrop'),
        $title = $('.title-recent');

    $profile.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var  $menuLeft = $('nav.menu-left'),
            $mainContainer = $('.container');

        $title.html("Most Recent Articles");
        if (!$menuRight.hasClass("show-menu-right")) {
            $menuRight.addClass("show-menu-right");
            if($(window).innerWidth() < 569) {
                $mainContainer.addClass("show-fixed");
            }
            $menuLeft.removeClass("show-menu-left");
        }
    });

    $hideMenu.click(function (e) {
        //e.preventDefault();
        e.stopPropagation();
        var targetEl = $(e.target),
            $mainContainer = $('.container');
        if(!targetEl.is('.menu-right')
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.recent-list a')) {
            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
            if($(window).innerWidth() < 569) {
                $mainContainer.removeClass("show-fixed");
            }
        }
    });

    //show & hide resources list from right menu
    $(function() {
        $('.resources-list h2').show();

        $('.resources-list ul').click(function(ev) {
            ev.preventDefault();
            $('.resources-list h2').toggle('slow');
        });

    });


    // show & hide recent article list from right menu
    $(function() {
        $('.recent-list').show();

        $('.title-recent').click(function() {
            $('.recent-list').toggle('slow');
        });

    });
}());

