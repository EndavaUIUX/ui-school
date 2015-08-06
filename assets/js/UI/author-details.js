/**
 * Created by icojocaru on 8/5/2015.
 */
$('#userProfile').click(function () {
    if ($('input#userProfile').is(':checked')) {
        $('.menu-right').addClass("show-menu-right");
        $('.rightminidiv').addClass("hide-user-icon");
    } else{
        $('.menu-right').removeClass("show-menu-right");
        $('.rightminidiv').removeClass("hide-user-icon");
    }
});
