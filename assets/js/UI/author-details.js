/**
 * Created by icojocaru on 8/5/2015.
 */
(function() {
    'use strict';
    var $menuRight = $('.menu-right'),
        $rightMinDiv = $('.rightminidiv'),
        $profile = $('.profile'),
        $user = $('.user'),
        $title = $('.title');

    $profile.click(function (e) {

        $title.html("Most Recent Articles");
        if (!$menuRight.hasClass("show-menu-right")) {
            $menuRight.addClass("show-menu-right");
            $rightMinDiv.addClass("hide-user-icon");
        }
    });

    $user.click(function () {
        $menuRight.removeClass("show-menu-right");
        $rightMinDiv.removeClass("hide-user-icon");
    });

    $(document).on("click", function (e) {
        var targetEl = $(e.target);

        if (!targetEl.is('.profile') && !targetEl.is('.menu-right') && !targetEl.is('.article-recent h2')) {
            $('.menu-right').removeClass("show-menu-right");
            $('.rightminidiv').removeClass("hide-user-icon");
        }
    });
}());
