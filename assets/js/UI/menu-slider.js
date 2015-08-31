
(function() {
    'use strict';

    /* ****** VARIABLES ******** */

    var $hamburgerMenu = $( '.menu' ),
        $scrollingContainer = $( '.scrolling'),
        $searchInput = $( '.menu-left input'),
        $headerUserProfile = $('header .user-profile');


    /* ****** EVENTS ******** */

    $( document ).ready(function() {

        // set height for scrolling div in order to window size/resize
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

    $('body').on("click", function(e) {
        
        var targetEl = $(e.target),
            $errorElement = $('.menu-left p'),
            $menuRight = $('.menu-right'),
            $menuLeft = $('.menu-left'),
            $mainContainer = $('.container'),
            $searchInput = $( '.menu-left input' );

        if (!targetEl.is('.menu-icon')
            && !targetEl.is(".menu")
            && !targetEl.is(".menu img")
            && !targetEl.is(".scrolling")
            && !targetEl.is(".menu-left .search-article")
            && !targetEl.is(".menu-left p")
            && !targetEl.is(".menu-left .editor-list h2")
            && !targetEl.is(".menu-left .resources-list h2")
            && !targetEl.is(".menu-left a")
            && !targetEl.is('.article-recent h2')
            && !targetEl.is('.user-profile')
            && !targetEl.is('.user-profile img')
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

        var inputValue = $searchInput[0].value,
            $errorElement = $('.menu-left p'),
            isValueValid = false,
            searchedWord = inputValue.toLowerCase(),
            key = 'articles',
            articlesParent = $('.content'),
            searchedArticles = [],
            params = {"sourceName" : key, "articlesParent" : articlesParent, "searchedWord" : searchedWord, isMainPage : false, "itemsPerPage" : 6};

        if (e.keyCode === 13) {

            isValueValid = isValueValid || THUNDERSTORM.modules.utility.validateInput(inputValue, $errorElement);
            searchedArticles = THUNDERSTORM.modules.articles.filterArticles(params);

            if(!isValueValid) {
                return;
            }
            if(searchedArticles.length === 0 ){
                $errorElement.html("No articles were found to match your search.");
                $errorElement.addClass('show-error');
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