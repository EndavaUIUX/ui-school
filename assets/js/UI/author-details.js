/**
 * Created by icojocaru on 8/5/2015.
 */
$('#userProfile').click(function () {
    if ($('input#userProfile').is(':checked')) {
        $('nav.menu-right').addClass("show-menu-right");
    } else{
        $('nav.menu-right').removeClass("show-menu-right");
    }
});
