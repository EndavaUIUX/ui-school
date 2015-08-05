$('#menuHamburger').click(function () {
    if ($('input#menuHamburger').is(':checked')) {
        $('nav.menu-left').addClass("show-menu-left");
    } else{
        $('nav.menu-left').removeClass("show-menu-left");
    }
}); 

