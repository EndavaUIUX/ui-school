(function(){
    'use strict';

    $('#menuHamburger').click(function () {
        if ($('input#menuHamburger').is(':checked')) {
            $('nav.menu-left').addClass("show-menu-left");
        }else{
            $('nav.menu-left').removeClass("show-menu-left");
        }

    });


    $('.menu-left input').keypress(function(e) {
        var inputValue = $('.menu-left input')[0].value,
            $errorElement = $('.menu-left p'),
            isValueValid = false,
            searchedWord =  $('.menu-left input')[0].value,
            toLowerWord = searchedWord.toLowerCase(),
            key = 'articles',
            articlesParent = $('.content'),
            params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : toLowerWord, isMainPage : false, "itemsPerPage" : 6};

        if (e.keyCode == 13) {
            isValueValid = isValueValid || THUNDERSTORM.modules.utility.validateInput(inputValue, $errorElement);
            var searchedArticles = THUNDERSTORM.modules.articles.filterArticles(params);
            if(!isValueValid || searchedArticles.length === 0 ){
                $errorElement.removeClass('hideError');
                $errorElement.addClass('errorSearch');
                return;
            }
            window.location.href = "/search-result?" + inputValue;
        }
    });

}());



$(document).ready(function() {
    $("#menuHamburger").click(function(e) {
        $("nav.menu-left").toggle();
        e.stopPropagation();
    });

    $(document).click(function(e) {
        if (!$(e.target).is('.menu-left')) {
            $(".menu-left").hide();
        }
    });
});
