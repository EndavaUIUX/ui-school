/**
 * Created by icojocaru on 8/5/2015.
 */
$('.profile').click(function () {
    $('.title').html("Most Recent Articles");
    if (!$('.menu-right').hasClass("show-menu-right")) {
        $('.menu-right').addClass("show-menu-right");
        $('.rightminidiv').addClass("hide-user-icon");
    }

    $('.user').click(function (){
        $('.menu-right').removeClass("show-menu-right");
        $('.rightminidiv').removeClass("hide-user-icon");
    });
});
