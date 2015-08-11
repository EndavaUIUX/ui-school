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
        $rightMenuBackdrop = $('.right-menu-backdrop');

    $profile.click(function (e) {

        $title.html("Most Recent Articles");
        if (!$menuRight.hasClass("show-menu-right")) {
            $menuRight.addClass("show-menu-right");
            $rightMinDiv.addClass("hide-user-icon");
            $rightMenuBackdrop.addClass("show");
        }
    });

    $user.click(function () {
        $menuRight.removeClass("show-menu-right");
        $rightMinDiv.removeClass("hide-user-icon");
        $rightMenuBackdrop.removeClass("show");
    });

    $(document).on("click tap touchend", function (e) {
        var targetEl = $(e.target);

        if (!targetEl.is('.profile') && !targetEl.is('.menu-right') && !targetEl.is('.article-recent h2')) {
            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
            $rightMenuBackdrop.removeClass("show");
        }
    });
}());

