(function(){
    'use strict';
    var $menu = $('.menu'),
        $menuLeft = $('nav.menu-left'),
        $hideMenu = $('.hide-menu'),
        $menuLeftInput = $('.menu-left input'),
        $leftMenuBackdrop = $('.left-menu-backdrop');

    $menu.click(function (e) {
        if (!$menuLeft.hasClass("show-menu-left")) {
            $menuLeft.addClass("show-menu-left");
            $leftMenuBackdrop.addClass("show");
        }
    });

    $hideMenu.click(function (){
        $menuLeft.removeClass("show-menu-left");
        $leftMenuBackdrop.removeClass("show");
    });

    $('body').on("click tap touchend", function(e) {
        var targetEl = $(e.target),
            $errorElement = $('.menu-left p');

        if (!targetEl.is('.menu')
            && !targetEl.is(".menu-left")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left .link")
            && !targetEl.is(".menu-left .editor-mode")
            && !targetEl.is(".menu-left p")) {

            $('nav.menu-left').removeClass('show-menu-left');
            $leftMenuBackdrop.removeClass("show");
            //clear input search after press enter or submit
            $('.menu-left input').val('');
            THUNDERSTORM.modules.utility.cleanErrors($errorElement);

        }

    });

    $menuLeftInput.keypress(function(e) {
        var inputValue = $menuLeftInput[0].value,
            $errorElement = $('.menu-left p'),
            isValueValid = false,
            searchedWord = inputValue.toLowerCase(),
            key = 'articles',
            articlesParent = $('.content'),
            params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : searchedWord, isMainPage : false, "itemsPerPage" : 6};

        if (e.keyCode == 13) {
            isValueValid = isValueValid || THUNDERSTORM.modules.utility.validateInput(inputValue, $errorElement);
            var searchedArticles = THUNDERSTORM.modules.articles.filterArticles(params);
            if(!isValueValid) {
                return;
            }
            if(searchedArticles.length === 0 ){
                $(".errorContainer").html("No articles were found to match your search.");
                $errorElement.removeClass('hideError');
                $errorElement.addClass('errorSearch');
                return;
            }
            window.location.href = "/search-result?" + inputValue;
        }
    });
}());
