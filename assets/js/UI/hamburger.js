
$('#menuHamburger').click(function () {    
        if ($('input#menuHamburger').is(':checked')) {
            $('nav.menu-left').addClass("show-menu-left");
        }else{
            $('nav.menu-left').removeClass("show-menu-left");
        }

}); 



//$(document).ready(function() {
//    $("#menuHamburger").click(function(e) {
//        $("nav.menu-left").toggle();
//        e.stopPropagation();
//    });
//
//    $(document).click(function(e) {
//        if (!$(e.target).is('.menu-left')) {
//            $(".menu-left").hide();
//        }
//    });
//});