(function(){
    'use strict';
    var $menu = $('.menu'),
        $menuLeft = $('nav.menu-left'),
        $hideMenu = $('.hide-menu'),
        $menuLeftInput = $('.menu-left input');

    $menu.click(function (e) {
        if (!$menuLeft.hasClass("show-menu-left")) {
            $menuLeft.addClass("show-menu-left");
        }
    });

    $hideMenu.click(function (){
        $menuLeft.removeClass("show-menu-left");
    });

    $(document).on("click", function(e) {
        var targetEl = $(e.target);

        if (!targetEl.is('.menu')
            && !targetEl.is(".menu-left")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left .bordernone")
            && !targetEl.is(".menu-left .editor-mode")) {

            $('nav.menu-left').removeClass('show-menu-left');
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
                $(".errorContainer").html("No articles were found to match you search.");
                $errorElement.removeClass('hideError');
                $errorElement.addClass('errorSearch');
                return;
            }
            window.location.href = "/search-result?" + inputValue;
        }
    });

}());
