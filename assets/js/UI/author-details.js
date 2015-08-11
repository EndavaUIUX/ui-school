/**
 * Created by icojocaru on 8/5/2015.
 */
(function() {
    'use strict';
    var $menuRight = $('.menu-right'),
        $rightMinDiv = $('.rightminidiv'),
        $profile = $('.profile'),
        $user = $('.user'),
        $title = $('.title-recent'),
        $rightMenuBackdrop = $('.right-menu-backdrop'),
        $leftthird = $('.leftthird');

    $profile.click(function (e) {
        console.log("aaa",e.target);
        e.stopPropagation();
        $title.html("Most Recent Articles");
        if (!$menuRight.hasClass("show-menu-right")) {
            $menuRight.addClass("show-menu-right");
            $rightMinDiv.addClass("hide-user-icon");
            $rightMenuBackdrop.addClass("show");
            $leftthird.addClass("hideHamburger");
        }
    });

    $user.click(function (e) {
        console.log("bbb",e.target);
        e.stopPropagation();
        $menuRight.removeClass("show-menu-right");
        $rightMinDiv.removeClass("hide-user-icon");
        $rightMenuBackdrop.removeClass("show");
        $leftthird.removeClass("hideHamburger");
    });

    $('body').on("click tap touchend", function (e) {
        var targetEl = $(e.target);
        console.log("ccc",e.target);

        if (!targetEl.is('.profile')
            && !targetEl.is('.menu-right')
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.menu')) {

            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
            $rightMenuBackdrop.removeClass("show");
            $leftthird.removeClass("hideHamburger");
        }
    });
}());

