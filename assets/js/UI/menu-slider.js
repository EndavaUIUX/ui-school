
(function() {
    'use strict';

    /* ****** VARIABLES ******** */

    var $hamburgerMenu = $( '.menu' ),
        $leftArrow = $( '.left-arrow' ),
        $scrollingContainer = $( '.scrolling'),
        $searchInput = $( '.menu-left input' ),
        $menuRight = $('.menu-right'),
        $headerUserProfile = $('header .user-profile'),
        $userDetailsUserProfile = $('.user-details .user-profile');


    /* ****** EVENTS ******** */

    // set height for scrolling div in order to window size/resize
    $( document ).ready(function() {
        setScrollingDivHeight($scrollingContainer);

        $( window ).resize(function() {
            setScrollingDivHeight($scrollingContainer);
        });

        //show & hide resources list from left menu
        $('.resources-list h2').on('click', function() {
            $('.resources-list ul').slideToggle(500);
        });

        // show & hide recent article list from right menu
        $('.article-recent h2').on('click', function() {
            $('.article-recent ul').slideToggle(500);
        });
    });

    $hamburgerMenu.on('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var $menuRight = $('.menu-right'),
            $menuLeft = $('.menu-left'),
            $mainContainer = $('.container');

        $menuLeft.addClass("show-menu-left");
        $menuRight.removeClass("show-menu-right");
        if($( window ).innerWidth() < 569) {
            $mainContainer.addClass("show-fixed");
        }

    });

    $('body').on("click touchend", function(e) {
        var targetEl = $(e.target),
            $errorElement = $('.menu-left p'),
            $menuRight = $('.menu-right'),
            $menuLeft = $('.menu-left'),
            $mainContainer = $('.container'),
            $searchInput = $( '.menu-left input' );

        if (!targetEl.is('.menu-icon')
            && !targetEl.is(".menu")
            && !targetEl.is(".scrolling")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left p")
            && !targetEl.is(".menu-left .editor-list h2")
            && !targetEl.is(".menu-left .resources-list h2")
            && !targetEl.is(".menu-left a")
            && !targetEl.is('.article-recent h2')
            ) {

            $menuLeft.removeClass('show-menu-left');
            $menuRight.removeClass("show-menu-right");
            if($(window).innerWidth() < 569) {
                $mainContainer.removeClass("show-fixed");
            }
            $searchInput.val('');
            THUNDERSTORM.modules.utility.cleanErrors($errorElement);

        }
    });

    $searchInput.keypress(function(e) {
        var inputValue = $searchInput[0].value;
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

    $headerUserProfile.on('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var  $menuLeft = $('.menu-left'),
            $mainContainer = $('.container'),
            $menuRight = $('.menu-right');


        $menuRight.addClass("show-menu-right");
        $menuLeft.removeClass("show-menu-left");
        if($(window).innerWidth() < 569) {
            $mainContainer.addClass("show-fixed");
        }
    });

    /* ****** FUNCTIONS ******** */

    function setScrollingDivHeight (scrollingContainer) {
        for(var i in scrollingContainer) {
            $( scrollingContainer[i] ).css({ height: $(window).innerHeight() });
        }
    }

}());