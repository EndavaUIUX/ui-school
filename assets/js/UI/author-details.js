/**
 * Created by icojocaru on 8/5/2015.
 */
(function() {
    'use strict';
    var $menuRight = $('.menu-right'),
        $rightMinDiv = $('.rightminidiv'),
        $profile = $('.userProfile'),
        $hideMenu = $('.user, .right-menu-backdrop'),
        $title = $('.title-recent'),
        $rightMenuBackdrop = $('.right-menu-backdrop');

    $profile.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var  $menuLeft = $('nav.menu-left'),
            $leftMenuBackdrop = $('.left-menu-backdrop');

        $title.html("Most Recent Articles");
        if (!$menuRight.hasClass("show-menu-right")) {
            $menuRight.addClass("show-menu-right");
            $rightMenuBackdrop.addClass("show");

            $menuLeft.removeClass("show-menu-left");
            $leftMenuBackdrop.removeClass("show");
        }
    });

    $hideMenu.click(function (e) {
        //e.preventDefault();
        e.stopPropagation();
        var targetEl = $(e.target);
        if(!targetEl.is('.menu-right')
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.recent-list a')) {
            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
            $rightMenuBackdrop.removeClass("show");
        }
    });
}());

