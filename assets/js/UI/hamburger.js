(function(){
    'use strict';
    var $menu = $('.menu'),
        $menuLeft = $('nav.menu-left'),
        $hideMenu = $('.left-arrow'),
        $menuLeftInput = $('.menu-left input'),
        $scrollingContainer = $('.scrolling');

// set height for scrolling div in order to window resize/size
    $(document).ready(function(){
        for(var i in $scrollingContainer){
            $($scrollingContainer[i]).css({ height: $(window).innerHeight() });
        }
        $(window).resize(function(){
            for(var i in $scrollingContainer){
                $($scrollingContainer[i]).css({ height: $(window).innerHeight() });
            }
        });
    });

    $menu.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var $menuRight = $('.menu-right'),
            $rightMinDiv = $('.user'),
            $mainContainer = $('.container');

        if (!$menuLeft.hasClass("show-menu-left")) {
            $menuLeft.addClass("show-menu-left");
            if($(window).innerWidth() < 569) {
                $mainContainer.addClass("show-fixed");
            }

            $menuRight.removeClass("show-menu-right");
            $rightMinDiv.removeClass("hide-user-icon");
        }
    });

    $hideMenu.click(function (e){
        e.preventDefault();
        e.stopPropagation();

        var targetEl = $(e.target),
            $mainContainer = $('.container');

        if(!targetEl.is(".menu-left")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left .link")
            && !targetEl.is(".menu-left .editor-mode")
            && !targetEl.is(".menu-left p")
            && !targetEl.is(".menu-left .left-word")) {
            $menuLeft.removeClass("show-menu-left");
            if($(window).innerWidth() < 569) {
                $mainContainer.removeClass("show-fixed");
            }
        }

    });

    $('body').on("click tap touchend", function(e) {
        var targetEl = $(e.target),
            $errorElement = $('.menu-left p'),
            $menuRight = $('.menu-right'),
            $mainContainer = $('.container');

        if (!targetEl.is('.menu')
            && !targetEl.is(".menu-left")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left .link")
            && !targetEl.is(".menu-left .editor-mode")
            && !targetEl.is(".menu-left p")
            && !targetEl.is('.user-icon')
            && !targetEl.is('.user')
            && !targetEl.is('.user-name')
            && !targetEl.is('.user-details')
            && !targetEl.is('.slider-backdrop')
            && !targetEl.is('.menu-right')
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.menu-icon')
            && !targetEl.is('.recent-list a')
            && !targetEl.is(".menu-left .left-word")) {

            $('nav.menu-left').removeClass('show-menu-left');
            if($(window).innerWidth() < 569) {
                $mainContainer.removeClass("show-fixed");
            }
            $menuRight.removeClass("show-menu-right");

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

}());
