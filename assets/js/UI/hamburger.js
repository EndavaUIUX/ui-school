(function($){
    'use strict';
    var $menu = $('.menu'),
        $menuLeft = $('nav.menu-left'),
        $hideMenu = $('.hide-menu, .left-menu-backdrop'),
        $menuLeftInput = $('.menu-left input'),
        $leftMenuBackdrop = $('.left-menu-backdrop');


    $menu.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $menuRight = $('.menu-right'),
            $rightMenuBackdrop = $('.right-menu-backdrop'),
            $rightMinDiv = $('.rightminidiv');

        if (!$menuLeft.hasClass("show-menu-left")) {
            $menuLeft.addClass("show-menu-left");
            $leftMenuBackdrop.addClass("show");

            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
            $rightMenuBackdrop.removeClass("show");
        }
    });

    $hideMenu.click(function (e){
        e.preventDefault();
        e.stopPropagation();
        var targetEl = $(e.target);
        if(!targetEl.is(".menu-left")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left .link")
            && !targetEl.is(".menu-left .editor-mode")
            && !targetEl.is(".menu-left p")
            && !targetEl.is(".menu-left .left-word")) {
            $menuLeft.removeClass("show-menu-left");
            $leftMenuBackdrop.removeClass("show");
        }

    });

    $('body').on("click tap touchend", function(e) {
        var targetEl = $(e.target),
            $errorElement = $('.menu-left p'),
            $menuRight = $('.menu-right'),
            $rightMenuBackdrop = $('.right-menu-backdrop');

        if (!targetEl.is('.menu')
            && !targetEl.is(".menu-left")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left .link")
            && !targetEl.is(".menu-left .editor-mode")
            && !targetEl.is(".menu-left p")
            && !targetEl.is('.profile')
            && !targetEl.is('.user')
            && !targetEl.is('.user-name')
            && !targetEl.is('.user-details')
            && !targetEl.is('.left-menu-backdrop')
            && !targetEl.is('.right-menu-backdrop')
            && !targetEl.is('.menu-right')
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.menu')
            && !targetEl.is('.recent-list a')
            && !targetEl.is(".menu-left .left-word")) {

            $('nav.menu-left').removeClass('show-menu-left');
            $('.left-menu-backdrop').removeClass("show");

            $menuRight.removeClass("show-menu-right");
            $rightMenuBackdrop.removeClass("show");

            $('.menu-left input').val('');
            THUNDERSTORM.modules.utility.cleanErrors($errorElement);

        }
    });

    $menuLeftInput.keypress(function(e) {
        var inputValue = $menuLeftInput[0].value;
        var $errorElement = $('.menu-left p');
        var isValueValid = false;
        var searchedWord = inputValue.toLowerCase();
        var key = 'articles';
        var articlesParent = $('.content');
        var params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : searchedWord, isMainPage : false, "itemsPerPage" : 6};

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
}(window.jQuery));
